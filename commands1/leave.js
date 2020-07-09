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
  
    bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").messages.fetch(user.message).then(m => m.delete())
  
    user.ingame = 0
    user.message = 0
    user.count = 0
    
    await user.save()
    
    let online = await Data.find({ ingame: 1 })
    onlineplayers = online.length
    console.log(onlineplayers);
    bot.channels.cache.get("712130741865283605").setName(`Now Playing: ${onlineplayers}`)
}


module.exports.config = {
  name: "leave",
  aliases: ["l"]
}