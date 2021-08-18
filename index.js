const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }); //<-- RICORDARSI QUE
client.login("");
require('discord-buttons')(client)
var { MessageButton, MessageActionRow } = require('discord-buttons')                                                                                                                                                                                                                           



//ATTENZIONE
//Prima di utilizzare questi comandi è necessario attivare i "Privileged Gateway Intents" nella pagina del bot (sia "PRESENCE INTENT" che "SERVER MEMBERS INTENT")

client.on('ready', () => {
    console.log(client.user.username + "online")
    client.user.setActivity("Horizon Academy https://discord.gg/32ktM7AS3v", { type: "PLAYING" })
    })


setInterval(function(){ 
client.channels.cache.get("832862659187048452").send("Ciao, ti ricordiamo che per ogni Boost del server <#835636070954696764> , avrai una skin personalizzata gratuita o semplicemente donando <#846131829202747402> 😀")

}, 14400000);


 


//Prima di tutto mandare il messaggio del ticket
client.on("message", message => {
    if (message.content == "!ticket") {
        message.channel.send("Clicca sulla reazione per aprire un ticket")
            .then(msg => msg.react("📩")) //Personalizzare l'emoji della reaction
    }
})
client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if (messageReaction._emoji.name == "📩") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == "871336576309952563") { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("Hai gia un ticket aperto").catch(() => { })
                return
            }
            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("871336408198041611") //Settare la categoria
                canale.overwritePermissions([
                    {
                        id: server.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
                canale.send("Grazie per aver aperto un ticket")
            })
        }
    }
})
client.on("message", message => {
    if (message.content == "!close") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                message.channel.delete();
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!add")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (haIlPermesso) {
                    message.channel.send("Questo utente ha gia accesso al ticket")
                    return
                }
                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: true
                })
                message.channel.send(`${utente.toString()} è stato aggiunto al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
    if (message.content.startsWith("!remove")) {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando qui");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.hasPermission("MANAGE_CHANNELS")) {
                var utente = message.mentions.members.first();
                if (!utente) {
                    message.channel.send("Inserire un utente valido");
                    return
                }
                var haIlPermesso = message.channel.permissionsFor(utente).has("VIEW_CHANNEL", true)
                if (!haIlPermesso) {
                    message.channel.send("Questo utente non ha gia accesso al ticket")
                    return
                }
                if (utente.hasPermission("MANAGE_CHANNELS")) {
                    message.channel.send("Non puoi rimuovere questo utente")
                    return
                }
                message.channel.updateOverwrite(utente, {
                    VIEW_CHANNEL: false
                })
                message.channel.send(`${utente.toString()} è stato rimosso al ticket`)
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando qui")
        }
    }
})


client.on("message", message => {
    if (message.content == "!comando") {
        var totalPage = 4; //Ricordati qui si settare le tue pagine totali
        var page = 1;
        //TUTTE LE PAGINE - Puoi crearne quante ne vuoi
        var page1 = new Discord.MessageEmbed()
            .setTitle("PAGINA 1")
            .setDescription("Questa è la prima pagina")
            .setFooter("Page 1/" + totalPage)
        var page2 = new Discord.MessageEmbed()
            .setTitle("PAGINA 2")
            .setDescription("Questa è la seconda pagina")
            .setFooter("Page 2/" + totalPage)
        var page3 = new Discord.MessageEmbed()
            .setTitle("PAGINA 3")
            .setDescription("Questa è la terza pagina")
            .setFooter("Page 3/" + totalPage)
        var page4 = new Discord.MessageEmbed()
            .setTitle("PAGINA 4")
            .setDescription("Questa è la quarta pagina")
            .setFooter("Page 4/" + totalPage)
        message.channel.send(page1).then(msg => {
            msg.react('◀').then(r => { //Puoi se vuoi personalizzare le emoji
                msg.react('▶')
                const reactIndietro = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id
                const reactAvanti = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id
                const paginaIndietro = msg.createReactionCollector(reactIndietro)
                const paginaAvanti = msg.createReactionCollector(reactAvanti)
                paginaIndietro.on('collect', (r, u) => { //Freccia indietro
                    page--
                    page < 1 ? page = totalPage : ""
                    msg.edit(eval("page" + page))
                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                })
                paginaAvanti.on('collect', (r, u) => { //Freccia avanti
                    page++
                    page > totalPage ? page = 1 : ""
                    msg.edit(eval("page" + page))
                    r.users.remove(r.users.cache.filter(u => u === message.author).first())
                })
            })
        })
    }
})


const MongoClient = require("mongodb").MongoClient;

    var url = "mongodb+srv://Crosshair:Crosshair12@cluster0.djuab.mongodb.net/test"
    MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
        var database = db.db("Database di crosshair");
        database.createCollection("Collection");
})

//ADDIO
client.on("guildMemberRemove", (member) => {
    client.channels.cache.get("865292021401256008").send("[E' uscito]" + member.toString() + ", torna presto!");
})

client.on("guildMemberAdd", (member) => {
    let nomeEmbed = new Discord.MessageEmbed()
            .setTitle("Ciao " + `${member}` + " benvenuto in **" + member.guild.name + "**") //Titolo
            .setColor("#34a42d") // Colore principale
            .setDescription("Buona permanenza :)") //Descrizione
            .setThumbnail(member.user.displayAvatarURL()) //Copertina
        
             .setImage("https://cdn.discordapp.com/attachments/864098025722871828/865250768637526026/Senza_titolo-2.jpg") //Immagine
            .setFooter("VDEVHD") /*OPPURE*/.setFooter("TestoFooter", "https://cdn.discordapp.com/attachments/864098025722871828/865250768637526026/Senza_titolo-2.jpg")
            .setFooter("TestoFooter") 
            .setTimestamp() //Se mettere o no l'orario di arrivo del messaggio
        client.channels.cache.get("865291910239486022").send(nomeEmbed);
})


client.on("message", message => {
    if (message.content.startsWith("!clear")) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non hai il permesso');
            return;
        }
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Non ho il permesso');
            return;
        }

        var count = message.content.slice(7);
        count = parseInt(count);

        if (!count) {
            message.channel.send("Inserisci un numero valido")
            return
        }

        message.channel.bulkDelete(count, true)
        message.channel.send(count + " messaggi eliminati").then(msg => {
            msg.delete({ timeout: 1000 })
        })

    }
})


client.on("message", message => {
    if (message.content.startsWith("!userinfo")) {
        if (message.content == "!userinfo") {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField("User id", "```" + utente.user.id + "```", true)
            .addField("Stato", "```" + utente.user.presence.status + "```", true)
            .addField("E' un bot?", utente.user.bot ? "```Yes```" : "```No```", true)
            .addField("Account creato", "```" + utente.user.createdAt.toDateString() + "```", true)
            .addField("Entrata nel server", "```" + utente.joinedAt.toDateString() + "```", true)
            .addField("Permessi", "```" + elencoPermessi + "```", false)
            .addField("Ruoli", "```" + utente.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false)
            message.channel.send(embed)

    }
});


client.on("message", (message) => {
    if (message.content.startsWith("!kick")) {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " kiccato"))

    }

    if (message.content.startsWith("!ban")) {
        var utenteBan = message.mentions.members.first();

         

        if (!utenteBan) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!utenteBan.kickable) {
            message.channel.send('Io non ho il permesso');
            return
        }

        utenteBan.ban()
            .then(() => message.channel.send("<@" + utenteBan + ">" + ` è stato bannato da ${message.author}`))

    }
})



  client.on("message", (message) => {
    if (message.content.startsWith("!ki")) {
  message.author.send(`${message.author} Ti comunico che hai usato un comando verso un utente. Se hai bannato senza l'autorizzazione di Luca, si effettuera' una sansione `);
  
}
})


client.on("ready", () => {
    console.log("ONLINE")
})


//Prima di tutto mandare il messaggio del ticket
client.on("message", message => { 
if (message.content == "!assistenza") { 
message.channel.send(`ciao ${message.author} uno staffer sta venendo in tuo aiuto! <@&820077389602226176> e ricordati di compilare il modulo in <#864912489363275776>`); 
} 
})


