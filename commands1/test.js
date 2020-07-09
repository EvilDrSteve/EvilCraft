const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/test.js')

module.exports.run = async (bot, msg, args) => {
  //var test = await Data.find().byName(msg.author.tag)
   bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("712130741865283605").setName(`Now Playing:69`).catch(err => {
     console.log(err)
   })
 // console.log(test)
  //msg.channel.send(test)
}


  
  	 module.exports.config = {
  	   name: "test",
  	   aliases: ["t"]
  	 }