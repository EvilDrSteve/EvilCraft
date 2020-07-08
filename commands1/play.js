const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {
			
			if(!msg.content.startsWith(config.PREFIX)) return
			
			if(cooldown.has(msg.author.id)) return msg.channel.send("Ah yes, joining a second after leaving, how about no.")
			if(msg.author.bot) return;
			if(!msg.member.roles.cache.some(r => r.name === "EvilCraft")) return;
			
		  let userstuff = await Data.findOne().byID(msg.author.id)
			
			if(!userstuff){
				var userdata = new Data ({
				  _id: mongoose.Types.ObjectId,
				  ID: msg.author.id,
				  ingame: 0,
				  gt: msg.author.username,
				  count: 0
				})
				 await userdata.save()
				console.log(Data.findOne().byID(msg.author.id))
			}
			
				
	 let user = msg.author
	 var userdata1 = await Data.findOne().byID(msg.author.id)
	 console.log(userdata1)
			channel = msg.channel.name
			if(userdata1.ingame !== 0) return msg.channel.send("You are already in a game!")
			
			
	let count = 0
	let min = 0
	userdata1.count = 0
	var embed = new Discord.RichEmbed()
 .setColor(config.RED)
	.setTitle(`${userdata1.gt}`)
//	.setDescription("**Joined the Realm**")
 .addField('Playing For', "0 Minutes")
	.setThumbnail(user.avatarURL)
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	 bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").send(embed).then(m => {
			 	userdata1.ingame = 1
			 	userdata1.message = m.id
			// 	data["playing"].now = data["playing"].now + 1
			 	
			  userdata1.save()
				
				
				const counter = setInterval(() => {//if(data[user.id].ingame == 1) {
			
					userdata = Data.findOne().byID(msg.author.id)
					if(userdata.ingame == 0) return clearInterval(counter);
					 console.log(data);
	 	 console.log(userdata.count)
	 //	 count++
	 	 userdata.count++
	 	 var embed1 = new Discord.RichEmbed()
  	 .setColor(config.RED)
	 	 .setTitle(`${userdata.gt}`)
	 	 .addField('Playing for', `${userdata.count} Minutes`)
	.setThumbnail(user.avatarURL)
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	
console.log(userdata)
	bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").fetchMessage(userdata.message).then(e => e.edit(embed1))
	
	
	 userdata.save()
	 	 //}
	 	/*  else {
	 	 	 clearInterval(counter)
	 	 	 min++
	 	 	 console.log(min)
	 	 	 count = 0
	 	 	// m.edit(count)
	 	 	 
	 	 	  }*/
	 	 }, 1000 * 60)
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