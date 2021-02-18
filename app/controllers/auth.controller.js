const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const fs = require('fs');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { save } =  require('no-avatar');

exports.signup = async (req, res) => {

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    avatar: 'avatar.png',
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            /* avatar */
            var dir = './saiki/images/'+user._id;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            const savePath = dir+'/avatar.png';
            const options = {
              width: 100,
              height: 100,
              text: req.body.username,
              fontSize: 14,
            };

            save(savePath, options, function(err){
              //if(err) return console.log(err);
                //return console.log('avatar.png saved at path ' + savePath);
            });
            /* avatar */

            res.send({ message: "User was registered successfullys!"+user._id });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!"+user._id });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        roles: authorities,
        token: token
      });
    });
};
