const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

var illegal = "@&"
var arr = illegal.split("")

function check(n) {
  for (let i = 0; i < arr.length; i++) {
    return n === arr[i]
  }
}

module.exports.run = async (bot, msg, args) => {

  if (!msg.content.startsWith(config.PREFIX)) return

  if (msg.author.bot) return;
 // if (!msg.member.roles.cache.get(r => r.name === "EvilCraft")) return;

    const user = await Data.findOne().byID(msg.author.id)
    if(!user) return msg.channel.send("Your data doesnt exist, please use the join command to fix")
  if (!args[0]) return msg.channel.send(`Your GT is: **${user.gt}**`)
  
  let gt = args.join(" ")
  if(gt.length > 15) return msg.channel.send("The maximum character limit for a GT is 15").then(m => {
    m.delete({ timeout: 1000 * 5 })
  })
  
  if(gt.some(check)) return msg.channel.send("Task Failed: Illegal Characters")
  user.gt = gt

  await user.save()
  msg.channel.send(`Set your GT to __**${user.gt}**__`)
}


module.exports.config = {
  name: "gamertag",
  aliases: ["gt"]
}