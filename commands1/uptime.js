const discord = require('discord.js')
module.exports.run = async (bot, msg, args) => {
	
	function duration(ms) {
		const sec = Math.floor((ms / 1000) % 60).toString()
		const min = Math.floor((ms / (1000 * 60)) % 60).toString()
		const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
		const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
		return `${day.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds,`
	}
	msg.channel.send(`I have been online for: ${duration(bot.uptime)}`)
}

module.exports.config = {
	name: "uptime",
	aliases: []
}