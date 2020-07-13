const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/structures.js')

async function senddata(x, z, type, msg) {
  newstructure = new Data({
    _id: mongoose.Types.ObjectId(),
    Type: type.toLowerCase(),
    Coords: { x: x, y: 0, z: z },
    Farm: false,
    Spawner: true,
    Dimension: 0,
    Reporter: msg.author.tag
  });

  await newstructure.save()
  msg.channel.send("Structure has been added to the database")
}

module.exports.run = async (bot, msg, args) => {
  if (!msg.content.startsWith(config.PREFIX)) return
  const filter = m => {
    return m.author.id === msg.author.id
  }
  action = args[0]
  if (action == "add") {
    if (isNaN(args[1]) || isNaN(args[2])) return msg.channel.send("Command format wrong")
    x = args[1]
    z = args[2]
    type = args[3]
    var output = []
    var datas = await Data.find()
    var structures = Array.from(datas)
    for (let i = 0; i < structures.length; i++) {

      if (structures[i].Coords.x == x && structures[i].Coords.z == z) {
        let embedExact = new Discord.MessageEmbed()
          .setColor(config.RED)
          .setTitle("Coordinates Taken")
          .addField(structures[i].Type, `x: ${structures[i].Coords.x}, z: ${structures[i].Coords.z}`)
          .setThumbnail(msg.guild.iconURL())
          .setFooter("Theres already a structure registered under those coordinates")

        msg.channel.send(embedExact)
        break
      } else if(structures[i].Coords.x !== x && structures[i].Coords.z !== z){
        let a = Math.abs(structures[i].Coords.x - x)
        let b = Math.abs(structures[i].Coords.z - z)
        let dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))

        if (dist < 70) {

          output.push(structures[i])
        }
      }
    }
    if (output.length > 0) {
      let embedExist = new Discord.MessageEmbed()
        .setColor(config.RED)
        .setTitle(`Structures near ${x}, ${z}`)
        .setThumbnail(msg.guild.iconURL())
        .setFooter('Type "Proceed" to add the structure or "Cancel" to cancel')
      for (let c = 0; c < output.length; c++) {
        embedExist.addField(output[c].Type, `x: ${output[c].Coords.x}, z: ${output[c].Coords.z}`)
      }
      msg.channel.send(`Some structures have been detected near the coordinates mentioned, please check if the structure you are trying to add is already there`)

      msg.channel.send(embedExist).then(m => {
        const collector = msg.channel.createMessageCollector(filter, { max: 1, time: 30000 })

        collector.on('collect', c => {
          if (c.content.toLowerCase() == "proceed") {
            senddata(x, z, type, msg)
          } else {
            msg.channel.send("Cancelled")
          }
        })
        collector.on('end', (c, reason) => {
          console.log(reason)
          msg.channel.send("No reponses, the task has been cancelled")
        })
      })
    } else {
      senddata(x, z, type, msg)
    }
    //add ends here
  } else if (action == "all") {
    let datas = await Data.find()
    var structures = Array.from(datas)
    let embed = new Discord.MessageEmbed()
      .setColor(config.RED)
      .setTitle("Structures | All")
      .setThumbnail(msg.guild.iconURL())
      .setFooter(`${msg.author.username}`, msg.author.avatarURL)
      .setTimestamp()

    for (let i = 0; i < structures.length; i++) {
      embed.addField(structures[i].Type, `x: ${structures[i].Coords.x}, z: ${structures[i].Coords.z}`)
    }

    msg.channel.send(embed)
  }
}

module.exports.config = {
  name: "structures",
  aliases: ["str"]
}