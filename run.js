module.exports = async function(message, run){
	async function ping(){
		return await message.channel.send("pinging...").then(s=>{
			s.delete();return("bot:"+String(Date.now()-message.createdTimestamp)+"ms\napi:"+message.client.ws.ping+"ms")})
	}
	async function del(a){
		if(!a)return "del(path)"
		if(a.startsWith("."))return "file must not start with ."
		return require("fs").unlinkSync("./files/"+message.author.id+'/'+a);
	}
	async function ls(){
		return require("fs").readdirSync("./files/"+message.author.id);
	}
	async function write(a,b){
		if(!a || !b)return "write(path,content)"
		if(a.startsWith("."))return "file must not start with ."
		if(!require("fs").existsSync("./files/"+
		message.author.id)){require("fs").mkdirSync("./files/"+message.author.id);}
		require("fs").writeFileSync("./files/"+message.author.id+'/'+a,b)
		return "writen'"+b+"'to "+a;
	}
	async function read(a){
		if(!a)return "read(path)"
		if(a.startsWith("."))return "file must not start with ."
		return require("fs").readFileSync("./files/"+message.author.id+"/"+a,"utf-8")
	}
	const fetch =require("node-fetch")
	const path = require("path")
	const Discord = require("discord.js")
	const client = message.client
  const msg = message
	const guild = message.guild
	const channel = message.channel
	if(run.includes('eval'))return message.channel.send('```js\nreturned:\nDo not use eval inside eval please\n```')
	if(run.includes('process'))return message.channel.send('```js\nreturned:\nDo not run process please\n```')
	if(run.includes('token'))return message.channel.send('```js\nreturned:\nNo token can be seen :)\n```')
	if(run.includes('require'))return message.channel.send('```js\nreturned:\nPlease do not require things.\n```')
	if(run.includes('ban') ||run.includes('kick') )return message.channel.send('```js\nreturned:\nNo bans& kicks please\n```')
	
const result = new Promise(resolve => resolve(eval(run)));
			return result
				.then(async output => {
					if (typeof output !== 'string') {
						output = require('util').inspect(output, { depth: 0 });
					}
					if (output.includes(message.client.token)) {
						return message.channel.send('```js\nreturned:\nNo token can be seen :)\n```')
					}
					await message.react('↩');
					const m = await message.channel.send(`\`\`\`js\n${output}\n\`\`\``);
					const filter = (reaction, user) =>
						user.id === message.author.id && reaction.emoji.name === '↩';
					message
						.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
						.then(() => {
							m.delete();
							message.reactions.removeAll();
						})
						.catch(() => message.reactions.removeAll());
				})
				.catch(async err => {
					err = err.toString();
					if (err.includes(message.client.token)) {
						return message.channel.send('```js\nreturned:\nNo token can be seen :)\n```')
					}
					await message.react('⚠');
					const m = await message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
					const filter = (reaction, user) =>
						user.id === message.author.id && reaction.emoji.name === '⚠';
					message
						.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
						.then(() => {
							m.delete();
							message.reactions.removeAll();
						})
						.catch(() => message.reactions.removeAll());
				});
}