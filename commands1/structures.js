const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/structures.js')

module.exports.run = async (bot, msg, args) => {
  if (!msg.content.startsWith(config.PREFIX)) return
  const filter = m => {
    return m.author.id === msg.author.id
  }
  action = args[0]
  if(isNaN(args[1]) || isNaN(args[2])) return msg.channel.send("Command format wrong")
  x = args[1]
  z = args[2]
  type = args[3]
  var output = []
  var datas = await Data.find()
  var structures = Array.from(datas)
  for(let i = 0; i < structures.length; i++) {
    
      let a = Math.abs(structures[i].Coords.x - x)
      let b = Math.abs(structures[i].Coords.z - z)
      let dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
      
      if(dist < 70){
        
        output.push(structures[i].Type)
      }
  }
  
  if (output.length > 0) {
    msg.channel.send(`Structures have already been reported in a 70 blocks radius of the coordinates you mentioned, please check the structures listed below and type confirm to continue or end to stop`)

    msg.channel.send(`${output}`).then(() => {
      msg.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time'] }).then(collected => {
        if(collected.first().content === ("confirm")) {
          let newstructure = new Data({
            _id: mongoose.Types.ObjectId,
            Type: type,
            Coords: { x: x, y: 0, z: z },
            Farm: false,
            Spawner: true,
            Dimension: 0,
            Reporter: msg.author.tag
          });

          //await newstructure.save()
          msg.channel.send("Structure has been added to the database")
        }else if(collected.first().content === ("end")) return msg.channel.send("Cancelled").catch(err => {
          msg.channel.send("Task failed successfully")
        })
      })
    })
  } else {
    let newstructure = new Data({
      _id: mongoose.Types.ObjectId(),
      Type: type,
      Coords: { x: x, y: 0, z: z },
      Farm: false,
      Spawner: true,
      Dimension: 0,
      Reporter: msg.author.tag
    });
    await newstructure.save().then(() => {
      msg.channel.send("structure has been added")
    })
  }
  await newstructure.save().then(() => {
    msg.channel.send("saves")
  })
}

module.exports.config = {
  name: "structures",
  aliases: ["str"]
}