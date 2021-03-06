const Discord = require('discord.js');

const bot = new Discord.Client();

const config = require("./config.json"); 

//const PREFIX = "!";

const fs = require('fs');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands1", (err, files) => {
	
	if(err) console.log(err)
	
	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0) {
		return console.log("Couldnt find commands");
	}
	console.log(`${jsfile}`)
	jsfile.forEach((f, i) => {
		let pull = require(`./commands1/${f}`);
		bot.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(alias => {			bot.aliases.set(alias, pull.config.name)
		});
	})
})

bot.on('ready', () => {
	console.log("Now online")
})

bot.on('message', msg => {
	if(msg.author.bot || msg.channel.type == "dm") return;
	
let prefix = config.PREFIX
let messageArray = msg.content.split(" ")
let cmd = messageArray[0]
let args = messageArray.slice(1)


let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
if(commandfile) commandfile.run(bot,msg,args)
})


//const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
//for(const file of commandFiles){
	//const command = require(`./commands/${file}`);
	
	//bot.commands.set(command.name, command)
	//console.log(`${file} loaded`)
//};

//bot.commands.get('start').execute();

bot.login(process.env.token);
