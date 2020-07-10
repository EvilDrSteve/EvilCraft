const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {
			
			if(!msg.content.startsWith(config.PREFIX)) return
		
			if (msg.author.bot) return;
			
		//	if (!msg.member.roles.cache.some(r => r.name === "EvilCraft")) return;
		
			let userstuff = await Data.findOne().byID(msg.author.id)
		
			if (!userstuff) {
			  var userdata = new Data({
			    _id: mongoose.Types.ObjectId(),
			    ID: msg.author.id,
			    ingame: 0,
			    gt: msg.author.username,
			    count: 0
			  })
			  await userdata.save()
			}
			
			var userdata1 = await Data.findOne().byID(msg.author.id)
			
			if(userdata1.ingame !== 0) return msg.channel.send("You are already in a game!")
			
			if(cooldown.has(msg.author.id)) return msg.channel.send("Ah yes, joining a second after leaving, how about no.")
			
			
	 let user = msg.author
			channel = msg.channel.name
			
	let count = 0
	let min = 0
	userdata1.count = 0
	var embed = new Discord.MessageEmbed()
 .setColor(config.RED)
	.setTitle(`${userdata1.gt}`)
 .addField('Playing For', "0 Minutes")
	.setThumbnail(user.avatarURL())
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	 bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").send(embed).then(async (m) => {
			 	userdata1.ingame = 1
			 	userdata1.message = m.id
			 	
			 await userdata1.save()
			 
			 online = await Data.find().byIngame()
					bot.user.setActivity(`with ${online.length} others`, { type: "PLAYING" });
	 }).catch(err => {
	   console.log(err)
	 })
					cooldown.add(msg.author.id);
					setTimeout(() => {
						cooldown.delete(msg.author.id)
					}, 1000 * 65)
			 }

module.exports.config = {
	name: "play",
	aliases: ["p"]
}