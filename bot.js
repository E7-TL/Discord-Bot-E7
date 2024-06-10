require('dotenv').config();
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  EmbedBuilder,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const FunctionalityManager = require('./botFunctionality/functionalityManager');
const SharedFunctionality = require('./InjectedFunctionality/SharedFunctionality');

const constants = SharedFunctionality.constants;
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTIONS'
  ],
  autoReconnect: true
})

// bot is ready and logged in
client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("disconnect", () => {
  console.log('Disconnected from Discord server');
});

client.on(Events.Error, (err) => {
  console.log(err);
})


client.on(Events.InteractionCreate, async (interaction) => {

})

// using message parameter in messageCreate to receive discord messages
client.on(Events.MessageCreate, async (message) => {

  //if bot repeats message, return
  if (message.author.bot) return;

  //if message does not start with command prefix, do nothing.
  if (!message.content.startsWith(constants.prefix)) return;

  try {

    //Example command: !cc peira hwa choux
    const body = message.content.slice(constants.prefix.length);

    //Extracts the command immediately after !
    const command = body.slice(
      0,
      body.includes(' ') ? body.indexOf(' ') : body.length
    ).toLowerCase();

    //Extracts the rest of the arguments
    const theRestString = body.slice(body.indexOf(' ') + 1);

    //Grabs the user
    const userTag = message.member.user.tag;

    const friendRole = "731504628239302676"
    const roles = message.member.roles.cache.map(x => x.id);
    if (roles.includes(friendRole)) {
      return;
    }

    //Creates the necessary classes 
    const neededClasses = createNeededClasses(message, command);
    // console.log('neededClasses', await neededClasses.vhelp.ccGearScore());

    const general = "731499501591855146";
    const compcheck = "731512562197463040";
    const builds = "731501819397800016";
    const test = "1063380174546153533";
    const streamchat = "731612124014575696";
    const gscheck = "1181862371594084433";

    //Command structure
    // console.log('command', command);
    switch (command) {

      //cc commands
      case constants.noBuildCommand:
      case constants.ccHelpCommand: {
        const vhelp = neededClasses.vhelp;

        if (command == constants.ccHelpCommand && (message.channel.id == compcheck || message.channel.id == test)) {
          await vhelp.doHelpCommand(theRestString, userTag, command);
        } else {
          message.channel.send("This is neither the time nor the place");
        }
        break;
      }

      //Guildmanager Commands
      case constants.updateWinrates:
      case constants.checkWinrate: {
        const guildManager = neededClasses.guildmanager;

        //if(command == constants.checkWinrate && message.channel.id != general) await guildManager.checkWinrate(command, theRestString, userTag);
        //if(command == constants.updateWinrates) guildManager.displayWinrateModalButton();
        message.channel.send("This is neither the time nor the place");
        break;
      }

      //gear score checker
      case constants.ccGS: {
        const vhelp = neededClasses.vhelp;

        if (command == constants.ccGS && (message.channel.id == general || message.channel.id == builds || message.channel.id == test || message.channel.id == streamchat || message.channel.id == gscheck)) {
          await vhelp.ccGearScore(theRestString, userTag);
        } else {
          message.channel.send("This is neither the time nor the place");
        }
        break;
      }

      //Welcome to TL
      case constants.welcome: {
        if (command == constants.welcome) {
          message.channel.send("Welcome to TL! Please read <#755835003551875073>.")
        }
        break;
      }

      //Link to Damage Calculator
      case constants.dmgCalc: {
        if (command == constants.dmgCalc) {
          message.channel.send("https://e7calc.xyz")
        }
        break;
      }

      //Link to RTA end date
      case constants.rta: {
        if (command == constants.rta) {
          message.channel.send("RTA ends on <t:1704510000:F>, which is <t:1704510000:R>.")
        }
        break;
      }

      //Maintenance Time
      case constants.maint: {
        if (command == constants.maint) {
          message.channel.send("Maintenance is at <t:1701918000:F>, which is <t:1701918000:R>.")
        }
        break;
      }

      //Buff Schedule
      case constants.buffs: {
        if (command == constants.buffs) {
          message.channel.send("https://media.discordapp.net/attachments/1181398461241905262/1187000617684717698/image.png?ex=65954b78&is=6582d678&hm=0767b39b6b04e8d102d317ee38b593e5bec8e791ef42a46f4e94083726dc5597&=&format=webp&quality=lossless&width=1552&height=398")
        }
        break;
      }

      //Free Unequip time
      case constants.unequip: {
        if (command == constants.unequip) {
          message.channel.send("https://media.discordapp.net/attachments/1181398461241905262/1187000659904577616/image.png?ex=65954b82&is=6582d682&hm=51017a5dc9f6b0a094f1f9a87c399d69b6ac3b6c4b19d3b8dfdd6f483f40d6be&=&format=webp&quality=lossless&width=858&height=428")
        }
        break;
      }

      //mine kills/hits/crits
      case constants.mine: {
        if (command == constants.mine) {
          message.channel.send("https://media.discordapp.net/attachments/731502098511823000/1115314149283610714/ezgif.com-video-to-gif_1.gif?ex=65a55b3e&is=6592e63e&hm=73e766a90aa71d6802186f1f87b34330a658681a469553efb434768972c4da5c&=&width=1200&height=710")
        }
        break;
      }

      //cr screenshot
      case constants.cr: {
        if (command == constants.cr) {
          message.channel.send("https://media.discordapp.net/attachments/731502347171266620/1206960697540485180/image.png?ex=65dde8be&is=65cb73be&hm=d20d2ae4f220c46a2c233274a0ba545c13e3c1940a29179d0346a404936b7701&=&format=webp&quality=lossless&width=1866&height=1326")
        }
        break;
      }

      //test
      case constants.test: {
        if (command == constants.test) {
          message.channel.send("Doris is online!")
        }
        break;
      }

      //pve link
      case constants.pve: {
        if (command == constants.pve) {
          message.channel.send("Check out Atro's All-In-One PvE guide here: https://discord.com/channels/731499500954189865/915876066340511784/1129401822734458963")
        }
        break;
      }

      //multis
      case constants.multis: {
        if (command == constants.multis) {
          message.channel.send("Skill multiplier sheet here: https://docs.google.com/spreadsheets/d/e/2PACX-1vRWZw_BeIhf32W9UIyPuyrr1VDeBuX6p1Nzxov4-5Pkt5DplChLovysSDN83mGVbsZ0XgYs2FICuRXA/pubhtml")
        }
        break;
      }

      //mlken
      case constants.mlken: {
        if (command == constants.mlken) {
          message.channel.send("https://media.discordapp.net/attachments/1046851171052175451/1206548091897913344/image.png?ex=65dc6879&is=65c9f379&hm=5eb0091bb4d04d56b7de7f233bdc92deb838338a27df482514988a7982f4c0f9&=&format=webp&quality=lossless&width=1588&height=686")
        }
        break;
      }

      //meta
      case constants.meta: {
        if (command == constants.meta) {
          message.channel.send("https://fribbels.github.io/e7/gw-meta.html")
        }
        break;
      }

      //pat
      case constants.pat: {
        if (command == constants.pat) {
          message.channel.send("https://media.discordapp.net/attachments/731499501591855146/1143897276159377478/ezgif.com-optimize.gif?ex=65df32db&is=65ccbddb&hm=508aba5dcc31eff9f06df8f2ba7cb734b471ce69cfefb019eb7ca9c8929ef33d&=&width=1200&height=750")
        }
        break;
      }

      //dc
      case constants.dc: {
        if (command == constants.dc) {
          message.channel.send("https://tenor.com/view/corvus-epic-seven-e7-pissed-angry-gif-13264872")
        }
        break;
      }

      //meingw
      case constants.meingw: {
        if (command == constants.meingw) {
          message.channel.send("https://media.discordapp.net/attachments/731499501591855146/1236217936625012736/image.png?ex=66450ceb&is=6643bb6b&hm=1f33599c3e6305dba1688734571ff037964a87cacddcfbbaa30f1bc18d3c675d&=&format=webp&quality=lossless&width=2592&height=1304")
        }
        break;
      }

      //gwisruined
      case constants.gwisruined: {
        if (command == constants.gwisruined) {
          message.channel.send("https://media.discordapp.net/attachments/731499501591855146/1237323881203892256/image.png?ex=66451e69&is=6643cce9&hm=01c3723952fb5820f9892ffb649ac6d8094555dee2bb0e7e6db8d805f96d8feb&=&format=webp&quality=lossless&width=1882&height=494")
        }
        break;
      }

      //atlas
      case constants.atlas: {
        if (command == constants.atlas) {
          message.channel.send("Check out Hero Atlas, where you can find a short summary of recent heroes, here: https://discord.com/channels/731499500954189865/731501864503345162/1229065346212696145")
        }
        break;
      }

      //malt
      case constants.malt: {
        if (command == constants.malt) {
          const maltMsg = [
            "https://media.discordapp.net/attachments/1249729110226370580/1249729127439798291/image.png?ex=66685c72&is=66670af2&hm=806fe913ebad891e9dbb04b67ab74060e0adc6e6665c72bff7fe8ec25f4e3d5a&=&format=webp&quality=lossless&width=2592&height=240",
            "https://media.discordapp.net/attachments/1249729110226370580/1249729268611678249/image.png?ex=66685c94&is=66670b14&hm=6b332cf4feef8cf1dde9ed14e0fc3d7b8e33f707c01bfb0dbf2487ba044faf56&=&format=webp&quality=lossless&width=964&height=302",
            "https://media.discordapp.net/attachments/1249729110226370580/1249729310252597380/image.png?ex=66685c9e&is=66670b1e&hm=75605b00c287f2814fa789bac692eede68bf158723c57d8d7ef70700b90be2b4&=&format=webp&quality=lossless&width=1384&height=332",
            "https://media.discordapp.net/attachments/1249729110226370580/1249729467362840606/image.png?ex=66685cc3&is=66670b43&hm=dd2cd6ff444a38e3d8583cf773402d505817c8e90ee000d03057b67a264436ab&=&format=webp&quality=lossless&width=922&height=176",
            "https://media.discordapp.net/attachments/1249729110226370580/1249729769969422366/image.png?ex=66685d0c&is=66670b8c&hm=64b3e2e26bcaf09798ead12fef67404b7beef2d13ee3ea903ca5490eee6c1396&=&format=webp&quality=lossless&width=636&height=138",
            "https://media.discordapp.net/attachments/1249729110226370580/1249730073372917830/image.png?ex=66685d54&is=66670bd4&hm=b3f1876e4108d7a14886b17f8539c9047849616673f23edfa928dbdd8a4a6618&=&format=webp&quality=lossless&width=1166&height=136",
            "https://media.discordapp.net/attachments/1249729110226370580/1249730283612278966/image.png?ex=66685d86&is=66670c06&hm=f666abbf0cb7aab6621ca8e2ea970da85032173791e6c31feeaad44d5c80eab5&=&format=webp&quality=lossless&width=1772&height=190",
            "https://media.discordapp.net/attachments/1249729110226370580/1249730571844976680/image.png?ex=66685dcb&is=66670c4b&hm=8eafb652a1669f2ed309078640ed131c8d173561ec49f776d1a492025f957dbe&=&format=webp&quality=lossless&width=924&height=656",
            "https://media.discordapp.net/attachments/1249729110226370580/1249730938150064148/image.png?ex=66685e22&is=66670ca2&hm=3c3e5b360d0e075be13b3a2dda58111e2704fb60ff46a0679765c116856a1258&=&format=webp&quality=lossless&width=574&height=700",
            "https://media.discordapp.net/attachments/1249729110226370580/1249731582445621380/image.png?ex=66685ebc&is=66670d3c&hm=82366e7ed850de28d148bfce19ad8a056c847ee0f64bebbf3687808632cd87be&=&format=webp&quality=lossless&width=1100&height=618",
            "https://media.discordapp.net/attachments/1249729110226370580/1249760208889319526/image.png?ex=66687965&is=666727e5&hm=2dbae231ddbc9d10e58645747c4a5550348d805d7b8207b2f20975abdbc2f73b&=&format=webp&quality=lossless&width=574&height=1324",
          ];
          const randomMalt = Math.floor(Math.random() * maltMsg.length);
          message.channel.send(`Malt says ${maltMsg[randomMalt]}`)
        }
        break;
      }



















      //help
      case constants.dorishelp: {
        if (command == constants.dorishelp) {
          message.channel.send("!cc: comp check\n!cr: CR explanation\n!dmgcalc: dmg calc\n!gs: gear score calc\n!meta: meta tracker\n!multis: skill multis\n!pve: PvE Guide\n")
        }
        break;
      }


      //Other Commands
      case constants.commands: {
        //displayCommands(command, message, userTag, neededClasses);
        message.channel.send("This is neither the time nor the place");
        break;
      }
      default:
        message.channel.send("This is neither the time nor the place");
        break;
    }
  }
  catch (err) {
    console.log(err);
  }
});

