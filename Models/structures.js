const mongoose = require("mongoose");

const structureSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Type: String,
  Coords: {x: Number, y: Number, z:Number},
  Farm: Boolean,
  Spawner: Boolean,
  Dimension: Number,
  Reporter: String
});

playerSchema.query.byType = function(name) {
  return this.where({
    Type: new RegExp(name, 'i')
  });
};

module.exports = mongoose.model("Structure", structureSchema);