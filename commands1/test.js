const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/test.js')
var count = 0
var interval = setInterval({
  count++
  console.log(count)
}, 1000 * 1)
}
module.exports.run = async (bot, msg, args) => {
  //var test = await Data.find().byName(msg.author.tag)
  interval = setInterval({
    count++
    console.log(count)
  }, 1000 * 100)

}
  
  	 module.exports.config = {
  	   name: "test",
  	   aliases: ["t"]
  	 }