const displayCommands = (command, message, userTag, neededClasses) => {
  const keys = Object.keys(neededClasses);

  const commands = keys.reduce((commandList, element) => {
    return commandList.concat(neededClasses[element].getCommands());
  }, []);

  const embed = new EmbedBuilder()
    .setTitle(`Commands`)
    .setTimestamp()
    .setThumbnail(constants.embedImage)
    .setColor('#FFC933');

  commands.forEach((element) => {
    embed.addFields(
      { name: element.name, value: element.text, inline: false }
    );
  });

  embed.addFields({ name: '!commands', value: 'Displays this helpful embed.', inline: false });

  embed.setFooter({
    text: `Requested by: ${userTag}`,
    iconURL: message.author.displayAvatarURL(),
  });

  message.channel.send(SharedFunctionality.getPingUserString(command, message.member.user.id));
  message.channel.send({ embeds: [embed] });
};

const createNeededClasses = (message, command) => {
  switch (command) {
    case constants.noBuildCommand:
    case constants.vhelpCommand: {
      return {
        vhelp: FunctionalityManager.GetVhelp(message, SharedFunctionality, constants, getObjectDiscordDependencies('vhelp'))
      }
    }
    //case constants.updateWinrates:
    case constants.checkWinrate: {
      return {
        guildmanager: FunctionalityManager.GetGuildManager(message, SharedFunctionality, constants, getObjectDiscordDependencies('guildmanager'))
      }
    }
    default: {
      return {
        vhelp: FunctionalityManager.GetVhelp(message, SharedFunctionality, constants, getObjectDiscordDependencies('vhelp')),
        guildmanager: FunctionalityManager.GetGuildManager(message, SharedFunctionality, constants, getObjectDiscordDependencies('guildmanager')),
      };
    }
  }
}

const getObjectDiscordDependencies = (objectName) => {
  switch (objectName) {
    case 'vhelp':
      return {
        EmbedBuilder: EmbedBuilder
      };
    case 'guildmanager':
      return {
        ActionRowBuilder: ActionRowBuilder,
        ButtonBuilder: ButtonBuilder,
        ButtonStyle: ButtonStyle,
        EmbedBuilder: EmbedBuilder,
        ModalBuilder: ModalBuilder,
        TextInputBuilder: TextInputBuilder,
        TextInputStyle: TextInputStyle,
      };
  }
}


(async () => {
  try {
    console.log('Attempting to connect');
    const status = await client.login(process.env.token);
    client.user.setAvatar('./doris.png') //bot avatar

    console.log(`Status: ${status}`);
  }
  catch (err) {
    console.log(err);
  }
})()