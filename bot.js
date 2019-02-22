const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
var prefix ="$"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

const pretty = require('pretty-ms'); // npm i pretty-ms
const credits = require('./Credits.json');
client.on('message',async message => {
    if(message.author.bot || message.channel.type === 'dm') return;
    let args = message.content.split(' ');
    let author = message.author.id;
    if(!credits[author]) credits[author] = { messages: 0, credits: 0, xp: 0, daily: 86400000 };
    credits[author].messages += 1;
    credits[author].xp += 1;
    if(credits[author].xp === 5) {
        credits[author].xp = 0;
        credits[author].credits += 1;
        fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
    }
    fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
 
   
   if(args[0].toLowerCase() == `${prefix}credit` || args[0].toLowerCase() === `${prefix}credits`) {
       let mention = message.mentions.users.first() || message.author;
       let mentionn = message.mentions.users.first();
       if(!credits[mention.id]) return message.channel.send(`**❎ |** Failed To Find the **Needed Data**.`);
       if(!args[2]) {
        let credits = new Discord.Rich()
       .setColor("#36393e")
       .addField(`❯ credits`, `» \`${credits[mention.id].credits} $\`\n`, true)
       message.channel.send(credits);
       
       } else if(mentionn && args[2]) {
           if(isNaN(args[2])) return message.channel.send(`**❎ |** The **"Number"** You Entered **Isn't Correct**.`);
          if(mentionn.id === message.author.id) return message.channel.send(`**❎ |** You Can't Give **Credits** To **Yourself**.`);
           if(args[2] > credits[author].credits) return message.channel.send(`**❎ |** You don't have **Enough** credits to give to ${mentionn}`);
          let first = Math.floor(Math.random() * 9);
          let second = Math.floor(Math.random() * 9);
          let third = Math.floor(Math.random() * 9);
          let fourth = Math.floor(Math.random() * 9);
          let num = `${first}${second}${third}${fourth}`;
         
          message.channel.send(`**🛡 |** **Type** \`${num}\` To **Complete** the transfer!`).then(m => {
              message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors:['time'] }).then(collected => {
                  let c = collected.first();
                  if(c.content === num) {
                          message.channel.send(`**✅ |** Successfully **Transfered** \`$${args[2]}\` !`);
                          m.delete();
                          c.delete();
                          credits[author].credits += (-args[2]);
                          credits[mentionn.id].credits += (+args[2]);
                          fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
                  } else {
                          m.delete();
                  }
              });
          });
         
      } else {
          message.channel.send(`**❎ |** The **Syntax** should be like **\`${prefix}credits <Mention> [Ammount]\`**`);
      }
  } else if(args[0].toLowerCase() === `${prefix}daily`) {
      if(credits[author].daily !== 86400000 && Date.now() - credits[author].daily !== 86400000) {
          message.channel.send(`**❎ |** You already **Claimed** the daily ammount of credits since \`${pretty(Date.now() - credits[author].daily)}\`.`);
      } else {
          let ammount = getRandom(300, 500);
          credits[author].daily = Date.now();
          credits[author].credits += ammount;
          fs.writeFileSync(creditsPath, JSON.stringify(credits, null, 4));
          message.channel.send(`**✅ |** \`${ammount}\`, Successfully **Claimed** Your daily ammount of credits!`);
      }
  }
});
client.login(process.env.BOT_TOKEN);  //لا تحط التوكن حقك هنا
