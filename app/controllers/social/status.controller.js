const db = require("../../models");
const Qr = db.status;

exports.create = (req, res) => {
  if (res.status(200)) {
    if (!req.body.status) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

const express = require('express');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});

    const createNew = new Qr({
      user_id: req.userId,
      status: req.body.status,
      published: req.body.published ? req.body.published : true,
      deleted: false
    });

    createNew
    .save(createNew)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the data." });
    });
  }
};

exports.findAll = (req, res) => {
  if (res.status(200)) {
    const status = req.query.status;
    var condition = status ? { status: { $regex: new RegExp(status), $options: "i" }, deleted: false, published: true } : { deleted: false, published: true };

    Qr.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving data." });
    });
  }
};

exports.findOne = (req, res) => {
  if (res.status(200)) {
    const id = req.params.id;
    Qr.find({ _id: id, deleted: false })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found with id " + id });
      else res.send(data);
    })
    .catch(err => {res
      .status(500)
      .send({ message: "Error retrieving with id=" + id });
    });
  }
};

exports.update = (req, res) => {
  if (res.status(200)) {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }

    const id = req.params.id;

    Qr.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`
        });
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating data with id=" + id });
    });
  }
};

exports.delete = (req, res) => {
  if (res.status(200)) {
    const id = req.params.id;

    Qr.findByIdAndUpdate(id, { deleted:true }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update data with id=${id}. Maybe data was not found!`
        });
      } else res.send({ message: "Data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data with id=" + id
      });
    });
  }
};

exports.findAllUnpublished = (req, res) => {
  if (res.status(200)) {
    Qr.find({ deleted: false, published: false })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({message: err.message || "Some error occurred while retrieving data."});
    });
  }
};