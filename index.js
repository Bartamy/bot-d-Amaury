const Discord = require("discord.js");
const fs = require("fs");
const config = require ("./storage/config.json");
const bot  = new Discord.Client();

bot.on("guildMemberAdd" , user => {
    let joinEmbed = new Discord.RichEmbed()
        .setcolor("#ff8d00")
        .setAuthor(user.user.username , user.user.displayAvatarURL)
        .setDescription("Bonjour ! C'est le bot d'Amaury, je vous souhaite la bienvenue" + user + "sur ** b" + user.guild.name + " ** Si vous avez toutes questions, n'hésitez pas à les poser à mon créateur Amaury !" )
        .setFooter("AMAURY | envoyé pas le bot d'Amaury |")
   user.guild.channel.get("688283139482583071").send(joinEmbed)     
     });
       



       


bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files)   => {
      if(err) console.log(err);

      var jsFiles  = files.filter(f  =>f.split(".").pop()  === "js");
      if(jsFiles.length <= 0){
          console.log("Aucun fichier de commande !")
          return;
      }
      jsFiles.forEach((f,i)  => {
          var fileGet = require ("./commands/" + f);
          console.log("Fichier de commande  " + f + " récupéré avec succès")
          bot.commands.set(fileGet.help.name, fileGet)
      });
});

bot.on("ready" , async() => {
    console.log(" ")
    console.log("connécté en tant que : " + bot.user.tag)
    bot.user.setActivity("HELP | AMAURY ", {type: "PLAYING" });


});

bot.on("message", message => {
      if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      if(message.channel.content === "-play")


      var prefix = config.prefix;
      var messageArrray = message.content.split(" ");
      var command = messageArrray[0];
      var args = messageArray.slice(1)
      var commands = bot.commands.get(command.slice(prefix.length))
      if(commands) commands.run(bot , message , args);
});
 
 bot.login(config.token);  





