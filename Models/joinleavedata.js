const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ID: String,
  ingame: Number,
  message: String,
  gt: String,
  count: Number
});

DataSchema.query.byID = function(id) {
  return this.where({
    ID: new RegExp(id, 'i')
  });
};

DataSchema.query.byIngame = function() {
  return this.where({
    ingame: 1
  });
};

module.exports = mongoose.model("Data", DataSchema);