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

structureSchema.query.byType = function(name) {
  return this.where({
    Type: new RegExp(name, 'i')
  });
};

structureSchema.query.byDim = function(Dim) {
  return this.where({
    Dimension: Dim
  });
};

structureSchema.query.byFarm = function() {
  return this.where({
    Farm: true
  });
};

structureSchema.query.byDIST = function(x, y, rad) {
  diffx = Math.abs(this.Coords.x - x)
  diffz = Math.abs(this.Coords.z - z)
  dist = Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffz, 2))
  if(dist < rad) return this
}

module.exports = mongoose.model("Structure", structureSchema);