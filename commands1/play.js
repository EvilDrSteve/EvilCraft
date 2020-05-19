const config = require("../config.json")
const fs = require('fs')

module.exports.run = async (bot, msg, args) => {
			
			if(!msg.content.startsWith(config.PREFIX)) return
			
			let rawdata = fs.readFileSync('./commands1/playdata.json'); let data = JSON.parse(rawdata); console.log(data);
			
			
			if(msg.author.bot) return;
			if(!msg.member.roles.find(r => r.name === "EvilCraft")) return;
			
				if(!data[msg.author.id]){
				data[msg.author.id] = {
					ingame: 0,
					message: 0
				}
			}
			
			if(!data["playing"]){
				data["playing"] = {
					 now: 0
				}
			}
			
				
			user = msg.author
			channel = msg.channel.name
			if(data[user.id].ingame !== 0) return msg.channel.send("You are already in a game!")
			 bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").send(`${user} joined the realm`).then(m => {
			 	data[user.id].ingame = 1
			 	data[user.id].message = m.id
			 	data["playing"].now = data["playing"].now + 1
			 	
			 					fs.writeFileSync("./commands1/playdata.json", JSON.stringify(data), (err=>{
						if(err) return console.log(err)
					}))
					bot.channels.get("712130741865283605").setName(`Now Playing: ${data["playing"].now}`)
					
if(data["playing"].now <= 1)	{
bot.user.setActivity(`with ${data["playing"].now} Person`);
}else {
	bot.user.setActivity(`with ${data["playing"].now} People`);
}
					})
					console.log(data)
			 }

module.exports.config = {
	name: "play",
	aliases: ["p"]
}
