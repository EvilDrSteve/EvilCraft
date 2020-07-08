const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/test.js')

module.exports.run = async (bot, msg, args) => {
  var test = Data.find().byName(msg.author.tag)
  console.table(test)
  //msg.channel.send(test)
}



module.exports.config = {
  name: "test1",
  aliases: ["t1"]
}