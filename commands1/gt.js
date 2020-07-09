const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')


module.exports.run = async (bot, msg, args) => {

  if (!msg.content.startsWith(config.PREFIX)) return

  if (msg.author.bot) return;
  if (!msg.member.roles.find(r => r.name === "EvilCraft")) return;

    const user = await Data.findOne().byID(msg.author.id)
    if(!user) return msg.channel.send("Your data doesnt exist, please use the join command to fix")
  if (!args[0]) return msg.channel.send(`Your GT is: **${user.gt}**`)

  user.gt = args.join(" ")

  await user.save()
  msg.channel.send(`Set your GT to __**${user.gt}**__`)
}


module.exports.config = {
  name: "gamertag",
  aliases: ["gt"]
}