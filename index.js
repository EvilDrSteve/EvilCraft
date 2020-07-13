const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require("./config.json");
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.MLAB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() =>
    console.log('MongoDB connected...'))
  .catch(err => console.log(err));

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

const Data = require('./Models/joinleavedata.js')

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


const Player = require('./Models/test.js');

fs.readdir("./commands1", (err, files) => {

  if (err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    return console.log("Couldnt find commands");
  }
  console.log(`${jsfile}`)
  jsfile.forEach((f, i) => {
    let pull = require(`./commands1/${f}`);
    bot.commands.set(pull.config.name, pull);
    pull.config.aliases.forEach(alias => {
      bot.aliases.set(alias, pull.config.name)
    });
  })
})

bot.on('ready', async () => {
  console.log("Now online")

  const counter = setInterval(async () => {
    var userdatas = await Data.find().byIngame()
    if (userdatas.length <= 0) {} else {
      bot.user.setActivity(`with ${userdatas.length} others`, { type: "PLAYING" });
    }
    var array = Array.from(userdatas)
    for (let i = 0; i < array.length; i++) {
      let userdata = array[i]
      user2 = bot.guilds.cache.get(config.SERVER_ID).members.cache.get(userdata.ID)
      user1 = user2.user
      //  console.log(userdata)
      if (userdata.ingame == 0) return
      //	 count++
      userdata.count++
      let embed1 = new Discord.MessageEmbed()
        .setColor(config.RED)
        .setTitle(`${userdata.gt}`)
        .addField('Playing for', `\`\`\`${userdata.count} Minutes\`\`\``, true)
        .setThumbnail(user1.displayAvatarURL())
        .setFooter(`AKA ${user1.username}`, user1.avatarURL)
        .setTimestamp()

      if (userdata.afk.is == true) {
        embed1.addField('AFK', `Location: ${userdata.afk.location}`, true)
        embed1.setColor(config.ORANGE)
      }
      bot.guilds.cache.get(config.SERVER_ID).channels.cache.get("711048304502374493").messages.fetch(userdata.message).then(e => {
        e.edit(embed1)
      }).catch(async (err) => {
        console.log(err)
        userdata.ingame = 0
        await userdata.save()
      })

      await userdata.save()
    }
  }, 1000 * 60)

})

bot.on('message', async (msg) => {
  if (msg.author.bot || msg.channel.type == "dm") return;

  let prefix = config.PREFIX
  let messageArray = msg.content.split(" ")
  let cmd = messageArray[0]
  let args = messageArray.slice(1)


  let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if (commandfile) commandfile.run(bot, msg, args)
})

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});

bot.login(process.env.token)