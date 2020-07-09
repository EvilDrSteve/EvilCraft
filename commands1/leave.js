const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {

    if (!msg.content.startsWith(config.PREFIX)) return
  
    if (msg.author.bot) return;
   // if (!msg.member.roles.find(r => r.name === "EvilCraft")) return;
  
    user = await Data.findOne().byID(msg.author.id)
    channel = msg.channel.name
  
    if (user.ingame !== 1) return msg.channel.send("You cant leave a game if you havent joined one!")
  
    bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").fetchMessage(user.message).then(m => m.delete(0))
  
    user.ingame = 0
    user.message = 0
    user.count = 0
    
    await user.save()
    
    realm = Data.find().byIngame()
    online = realm.length
    bot.channels.get("712130741865283605").setName(`Now Playing: ${online}`)
}


module.exports.config = {
  name: "leave",
  aliases: ["l"]
}