const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/test.js')
var count = 0

module.exports.run = async (bot, msg, args) => {


}

module.exports.config = {
  name: "structures",
  aliases: ["str", "structure", "strct"]
}