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
	if(msg.content === prefix + 'help')return msg.channel.send(client.user.tag+'```\n招待...https://is.gd/alval_js\nサポート...https://is.gd/glow_support\nサーバー数...'+client.guilds.cache.size+'\n>[command]でコマンドを実行します \n>> [command]でコマンドを保存します。\n>単体 で保存したコマンドを実行します。\n特有の関数\nls()...ファイル一覧を表示します。\nread("ファイル名")...中身を読み込みます。\nwrite("ファイル名","内容")...ファイルに書き込みます。\ndel("ファイル名")...ファイルを削除します。\n```\nウェブ版...https://alval.f5.si/')
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
require('http').createServer(function(req, res) {
		res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    }).write('招待...https://is.gd/alval_js\nサポート...https://is.gd/glow_support\nサーバー数...'+client.guilds.cache.size+'\n>[command]でコマンドを実行します \n>> [command]でコマンドを保存します。\n>単体 で保存したコマンドを実行します。\n特有の関数\nls()...ファイル一覧を表示します。\nread("ファイル名")...中身を読み込みます。\nwrite("ファイル名","内容")...ファイルに書き込みます。\ndel("ファイル名")...ファイルを削除します。');
		res.end();
	})
.listen(8080);