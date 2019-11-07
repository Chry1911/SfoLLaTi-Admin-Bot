    //Discord.js Version 12.0.0 MASTER
//Npm Discord.js Pakage
const Discord = require('discord.js'); 
const client = new Discord.Client();
const moment = require("moment");
const YouTube = require('simple-youtube-api');
const apiYT = process.env.YT_API;
const yt = require('ytdl-core');
const binaries = require('ffmpeg-binaries');
const ffmpeg = require('ffmpeg');
//const opus = require('opusscript');
//var opus = require('node-opus');


let PREFIX = '$' //Prefix Can Be Any 
let queue = {};


client.on('ready', () => {
  console.log('I am ready!');
  console.log('Connected');
  console.log('Logged on the Sfollati Gaming Clan Discord Server');
  console.log('We moderate the people in this server');
  client.user.setActivity('Moderando il Server SGC', { type: 'PLAYING' });
  client.user.setStatus('available');
});




/**
* Il primo evento serve per comunicare in chat generale chi è arrivato come nuovo utente.
**/

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '♻entra_esci♻');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Benvenuto nel nostro server, ${member}`);
  member.addRole(member.guild.roles.find(role => role.name === "Nuovo membro"));
});


/**
* Questo evento server per communicare quando un utente lascia il clan
**/
client.on('guildMemberRemove', member =>{
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === '♻entra_esci♻');
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
      		  .addField('$mention', "Manda un messaggio a tutti i moderatori e fondatori del server, mi raccomando di taggare il ruolo @FOUNDER @ADMIN")
      		  .addField('$queue', "Comando per mettere in coda la musica, serve per creare la playlist, primo comando da eseguire")
      		  .addField('$add', "Aggiunge una canzone alla playlist copiando url di youtube")
      		  .addField('$play', "Comando per la musica, seguito da nome canzone per riprodurre il brano desiderato")
      		  .addField('$skip', "Comando per la skippare la musica")
      		  .addField('$stop', "Comando per stoppare la musica")
      		  .addField('$volume', "Comando per il volume della musica")
      		  .addField('$np', "Comando per togliere la playlist")
      		  .addField('$pause', "Comando per mettere in pausa la musica")
      		  .addField('$resume', "Comando per la recuperare la musica")
            .addField('$report', "Comando per reportare la condotta negativa di un utente")
            .addField("$private", "Comando per mandare un messaggio privato a tutti gli utenti del server")
            .addField("$giochi", "Comando da invocare per vedere la lista dei comandi dei giochi")
			
			.setFooter('Requested By ' + message.author.tag)
			
			message.channel.send(HelpCommand);
		}
});

/**
* Restituisce tutti i comandi dei giochi
**/

client.on('message', message => {
	if(message.content.startsWith(PREFIX + 'giochi')){
		message.reply('Lista dei comandi dei giochi da usare per voi admin');
		const HelpGames= new Discord.RichEmbed()
		.setTitle('Help Games')
		.setURL('https://www.google.com')
		.setColor('RANDOM')

		    .addField("$R6", "Comando per scrivere un messaggio privato a tutti gli utenti r6 per invitarli ad accedere al server")
            .addField("$Fortnite", "Comando per scrivere un messaggio privato a tutti gli utenti che giocano a Fortnite per invitarli ad accedere al server")
            .addField("$Apex", "Comando per scrivere un messaggio privato a tutti gli utenti che giocano ad Apex per invitarli ad accedere al server")
            .addField("$COD", "Comando per scrivere un messaggio privato a tutti gli utenti che giocano ad COD MW per invitarli ad accedere al server")
            .addField("$TD2", "Comando per scrivere un messaggio privato a tutti gli utenti che giocano ad The Division per invitarli ad accedere al server")
            .addField("$PUBG", "Comando per scrivere un messaggio privato a tutti gli utenti che giocano ad PUBG per invitarli ad accedere al server")
            .addField("$Ghost", "Comando per scrivere un messaggio privato a tutti gli utenti che giocano ad Ghost Recon per invitarli ad accedere al server")
            .addField("$Mexr6", "Comando per mandare messaggio sulla chat di r6")
            .addField("$Mexfortnite", "Comando per mandare messaggio sulla chat di fortnite")
            .addField("$Mexghost", "Comando per mandare messaggio sulla chat di ghost recon")
            .addField("$Mexcod", "Comando per mandare messaggio sulla chat di cod mw")
            .addField("$Mexdivision", "Comando per mandare messaggio sulla chat di the division 2")
            .addField("$Mexapex", "Comando per mandare messaggio sulla chat di apex legends")
            .addField("$Mexpubg", "Comando per mandare messaggio sulla chat di pubg")
            .addField("$Mexchat", "Comando per mandare messaggio sulla chat degli altri giochi")


            .setFooter('Requested By ' + message.author.tag)
			
			message.channel.send(HelpGames);
	}
});




/**
* Comando per reportare l'utente scrivendo nella chat-blacklist
**/

client.on('message', message => {
    if(!message.guild) return;

    if(message.content.startsWith(PREFIX + 'report')){
      const now = new Date();
      const user = message.mentions.users.first();
      const channel = client.channels.find("name", "🏴black-list🏴");

      channel.send(`E' stato reportato l'utente, ` + user +  `in data:` + now);
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
* Messaggio automatico in chat-r6s
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexr6')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-r6s");
        const mex = "Qualcuno per fare ranked o libere su r6?";

        channel.send(user + " " + mex);
    }
});

/**
* Messaggio automatico in chat-fortnite
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexfortnite')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-fortnite");
        const mex = "Qualcuno per fortnite??";

        channel.send(user + " " + mex);
    }
});

/**
* Messaggio automatico in chat-ghost
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexghost')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-ghost");
        const mex = "Qualcuno per ghost recon??";

        channel.send(user + " " + mex);
    }
});

/**
* Messaggio automatico in chat-cod-mw
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexcod')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-cod-mw");
        const mex = "Qualcuno per fare qualcosa su cod mw?";

        channel.send(user + " " + mex);
    }
});

/**
* Messaggio automatico in chat-the-division-2
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexdivision')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-the-division-2");
        const mex = "Qualcuno per raid o darkzone o pve??";

        channel.send(user + " " + mex);
    }
});


/**
* Messaggio automatico in chat-apex
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexapex')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-apex");
        const mex = "Qualcuno per ranked su Apex??";

        channel.send(user + " " + mex);
    }
});

/**
* Messaggio automatico in chat-pubg
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexpubg')){
        const user = message.author;
        const channel = client.channels.find("name", "chat-pubg");
        const mex = "Qualcuno per distruggere dei team su pubg?";

        channel.send(user + " " + mex);
    }
});

/**
* Messaggio automatico in chat
**/

client.on('message', message => {
  if(!message.guild) return;

    if (message.content.startsWith(PREFIX + 'Mexchat')){
        const user = message.author;
        const channel = client.channels.find("name", "chat");
        const mex = "Qualcuno per giocare a qualcos altro??";

        channel.send(user + " " + mex);
    }
});




/**
* Messaggio per tutti gli utenti del server
**/
client.on('message', message => {
  if (message.guild && message.content.startsWith(PREFIX + 'private')) {
    let text = "Ciao visto che sei nella nostra community collegati nelle stanze per socializzare, ti aspettiamo negli SGC :) ";
    message.guild.members.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) member.send(text);
    });
  }
});

/**
* Messaggio per tutti i player di R6
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'R6')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di R6, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "R6S Player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});

/**
* Messaggio per tutti i player di Fortnite
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'Fortnite')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di Fortnite, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "Fortnite Player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});

/**
* Messaggio per tutti i player di Apex
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'Apex')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di Apex, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "Apex Player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});

/**
* Messaggio per tutti i player di COD MW
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'COD')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di COD MW, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "COD MW player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});

/**
* Messaggio per tutti i player di PUBG
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'PUBG')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di PUBG, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "PUBG Player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});

/**
* Messaggio per tutti i player di TD2
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'TD2')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di The Division 2, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "TD2 Player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});

/**
* Messaggio per tutti i player di Ghost Recon
**/
client.on('message', message => { 
	if(message.guild && message.content.startsWith(PREFIX + 'Ghost')){
		let text = "Ciao abbiamo notato che sei classificato come giocatore di Ghost Recon, che ne dici di venire a fare qualche partita con noi SGC? Ti aspettiamo in stanza";
		const myRole = message.guild.roles.find(role => role.name === "Breakpoint Player");

		 for (const member of message.guild.members.values()) {
		    if (member.roles.has(myRole.id)) {
		        //member.user.send("Ho bisogno di voi, per un aiuto");
		        if (member.id != client.user.id && !member.user.bot) member.send(text);
		    }
		}
	}

});


/**
* Lista Spam messaggi per Pegasus_87
**/

client.on('message', message => {
	if(message.guild && message.content.startsWith(PREFIX + 'spamma')){
		let text = "Ciao Pegasus_87 vieni a fare ranked??????";
		var i;
		for(i = 0; i < 2000; i++){
			client.users.get("IDUtente").send(text);
		}
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
    
        


        const myRole = message.guild.roles.find(role => role.name === "🔱 FONDATORE 🔱");
        const myRole2 = message.guild.roles.find(role => role.name === "🛡️ ADMIN 🛡️");


        
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
		
		
		// If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
		const user = message.mentions.users.first();

		if (user) {
	      // Now we get the member from the user
	      const member = message.guild.member(user);
  		

  			if(member){


        
			        const embed = new Discord.RichEmbed()
					    .setColor("RANDOM")
					    .setThumbnail(message.author.avatarURL)
					    .addField(`${user.tag}`, `${user}`, true)
					    .addField("ID:", `${user.id}`, true)
					    .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
					    .addField("Status:", `${user.presence.status}`, true)
					    .addField("In Server", message.guild.name, true)
					    .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
					    .addField("Bot:", `${user.bot}`, true)
					    .addField("Entrato nel Server il:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
					    .addField("Account Creato il:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true) 
					    .addField("Ruoli:", member.roles.map(roles => `${roles}`).join(', '), true)
					    .setFooter(`In risposta a: ${message.author.username}#${message.author.discriminator}`)


					message.channel.send({embed});

			}


    	}
	}
});

