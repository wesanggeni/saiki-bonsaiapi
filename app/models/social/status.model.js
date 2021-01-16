const mongoose = require("mongoose");

const Status = mongoose.model(
  "Status",
  new mongoose.Schema(
    {
      user_id: mongoose.Schema.Types.ObjectId,
      status: String,
      photo1: String,
      photo2: String,
      photo3: String,
      photo4: String,
      photo5: String,
      photo6: String,
      photo7: String,
      photo8: String,
      photo9: String,
      photo10: String,
      published: Boolean,
      deleted: Boolean
    },
    { timestamps: true }
  )
);

module.exports = Status;
