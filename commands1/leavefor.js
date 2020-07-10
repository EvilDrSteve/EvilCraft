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
  if (!msg.mentions.users.first()) return
  var mention = msg.mentions.users.first()
  user = await Data.findOne().byID(mention.id)
  channel = msg.channel.name
  if(!user) return msg.channel.send("Please try using the play command first")
  if (user.ingame !== 1) return msg.channel.send("Cant leave a game if havent joined one!")

  bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").messages.fetch(user.message).then(m => m.delete()).catch(err => {
    console.log(err)
  })

  user.ingame = 0
  user.message = 0
  user.count = 0
  user.afk.is = 0
  await user.save()

  online = await Data.find().byIngame()
  bot.user.setActivity(`with ${online.length} others`, { type: "PLAYING" });
}


module.exports.config = {
  name: "leavefor",
  aliases: ["lf"]
}