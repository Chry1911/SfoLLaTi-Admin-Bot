//Discord.js Version 12.0.0 MASTER
//Npm Discord.js Pakage
const Discord = require('discord.js'); 
const client = new Discord.Client();
const moment = require("moment");

let PREFIX = '$' //Prefix Can Be Any 


client.on('ready', () => {
  console.log('I am ready!');
  console.log('Connected');
  console.log('Logged on the SfoLLaTi Discord Server');
  console.log('We moderate the people in this server');
});

/**
* Il primo evento serve per comunicare in chat generale chi è arrivato come nuovo utente.
**/

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'entra_esci');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Benvenuto negli SfoLLaTi, ${member}`);
  member.addRole(member.guild.roles.find(role => role.name === "Nuovo membro"));
});


/**
* Questo evento server per communicare quando un utente lascia il clan
**/
client.on('guildMemberRemove', member =>{
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'entra_esci');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Ci ha lasciato, e ha preso una padellata, ${member}`);
})

/**
* Restituisce tutti i comandi disponibili del bot Admin Sfollati
**/

client.on('message', message=> {
    //if (message.isMentioned(client.user)) {
		if(message.content.startsWith(PREFIX + 'help')){
			message.reply('Ciao Admin, se hai bisogno di me ti lascio la lista dei comandi.');
			const HelpCommand = new Discord.RichEmbed()
			
			.setTitle('Help')
            .setURL('https://www.google.com') 
            .setColor('RANDOM') 
			
			.addField('$infoutente', "Restituisce le info di un utente, si prega di menzionare lo user con  @nome")
			.addField('$warna', "Manda un messaggio di warn allo user desiderato, si prega di menzionare lo user con  @nome e motivando la ragione")
			.addField('$unwarna', "Elimina i warn mandati allo user, si prega di menzionare lo user con @nome")
			.addField('$banna', "Banna lo user dal server, si prega di menzionare lo user con @nome")
			.addField('$kikka', "Kikka lo user fuori dal server, si prega di menzionare lo user con @nome")
      		.addField('$mention', "Manda un messaggio a tutti i moderatori e fondatori del server, mi raccomando di taggare il ruolo @FONDATORE @MODERATORE")
			.addField('$magic', "Comando per insultare magic, lui è sempre nei nostri pensieri, gli vogliamo bene")
			.setFooter('Requested By ' + message.author.tag)
			
			message.channel.send(HelpCommand);
		}
});

/**
* Warna l'utente mandandogli un messaggio in privato
**/

client.on('message', message => {
	 if (!message.guild) return;

		  
		  if (message.content.startsWith(PREFIX + 'warna')) {
			  

				let messageToSend = message.content.split(" ").slice(2).join(" ");
				let userToSend = message.mentions.users.first();

				userToSend.send(messageToSend);
				message.channel.send("L'utente ha ricevuto un warn dal bot per inattivita'");
		  }
});

/**
* Kikka l'utente dal server
**/

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith(PREFIX + 'kikka')) {
    
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member.kick('Optional reason that will display in the audit logs').then(() => {
          // We let the message author know we were able to kick the person
          message.reply(`Cacciato dal Server utente: ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to kick the member,
          // either due to missing permissions or role hierarchy
          message.reply('Non sono in grado di kikkare');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    // Otherwise, if no user was mentioned
    } else {
      message.reply('You didn\'t mention the user to kick!');
    }
  }
});

/**
* Banna l'utente dal server
**/

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  if (message.content.startsWith(PREFIX + 'banna')) {
    
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'They were bad!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Bannato dagli SfoLLaTi utente: ${user.tag}`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('Non sono in grado di bannare');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('That user isn\'t in this guild!');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('You didn\'t mention the user to ban!');
    }
  }
});


/**
* Contatta tutti i mod e founders del server
**/
client.on("message", message => {

    if (message.content.startsWith(PREFIX + 'mention')) {
    
        

        const myRole = message.guild.roles.find(role => role.name === "FONDATORE");
        const myRole2 = message.guild.roles.find(role => role.name === "MODERATORE");

        
        for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id || member.roles.has(myRole2.id))) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        member.user.send(`Ho bisogno di voi, per un aiuto, ${message.author}`);
		    }
		}

    }
});

/**
* Restituisce tutte le info dell'utente richieste
**/

client.on('message', message => { //Message Event | Listener

    if (message.content.startsWith(PREFIX + 'infoutente')) {
		
		let user;
		// If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
		if (message.mentions.users.first) {
		  user = message.mentions.users.first;
		} /*else {
			user = message.author;
		}*/
		// Define the member of a guild.
		//const member = message.guild.member(user);
		const member = message.mentions.users.first();
        if(!member) return message.reply("Perfavore menziona un utente che fa parte del server");
		

		const UserInfo = new Discord.RichEmbed()

            
            .setAuthor(message.author.username, message.author.avatarURL) //Heading With Username & Their Avatar 
            .setTitle('InfoUtente')
            .setURL('https://www.google.com') 
            .setColor('RANDOM') 
            .setImage(message.author.avatarURL) 
            .setThumbnail(message.author.avatarURL) 
            

            

            .addField('Avatar', message.author.avatar, true) //The ID of the user's avatar //Inline True or false
           
            .addField('Bot', message.author.bot, true) //Returns True If Message Author = Bot || False If Message Author not Bot.
            .addField('Created At', message.author.createdAt, false) //The time the user was created || .createdTimestamp - The timestamp the user was created at
            .addField('Discrim', message.author.discriminator, true) //A discriminator/tag based on username for the user Ex:- 0001
            .addField('DMChannel', message.author.dmChannel) //The DM between the client's user and this user || If Nothing Returns "Null"
            .addField('ID', message.author.id) //The ID of the User/author
            .addField('Ultimo Messaggio', message.author.lastMessage) //The Message object of the last message sent by the user, if one was sent
            .addField('ID Ultimo Messaggio', message.author.lastMessageID) //The ID of the last message sent by the user, if one was sent
            .addField('Presenza', message.author.presence) //The presence of this user
            .addField('Status Presenza', message.author.presence.status) //The presence status of this user
            .addField('Presenza in gioco', message.author.presence.name) //The presence Game of this user
            .addField('Tag', message.author.tag) //The Discord "tag" for this user || Ex:- Sai Chinna#6718
            .addField('Username', message.author.username) //The username of the user || Ex:- Sai Chinna
            .addField('Nick Name', message.guild.member.displayName) //Nick Name In That (message sent) server || Define target as message Author Ex:- let target = message.author; || Add This Line in Top

            .setFooter('Requested By ' + message.author.tag) //Change To Anything As You Wish
            .setTimestamp()
            
            
			
			
			
			

        message.channel.send(UserInfo);
    }
});


client.login(process.env.BOT_TOKEN);


