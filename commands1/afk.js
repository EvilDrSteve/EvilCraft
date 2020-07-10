const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {
  if(msg.author.bot || !msg.content.startsWith(config.PREFIX)) return
  
  const userdata = await Data.findOne().byID(msg.author.id)
  if(!userdata || !userdata.ingame) return msg.channel.send("Please try using the play command first")
  if(!args[0] && user.afk.is == 0 return msg.channel.send("Please include the afk location")
  let loc = args.join(" ")
  if(loc.length > 30) return msg.channel.send("Max character limit for the location is 30")
  userdata.afk.is = !userdata.afk.is
  userdata.afk.location = loc
  await userdata.save()
  msg.channel.send(`Your afk status has been toggled`)
}

module.exports.config = {
  name: "afk",
  aliases: []
}