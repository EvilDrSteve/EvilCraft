const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {
  
  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.PREFIX)) return
  if(!msg.mentions.users.first()) return
  var mention = msg.mentions.users.first()
  
  let userstuff = await Data.findOne().byID(mention.id)

  if (!userstuff) {
    var userdata = new Data({
      _id: mongoose.Types.ObjectId(),
      ID: mention.id,
      ingame: 0,
      gt: mention.username,
      count: 0,
      afk: false
    })
    await userdata.save()
  }
  
  
  let user = mention
  var userdata1 = await Data.findOne().byID(mention.id)
  channel = msg.channel.name
  if (userdata1.ingame !== 0) return msg.channel.send("Already in a game!")
  
  if (cooldown.has(mention)) return msg.channel.send("on cooldown")
  
  //if (!msg.mentions.members.first.roles.cache.some(r => r.name === "EvilCraft")) return;

  
  


  let count = 0
  let min = 0
  userdata1.count = 0
  var embed = new Discord.MessageEmbed()
    .setColor(config.RED)
    .setTitle(`${userdata1.gt}`)
    .addField('Playing For', "0 Minutes")
    .setThumbnail(user.avatarURL())
    .setFooter(`AKA ${user.username}`, user.avatarURL)
    .setTimestamp()
  bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").send(embed).then(async (m) => {
    userdata1.ingame = 1
    userdata1.message = m.id

    await userdata1.save()
    
    online = await Data.find().byIngame()
    bot.user.setActivity(`with ${online.length} others`, { type: "PLAYING" });;
  }).catch(err => {
    console.log(err)
  })

  cooldown.add(mention.id);
  setTimeout(() => {
    cooldown.delete(mention.id)
  }, 1000 * 65)
}

module.exports.config = {
  name: "playfor",
  aliases: ["pf"]
}