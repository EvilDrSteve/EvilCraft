const Discord = require('discord.js');
const config = require("../config.json")
const mongoose = require('mongoose')
const fs = require('fs')
const cooldown = new Set()
const Data = require('../Models/joinleavedata.js')

module.exports.run = async (bot, msg, args) => {

  if (!msg.content.startsWith(config.PREFIX)) return
  if(!msg.mentions.users.first()) return
  var mention = msg.mentions.users.first()
  if (cooldown.has(mention)) return msg.channel.send("Ah yes, joining a second after leaving, how about no.")
  if (msg.author.bot) return;
  //if (!msg.mentions.members.first.roles.cache.some(r => r.name === "EvilCraft")) return;

  let userstuff = await Data.findOne().byID(mention.id)

  if (!userstuff) {
    var userdata = new Data({
      _id: mongoose.Types.ObjectId(),
      ID: mention.id,
      ingame: 0,
      gt: mention.username,
      count: 0
    })
    await userdata.save()
  }


  let user = mention
  var userdata1 = await Data.findOne().byID(mention.id)
  channel = msg.channel.name
  if (userdata1.ingame !== 0) return msg.channel.send("You are already in a game!")


  let count = 0
  let min = 0
  userdata1.count = 0
  var embed = new Discord.MessageEmbed()
    .setColor(config.RED)
    .setTitle(`${userdata1.gt}`)
    //	.setDescription("**Joined the Realm**")
    .addField('Playing For', "0 Minutes")
    .setThumbnail(user.avatarURL())
    .setFooter(`AKA ${user.username}`, user.avatarURL)
    .setTimestamp()
  bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").send(embed).then(async (m) => {
    userdata1.ingame = 1
    userdata1.message = m.id
    // 	data["playing"].now = data["playing"].now + 1

    await userdata1.save()

    let online = await Data.find({ingame: 1})
				onlineplayers = online.length
				console.log(onlineplayers);
				bot.channels.cache.get("712130741865283605").setName(`Now Playing: ${onlineplayers}`)
				
				/*const counter = setInterval(async () => {//if(data[user.id].ingame == 1) {
			
					userdata = await Data.findOne().byID(msg.author.id)
					if(userdata.ingame == 0) return clearInterval(counter);
	 //	 count++
	 	 userdata.count++
	 	 var embed1 = new Discord.MessageEmbed()
  	 .setColor(config.RED)
	 	 .setTitle(`${userdata.gt}`)
	 	 .addField('Playing for', `${userdata.count} Minutes`)
	.setThumbnail(user.avatarURL())
	.setFooter(`AKA ${user.username}`, user.avatarURL)
	.setTimestamp()
	
	bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").messages.fetch(userdata.message).then(e => e.edit(embed1))
	
	 await userdata.save()
	 
	 	 //}
	 	/*  else {
	 	 	 clearInterval(counter)
	 	 	 min++
	 	 	 console.log(min)
	 	 	 count = 0
	 	 	// m.edit(count)
	 	 	 
	 	 	  }
	 	 }, 1000 * 60)*/
  })

  cooldown.add(mention.id);
  setTimeout(() => {
    cooldown.delete(mention.id)
  }, 1000 * 65)
}

module.exports.config = {
  name: "playfor",
  aliases: ["pf"]
}