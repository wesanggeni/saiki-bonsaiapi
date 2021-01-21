const mongoose = require("mongoose");
const mainConfig = require("../../config/main.config");

function getUrl(images) {
  if (images != '') {
    return mainConfig.baseUrl+images;
  } else {
    return '';
  }
}

var thisSchema = new mongoose.Schema({
      user_id: mongoose.Schema.Types.ObjectId,
      status: String,
      photo1: {
        type: String,
        get: getUrl
      },
      photo2: {
        type: String,
        get: getUrl
      },
      photo3: {
        type: String,
        get: getUrl
      },
      photo4: {
        type: String,
        get: getUrl
      },
      photo5: {
        type: String,
        get: getUrl
      },
      photo6: {
        type: String,
        get: getUrl
      },
      photo7: {
        type: String,
        get: getUrl
      },
      photo8: {
        type: String,
        get: getUrl
      },
      photo9: {
        type: String,
        get: getUrl
      },
      photo10: {
        type: String,
        get: getUrl
      },
      published: Boolean,
      deleted: Boolean
    },
    { timestamps: true }
  );

thisSchema.set('toObject', { getters: true });
thisSchema.set('toJSON', { getters: true });

const Status = mongoose.model(
  "Status",
  thisSchema
);

module.exports = Status;
