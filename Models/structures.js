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

structureSchama.methods.Distance = function(x, z){
  let a = Math.abs(this.Coorde.x - x)
  let b = Math.abs(this.Coords.z - z)
  let dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
  return dist
}
structureSchema.query.byDIST = function(a, b, rad) {
  return this.where({
    Distance(a, b) < rad
  })
}

module.exports = mongoose.model("Structure", structureSchema);