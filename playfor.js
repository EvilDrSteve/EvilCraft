const config = require("../config.json")
const fs = require('fs')

module.exports.run = async (bot, msg, args) => {
			
		if(!msg.content.startsWith(config.PREFIX)) return
		
			if(!msg.mentions.users.first()) return
			
			let rawdata = fs.readFileSync('./playdata.json'); let data = JSON.parse(rawdata); console.log(data);
			
				
			user = msg.mentions.users.first()
			channel = msg.channel.name
			
			if(!data[user.id]){
				data[user.id] = {
					ingame: 0,
					message: 0
				}
			}
			
			if(data[user.id].ingame !== 0) return msg.channel.send("You are already in a game!")
			 bot.guilds.get(config.SERVER_ID).channels.get("711048304502374493").send(`${user} joined the realm`).then(m => {
			 	data[user.id].ingame = 1
			 	data[user.id].message = m.id
			 	data["playing"].now = data["playing"].now + 1
			 	
			 					fs.writeFileSync("./playdata.json", JSON.stringify(data), (err=>{
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
	name: "playfor",
	aliases: ["pf"]
}