const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ID: Number,
  ingame: Number,
  message: Number,
  gt: String,
  count: Number
});

DataSchema.query.byID = function(id) {
  return this.where({
    ID: new RegExp(id, 'i')
  });
};

module.exports = mongoose.model("Data", DataSchema);