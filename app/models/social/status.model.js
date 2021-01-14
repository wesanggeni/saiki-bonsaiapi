const mongoose = require("mongoose");

const Status = mongoose.model(
  "Status",
  new mongoose.Schema(
    {
      user_id: mongoose.Schema.Types.ObjectId,
      status: String,
      published: Boolean,
      deleted: Boolean
    },
    { timestamps: true }
  )
);

module.exports = Status;
