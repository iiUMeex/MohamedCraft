const Discord = require('discord.js');
const client = new Discord.Client();
var prefix ="-"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message' , message => {
      if(message.author.bot) return;
     
      if(message.content.startsWith(prefix + "bcrole")) {
        if (!message.member.hasPermission("ADMINISTRATOR"))  return;
        let args = message.content.split(" ").slice(2);
     var codes = args.join(' ')
       
        if(!codes) {
          message.channel.send("قم بكتابة الرسالة | `$rolebc role message`")
            return;
        }
     
     
              var role = message.mentions.roles.first();
                if(!role) {
                  message.reply("لا توجد رتبة بهذا الاسم")
                    return;
                }
            message.guild.members.filter(m => m.roles.get(role.id)).forEach(n => {
              n.send(`${codes}`)
            })
            message.channel.send(`لقد تم ارسال هذه الرسالة الى ${message.guild.members.filter(m => m.roles.get(role.id)).size} عضو`)
        }
    });

client.login(process.env.BOT_TOKEN);  //لا تحط التوكن حقك هنا
