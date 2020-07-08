const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Name: String,
});

playerSchema.query.byName = function(name) {
  return this.where({
    Name: new RegExp(name, 'i')
  });
};

module.exports = mongoose.model("Player", playerSchema);