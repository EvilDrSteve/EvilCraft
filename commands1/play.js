const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()

module.exports.run = async (bot, msg, args) => {
			
			if(!msg.content.startsWith(config.PREFIX)) return
			
			let rawdata = fs.readFileSync('./playdata.json'); let data = JSON.parse(rawdata); console.log(data);
			
			if(cooldown.has(msg.author.id)) return msg.channel.send("Ah yes, joining a second after leaving, how about no.")
			if(msg.author.bot) return;
			if(!msg.member.roles.find(r => r.name === "EvilCraft")) return;
			
		  let userdata = data.findOne().byID(msg.author.id)
			
			if(!userdata){
				let user = new Data ({
				  _id: mongoose.Types.ObjectId,
				  ID: msg.author.id,
				  ingame: 0,
				  gt: msg.author.username,
				  count: 0
				})
				 user.save()
				console.log(data.findOne().byID(msg.author.id))
			}
			
				
	 let user = msg.author
			channel = msg.channel.name
			if(userdata.ingame !== 0) return msg.channel.send("You are already in a game!")
			
			
	let count = 0
	let min = 0
	userdata.count = 0
	var embed = new Discord.RichEmbed()
 .setColor(config.RED)
	.setTitle(`${userdata.gt}`)
//	.setDescription("**Joined the Realm**")
 .addField('Playing For', "0 Minutes")
	.setThumbnail(user.avatarURL)
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	 bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").send(embed).then(m => {
			 	userdata.ingame = 1
			 	userdata.message = m.id
			// 	data["playing"].now = data["playing"].now + 1
			 	
			  userdata.save()
				
				
				const counter = setInterval(() => {//if(data[user.id].ingame == 1) {
					let rawdata = fs.readFileSync('./playdata.json'); let data = JSON.parse(rawdata)
					let userdata = Data.findOne().byID(msg.author.id)
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