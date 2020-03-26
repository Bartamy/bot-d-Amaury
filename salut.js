const Discord = require("discord.js");

module.exports.run  = async (bot,message,args) =>{
   
    message.channel.send("Salut c'est le bot d'Amaury comment tu vas  " + message.author.username + " ?")
}

module.exports.help = {
    name : "salut"

}