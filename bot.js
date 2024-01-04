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