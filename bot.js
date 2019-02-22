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

const credits = JSON.parse(fs.readFileSync("./creditsCode.json", "utf8"));
const coolDown = new Set();

client.on('message',async message => {
    
if(message.author.bot) return;
if(!credits[message.author.id]) credits[message.author.id] = {
    credits: 0
};

let userData = credits[message.author.id];
let m = userData.credits;

fs.writeFile("./creditsCode.json", JSON.stringify(credits), (err) => {
    if (err) console.error(err);
  });
  credits[message.author.id] = {
      credits: m + 1,
  }
  
    if(message.content.startsWith(prefix + "credit" || prefix + "credits")) {
message.channel.send(`**${message.author.username}, your :credit_card: balance is \`\`${userData.credits}\`\`.**`);

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
});

client.on('message', async message => {
    let amount = 250;
    if(message.content.startsWith(prefix + "daily")) {
    if(message.author.bot) return;
    if(coolDown.has(message.author.id)) return message.channel.send(`**:stopwatch: | ${message.author.username}, your daily :yen: credits refreshes in \`\`1 Day\`\`.**`);
    
    let userData = credits[message.author.id];
    let m = userData.credits + amount;
    credits[message.author.id] = {
    credits: m
    };

    fs.writeFile("./creditsCode.json", JSON.stringify(userData.credits + amount), (err) => {
    if (err) console.error(err);
    });
    
    message.channel.send(`**:atm: | ${message.author.username}, you received your :yen: ${amount} credits!**`).then(() => {
        coolDown.add(message.author.id);
    });
    
    setTimeout(() => {
       coolDown.remove(message.author.id);
    },86400000);
    }
});
client.login(process.env.BOT_TOKEN);  //لا تحط التوكن حقك هنا
