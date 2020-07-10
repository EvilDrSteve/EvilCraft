const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {
  if(msg.author.bot || !msg.content.startsWith(config.PREFIX)) return
  
  const userdata = await Data.findOne().byID(msg.author.id)
  if(!userdata || !userdata.ingame) return msg.channel.send("Please try using the play command first")
  if(!args[0] && userdata.afk.is == 0) return msg.channel.send("Please include the afk location")
  let loc = args.join(" ")
  if(loc.length > 30) return msg.channel.send("Max character limit for the location is 30")
  userdata.afk.is = !userdata.afk.is
  userdata.afk.location = loc
  
  let embed1 = new Discord.MessageEmbed()
    .setColor(config.RED)
    .setTitle(`${userdata.gt}`)
    .addField('Playing for', `${userdata.count} Minutes`, true)
    .setThumbnail(user1.displayAvatarURL())
    .setFooter(`AKA ${user1.username}`, user1.avatarURL)
    .setTimestamp()
  
  if (userdata.afk.is == true) {
    embed1.addField('AFK', `Location: ${userdata.afk.location}`, true)
    embed1.setColor(config.ORANGE)
  }
  bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").messages.fetch(userdata.message).then(e => {
    e.edit(embed1)
  }).catch(async (err) => {
    console.log(err)
    userdata.ingame = 0
    await userdata.save()
  })
  
  await userdata.save()
  msg.channel.send(`Your afk status has been toggled`)
}

module.exports.config = {
  name: "afk",
  aliases: []
}