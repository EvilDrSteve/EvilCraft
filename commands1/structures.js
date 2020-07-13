const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/structures.js')

module.exports.run = async (bot, msg, args) => {
  if(!msg.content.startsWith(config.PREFIX)) return
  const filter = response => {
    return msg.author === response.author
  }
  action = args[0]
  x = args[1]
  z = args[2]
  type = args[3]
  var structures = Data.find().byDIST(x, y, 70)
  if(structures) {
    msg.channel.send(`Structures have already been reported in a 70 blocks radius of the coordinates you mentioned, please check the structures listed below and type confirm to continue or end to stop`)
    
    msg.channel.send(`${Array.from(structures)}`).then(() => {
      msg.channel.awaitMessages(filter, {max: 1, time: 10000, errors: ['time']}).then(async (collected) => {
        if(collected.first() == "confirm"){
          let newstructure = new Data({
            _id: mongoose.Types.ObjectId,
            Type: type,
            Coords: { x: x, y: "~", z: z },
            Farm: false,
            Spawner: true,
            Dimension: 0,
            Reporter: msg.author.tag
          });
          
          await newstructure.save()
          msg.channel.send("Structure has been added to the database")
        }
      })
    })
    }else {
      let newstructure = new Data({
      _id: mongoose.Types.ObjectId,
        Type: type,
      Coords: { x: x, y: "~", z: z },
        Farm: false,
        Spawner: true,
        Dimension: 0,
        Reporter: msg.author.tag
      });
      await newstructure.save().then(() => {
      msg.channel.send("structure has been added")
      })
    }
  }

module.exports.config = {
  name: "structures",
  aliases: ["str", "structure", "strct"]
}