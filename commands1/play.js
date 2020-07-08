const Discord = require('discord.js');
const config = require("../config.json")
const fs = require('fs')
const cooldown = new Set()

module.exports.run = async (bot, msg, args) => {
			
			if(!msg.content.startsWith(config.PREFIX)) return
			
			let rawdata = fs.readFileSync('./playdata.json'); let data = JSON.parse(rawdata); console.log(data);
			
			if(cooldown.has(msg.author.id)) return msg.channel.send("Ah yes, joining a second after leaving, how about no.")
			if(msg.author.bot) return;
			if(!msg.member.roles.find(r => r.name === "EvilCraft")) return;
			
				if(!data[msg.author.id]){
				data[msg.author.id] = {
					ingame: 0,
					message: 0,
					gt: 0,
					count: 0
				}
			}
			
			if(!data["playing"]){
				data["playing"] = {
					 now: 0
				}
			}
			
				
	 let user = msg.author
			channel = msg.channel.name
			if(data[user.id].ingame !== 0) return msg.channel.send("You are already in a game!")
			
	if(data[user.id].gt == 0) {
		data[user.id].gt = user.username
		}
			
	let count = 0
	let min = 0
	data[user.id].count = 0
	var embed = new Discord.RichEmbed()
 .setColor(config.RED)
	.setTitle(`${data[user.id].gt}`)
//	.setDescription("**Joined the Realm**")
 .addField('Playing For', "0 Minutes")
	.setThumbnail(user.avatarURL)
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	 bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").send(embed).then(m => {
			 	data[user.id].ingame = 1
			 	data[user.id].message = m.id
			 	data["playing"].now = data["playing"].now + 1
			 	
			 					fs.writeFileSync("./playdata.json", JSON.stringify(data), (err=>{
						if(err) return console.log(err)
					}))
				
				
				const counter = setInterval(() => {//if(data[user.id].ingame == 1) {
					let rawdata = fs.readFileSync('./playdata.json'); let data = JSON.parse(rawdata);
					if(data[user.id].ingame == 0) return clearInterval(counter);
					 console.log(data);
	 	 console.log(data[user.id].count)
	 //	 count++
	 	 data[user.id].count++
	 	 var embed1 = new Discord.RichEmbed()
  	 .setColor(config.RED)
	 	 .setTitle(`${data[user.id].gt}`)
	 	 .addField('Playing for', `${data[user.id].count} Minutes`)
	.setThumbnail(user.avatarURL)
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	
console.log(data[user.id])
	bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").fetchMessage(data[user.id].message).then(e => e.edit(embed1))
	
	fs.writeFileSync("./playdata.json", JSON.stringify(data), (err=>{
						if(err) return console.log(err)
					}))
	 	 //}
	 	/*  else {
	 	 	 clearInterval(counter)
	 	 	 min++
	 	 	 console.log(min)
	 	 	 count = 0
	 	 	// m.edit(count)
	 	 	 
	 	 	  }*/
	 	 }, 1000 * 60)
					bot.channels.get("712130741865283605").setName(`Now Playing: ${data["playing"].now}`)
					
if(data["playing"].now <= 1)	{
bot.user.setActivity(`with ${data["playing"].now} Person`);
}else {
	bot.user.setActivity(`with ${data["playing"].now} People`);
}
					})
					console.log(data)
					
					cooldown.add(msg.author.id);
					setTimeout(() => {
						cooldown.delete(msg.author.id)
					}, 1000 * 65)
			 }

module.exports.config = {
	name: "play",
	aliases: ["p"]
}