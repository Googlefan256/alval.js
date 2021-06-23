const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require('fs')
client.login(process.env.token)
const prefix = '>'
setInterval(function() {
	client.user.setActivity(`> | easy eval`, {type:'COMPETING'});
}, 10000);
client.once("ready", ()=>{
	console.log(client.user.tag)
})
client.on("message", async msg => {
	if(msg.author.id === client.user.id)return;
	if(msg.content === prefix + 'help')return msg.channel.send(client.user.tag+'\nhttps://alval.f5.si/')
	if(msg.content.startsWith(prefix + '>')){
	const run = msg.content.slice(prefix.length + 1).trim()
	fs.writeFileSync('./lib/' + msg.author.id+'.txt', run)
	require('./run.js')(msg, run)
}else{
	if(!msg.content.startsWith(prefix))return;
	const run = msg.content.slice(prefix.length).trim()
	if(!run){
	const read = fs.readFileSync('./lib/' + msg.author.id+'.txt', 'utf-8')
	if(!read)return message.channel.send('```\nreturned: nothing found\n```')
	require('./run.js')(msg, read)
	}else{
	require('./run.js')(msg, run)
	}
}
	})
const express = require('express')
const app = express()
app.listen(8080)
app.use('/',express.static('server'))