/*
**
tentiamo di riprodurre la musica
*/
client.on('message', message => {
	if (message.content.startsWith(PREFIX + 'play')) {
		if(queue[message.guild.id] === undefined) return
			message.channel.sendMessage('Aggiungi delle canzoni alla coda prima di eseguirle');
		if(!message.guild.voiceConnection) 
			return commands.join(message).then(() =>
				commands.play(message));
		if (queue[message.guild.id].playing) return message.channel.sendMessage('Gia in esecuzione');
		let dispatcher;
		queue[message.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return message.channel.sendMessage('La coda è vuota').then(() => {
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
			});
			message.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
			dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : 1 });
				let collector = message.channel.createCollector(m => m);
				collector.on('message', m => {
				if (m.content.startsWith(PREFIX + 'pause')) {
					message.channel.sendMessage('paused').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(PREFIX + 'resume')){
					message.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(PREFIX + 'skip')){
					message.channel.sendMessage('skipped').then(() => {dispatcher.end();});
				} else if (m.content.startsWith('volume+')){
					if (Math.round(dispatcher.volume*50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
					message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
				} else if (m.content.startsWith('volume-')){
					if (Math.round(dispatcher.volume*50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
					message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
				} else if (m.content.startsWith(PREFIX + 'time')){
					message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
}			);
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[message.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return message.channel.sendMessage('error: ' + err).then(() => {
					collector.stop();
					play(queue[message.guild.id].songs.shift());
				});
			});	
		})(queue[message.guild.id].songs.shift());
	}
});


/*
* Creiamo la coda di riproduzione delle canzoni
*/
client.on('message', message => {
	if (message.content.startsWith(PREFIX + 'queue')) {
		if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with $add`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
		message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	}
});

/*
* Creiamo il comando per aggiungere una canzone alla playlist
*/

client.on('message', message => {
	if(message.content.startsWith(PREFIX + 'add')){
		let url = message.content.split(' ')[1];
		if (url == '' || url === undefined) return message.channel.sendMessage(`You must add a YouTube video url, or id after $add`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.sendMessage(`added **${info.title}** to the queue`);
		});
	}
});

/*
* Comando per far joinare qualcuno nel canale vocale
*/
client.on('message', message =>{
	if(message.content.startsWith(PREFIX + 'join')){
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Non sono stato in grado di connettermi al tuo canale vocale...');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	}
});

const commands = {
	'play': (message) => {
		if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Aggiungi alcune canzoni col comando $add`);
		if (!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message));
		if (queue[message.guild.id].playing) return message.channel.sendMessage('Gia in esecuzione');
		let dispatcher;
		queue[message.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return message.channel.sendMessage('La coda è vuota').then(() => {
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
			});
			message.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
			dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : 1 });
			let collector = message.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(PREFIX + 'pause')) {
					message.channel.sendMessage('paused').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(PREFIX + 'resume')){
					message.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(PREFIX  + 'skip')){
					message.channel.sendMessage('skipped').then(() => {dispatcher.end();});
				} else if (m.content.startsWith('volume+')){
					if (Math.round(dispatcher.volume*50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
					message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
				} else if (m.content.startsWith('volume-')){
					if (Math.round(dispatcher.volume*50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
					message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
				} else if (m.content.startsWith(PREFIX + 'time')){
					message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[message.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return message.channel.sendMessage('error: ' + err).then(() => {
					collector.stop();
					play(queue[message.guild.id].songs.shift());
				});
			});
		})(queue[message.guild.id].songs.shift());
},
	'join' : (message) => {
		return new Promise((resolve, reject) => {
			const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Non sono stato in grado di connettermi al tuo canale vocale');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));

		});
	}
}

client.login(process.env.BOT_TOKEN);







