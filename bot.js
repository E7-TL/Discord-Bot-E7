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
          message.channel.send("https://e7calc.xyz\nhttps://beta.e7calc.xyz")
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
          const meingwMsg = [
            "https://media.discordapp.net/attachments/731499501591855146/1236217936625012736/image.png?ex=66450ceb&is=6643bb6b&hm=1f33599c3e6305dba1688734571ff037964a87cacddcfbbaa30f1bc18d3c675d&=&format=webp&quality=lossless&width=2592&height=1304",
            "https://media.discordapp.net/attachments/1063380174546153533/1250457244445704273/image.png?ex=666c540f&is=666b028f&hm=a80b14f235c1bdd2d54a83dee6a1cff04e30ea5fc0d757cc51eb7192e257d509&=&format=webp&quality=lossless&width=1100&height=550",
            "https://media.discordapp.net/attachments/1063380174546153533/1250845223907627068/image.png?ex=666c6be4&is=666b1a64&hm=046207ae4a40ebc0bcb5a81b3163b1893880a534b354de683dfb2cfb2eafec59&=&format=webp&quality=lossless&width=1100&height=532",
            "https://media.discordapp.net/attachments/731499501591855146/1254876622767788032/image.png?ex=667d10ad&is=667bbf2d&hm=0fe7922675f13ecf3e0d76efb316e0522695761123b16ee137adfac3b2cb590e&=&format=webp&quality=lossless&width=1702&height=1326",
            "https://media.discordapp.net/attachments/731499501591855146/1254894557544448071/image.png?ex=667d2161&is=667bcfe1&hm=8041a2f41ab9f436c31202ffee03a54d1af4f2f9c72ca18b8b9dc6d3d170b7b7&=&format=webp&quality=lossless&width=2266&height=968",
          ]
          const randommeingwMsg = Math.floor(Math.random() * meingwMsg.length);
          message.channel.send(`${meingwMsg[randommeingwMsg]}`)
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
            "https://media.discordapp.net/attachments/1249729110226370580/1250089957276778546/image.png?ex=666c4f7f&is=666afdff&hm=0f9b07648bcfa75b8a3c803a5ffe3e36c89eb667d830aa8b377d586cb34aac7a&=&format=webp&quality=lossless&width=694&height=134",
            "https://media.discordapp.net/attachments/1249729110226370580/1250852317595697152/image.png?ex=666c7280&is=666b2100&hm=fa41327b5c0e8c46d6cf9e2e5e8367d78b75a890dd47a51d8a88f57f460aedb0&=&format=webp&quality=lossless&width=718&height=164",
          ];
          const randomMalt = Math.floor(Math.random() * maltMsg.length);
          message.channel.send(`Malt says ${maltMsg[randomMalt]}`)
        }
        break;
      }

      //hof
      case constants.hof: {
        if (command == constants.hof) {
          const HoFMsg = [
            "https://media.discordapp.net/attachments/776887307059986492/1110990536778715206/image.png?ex=666c8511&is=666b3391&hm=e6e9a309f5e914b7917dfa34b0cc033882d5001be582f5361cda36ff88c0da2e&=&format=webp&quality=lossless&width=636&height=342",
            "https://media.discordapp.net/attachments/776887307059986492/1110990602553806909/image.png?ex=666c8520&is=666b33a0&hm=a237213d31d7de47d5787f190b340f1ede0811a3ba149e531f221913211961b9&=&format=webp&quality=lossless&width=630&height=298",
            "https://media.discordapp.net/attachments/776887307059986492/1110990679938699346/image.png?ex=666c8533&is=666b33b3&hm=90461c6608471491778ee1a0a48c29cd2a69f376d521bebd5a0406d2fe403ddd&=&format=webp&quality=lossless&width=832&height=302",
            "https://media.discordapp.net/attachments/776887307059986492/1110990728575848588/image.png?ex=666c853e&is=666b33be&hm=aa09cc9069ed24948de020f72b83d04e56c75f591cc4cb48f7a28661a2031b5b&=&format=webp&quality=lossless&width=638&height=298",
            "https://media.discordapp.net/attachments/776887307059986492/1110990772683161671/image.png?ex=666c8549&is=666b33c9&hm=06b35e6987320decec512205cd72dbbe4aa24f316b1f41baa107b5deb03e68e5&=&format=webp&quality=lossless&width=840&height=306",
            "https://media.discordapp.net/attachments/776887307059986492/1112167017496182834/image.png?ex=666c2f80&is=666ade00&hm=59bba185f2db128dea06c9d1b5b42ae282383b168d72758e5c9540b079c7be73&=&format=webp&quality=lossless&width=800&height=220",
            "https://media.discordapp.net/attachments/776887307059986492/1152791627035856946/image.png?ex=666c521d&is=666b009d&hm=8d04035bec862e9b6c886a66f29ec005341673b2ad6736e30760ff84db820e5d&=&format=webp&quality=lossless&width=800&height=258",
            "https://media.discordapp.net/attachments/776887307059986492/1193357660016357416/image.png?ex=666c3e2d&is=666aecad&hm=da8002da21e3329e575853b91a5b017e892fb3c404e2ec6b7d84c3caeed752b8&=&format=webp&quality=lossless&width=636&height=354",
            "https://media.discordapp.net/attachments/776887307059986492/1250837915437760543/image.png?ex=666c6516&is=666b1396&hm=25c0cd3c7dc14ab0ba5e3af4a1812d3c6e0c8dfd7dbec3bc22079a6c86bf82f7&=&format=webp&quality=lossless&width=646&height=330",
            "https://media.discordapp.net/attachments/776887307059986492/1250842067379294278/image.png?ex=666c68f4&is=666b1774&hm=630bd11b0e5094c659381ec23cf1bb5aee4cdf2098263df7e0f6a34527522d13&=&format=webp&quality=lossless&width=654&height=274",
            "https://media.discordapp.net/attachments/1251044845749927958/1251157290292219975/image.png?ex=66718307&is=66703187&hm=0f5a9bb16472a4dc2e8b924188894bb3d2ff0bb73ef18df3979189efb2e0e3e4&=&format=webp&quality=lossless&width=836&height=444",
            //"",
          ]
          const randomHoF = Math.floor(Math.random() * HoFMsg.length);
          message.channel.send(`${HoFMsg[randomHoF]}`)
        }
        break;
      }

      //quotes
      case constants.quotes: {
        if (command == constants.quotes) {
          const quotesMsg = [
            "https://media.discordapp.net/attachments/1250872620740640798/1251722774741913650/image.png?ex=6670eead&is=666f9d2d&hm=9b24b32578d7d05c11b143d238bb1c1065013d36a0352ab2a30c6db0a21f1411&=&format=webp&quality=lossless&width=1756&height=152",
            "https://media.discordapp.net/attachments/1250872620740640798/1251722856723906570/RPWswYy.png?ex=6670eec0&is=666f9d40&hm=6caec12584e812f654b228109f7b3ffba2e8925987aa4842115a44aa73a68c8f&=&format=webp&quality=lossless&width=674&height=214",
            "https://media.discordapp.net/attachments/731499501591855146/1226217543832830053/image.png?ex=667116d4&is=666fc554&hm=bda26a18e2ee275e5024acc22e207ef40523039e512bf9571b039b0fa5bbd51c&=&format=webp&quality=lossless&width=800&height=422",
            "https://media.discordapp.net/attachments/1250872620740640798/1251723328868061216/lol.png?ex=6670ef31&is=666f9db1&hm=a222e325611bc41de462a4514ad6712481695a36256efd7ddbd4435de2681ec7&=&format=webp&quality=lossless&width=1100&height=62",
            "https://media.discordapp.net/attachments/1250872620740640798/1251724033997668382/Screen_Shot_2022-11-28_at_11.png?ex=6670efd9&is=666f9e59&hm=561ef72adee12593fa462fe001ffdc2a65434fde397ce74a0c9161909375beb3&=&format=webp&quality=lossless&width=900&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1251724420708434121/image.png?ex=6670f035&is=666f9eb5&hm=636d35de265113dc8dda399270d7bd9428b8ab9affff57af6324a82ef688be9b&=&format=webp&quality=lossless&width=900&height=664",
            "https://images-ext-1.discordapp.net/external/lzFhKoOvbHSSd1uxJAKGfc-vahPpeIzYcW5FE-A2Z38/https/i.gyazo.com/thumb/1200/f73d926896b63043fde95ca9ffda5951-png.jpg?format=webp&width=1572&height=1326",
            "https://media.discordapp.net/attachments/1250872620740640798/1251724950059089980/4n2o6y1mirh71.png?ex=6670f0b4&is=666f9f34&hm=136f0022a00e86f5b2b85a55da049bd610c69a8f840581c7079b890d7d1bde3e&=&format=webp&quality=lossless&width=560&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1251728095669522502/2wZ2xx7.png?ex=6670f3a1&is=666fa221&hm=d5945ccc220b5f20567bc7290967c351aa308b74a6db8602b1a0fa10fba518b5&=&format=webp&quality=lossless&width=668&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1251728759606870170/image.png?ex=6670f440&is=666fa2c0&hm=a17a28782a39a6cab1a5b4d7adcccf294e1f3a0b12845bf67fea9073f933ab95&=&format=webp&quality=lossless&width=612&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1251729486110654474/image.png?ex=6670f4ed&is=666fa36d&hm=e8b0b5217fc7959be8a9491f8f71009af322666835861470d3c032128cf8f42f&=&format=webp&quality=lossless&width=910&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1251730589061484565/image.png?ex=6670f5f4&is=666fa474&hm=65a2f4426a727fefe9847b50b2fe13c1401b6772c2d50e5c017416e3500b238f&=&format=webp&quality=lossless&width=140&height=678",
            "https://media.discordapp.net/attachments/1250872620740640798/1251730840652611675/8CCCD2m.png?ex=6670f630&is=666fa4b0&hm=fb7e385f7c16233d91eb7789904bc908d3006795f94bf38b852a06aaf81c1cbe&=&format=webp&quality=lossless&width=1100&height=174",
            "https://media.discordapp.net/attachments/1250872620740640798/1251732787598463046/IMG_7616.png?ex=6670f800&is=666fa680&hm=958f1975210fd9415b894246ee5ac21e6bec485327bedcc4c07a3ee2ab276b10&=&format=webp&quality=lossless&width=324&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1251740090221199371/image.png?ex=6670fecd&is=666fad4d&hm=b7ced493b15921068116d43fa583f4705c65946bd371a53c56c3d3842e3403e1&=&format=webp&quality=lossless&width=956&height=106",
            "https://media.discordapp.net/attachments/1046851171052175451/1069635632701394944/image.png?ex=6670fa8f&is=666fa90f&hm=e8fc8f4f09e82513f6d3a26f2b25f2fe4b583594bb9a560734fac0be93697b4d&=&format=webp&quality=lossless&width=2258&height=1326",
            "https://media.discordapp.net/attachments/1250872620740640798/1252249146283393094/image.png?ex=66718766&is=667035e6&hm=3b81887c5484e9d88ee6f4625a1296122d762a55c8b7a61bbc4e8e1c0b68beb2&=&format=webp&quality=lossless&width=944&height=228",
            "https://media.discordapp.net/attachments/1046851171052175451/1228377947019280405/IMG_0297.png?ex=667109dc&is=666fb85c&hm=bc98a0099c0b2bb34532e54b45dd3b63a7b6bb80d34a682fe58312fd4d1303fe&=&format=webp&quality=lossless&width=324&height=700",
            "https://media.discordapp.net/attachments/731499501591855146/1252250813787668490/image.png?ex=667188f3&is=66703773&hm=f75c7c4acb6f49245cb11fd05d54220310e4cc67bfd117016939d0c914a05218&=&format=webp&quality=lossless&width=938&height=700",
            "https://media.discordapp.net/attachments/1250872620740640798/1252312374229340210/image.png?ex=667cf708&is=667ba588&hm=2f5ea43118f2a154c60bc442a73a7a190e3fb9fb1e197040c0fc0d167b8938b1&=&format=webp&quality=lossless&width=994&height=1058",
            "https://media.discordapp.net/attachments/1250872620740640798/1255546149658689728/image.png?ex=667d85f8&is=667c3478&hm=6d2dd134200bcd4c7e565658ee2d0b80542960b98372cb1971bab4a776d8b800&=&format=webp&quality=lossless&width=1088&height=700",
            "https://media.discordapp.net/attachments/1046851171052175451/1228435121628123146/image.png?ex=667d1c9c&is=667bcb1c&hm=50cf4a2f5f301598df36839bca403b1d7e289341689cbe4c976f6e384779e1c2&=&format=webp&quality=lossless&width=1734&height=1094",
            "https://media.discordapp.net/attachments/1046851171052175451/1227888627053494362/image.png?ex=667d19e5&is=667bc865&hm=7bec8cb859b896d706309ee5d9821d72434705984511874ad794640cc730ba49&=&format=webp&quality=lossless&width=1504&height=1274",
            "https://media.discordapp.net/attachments/1046851171052175451/1226210023340769340/Screenshot_2024-04-07_at_12.40.38_AM.png?ex=667ced53&is=667b9bd3&hm=85904ffe64e010c826339e7c7ba4cf2329c40566ccf97242ab3fa2de9e5c554a&=&format=webp&quality=lossless&width=1710&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1217017848061493308/8ixjfr.png?ex=667d1ab2&is=667bc932&hm=2d04c70172ef15b51f51216c28cb522778e07ddb9656785c8880d2f6eb8fcdef&=&format=webp&quality=lossless&width=832&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1214960979343974491/image.png?ex=667cdf56&is=667b8dd6&hm=e2cb43ede19e811a4ec6e753c0104f983e5dbef8a3c0b4f399c6a0fd296bf2fc&=&format=webp&quality=lossless&width=936&height=1152",
            "https://media.discordapp.net/attachments/1129095189202481203/1210312526504661022/image.png?ex=667d19a0&is=667bc820&hm=2e7e26ae7d1e72ee21ac66a716f36ad176454aa85f09a351710fcc8b20648743&=&format=webp&quality=lossless&width=1340&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1209315083667374080/image-1.png?ex=667d6d2f&is=667c1baf&hm=df4414b521f8624b19e9c333f4f7af352ac82d89bfa920791cff24dec4d5f522&=&format=webp&quality=lossless&width=812&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1181795521749331988/image.png?ex=667d8199&is=667c3019&hm=12000711d3f3954adf916128f387021d72bb9b4dbb79184a8bf95f2248febfd2&=&format=webp&quality=lossless&width=1520&height=1326",
            "https://media.discordapp.net/attachments/1250872620740640798/1252287191699292170/image.png?ex=667cdf94&is=667b8e14&hm=c4153f25a05592d293cda0c4892294ccd1954d3eb98d3e8ea6c25ac92a9108a6&=&format=webp&quality=lossless&width=1624&height=340",
            "https://media.discordapp.net/attachments/1046851171052175451/1175831363333664878/image.png?ex=667ce70a&is=667b958a&hm=30ffef8bc0c9e7cef559f723087479a4acb1c5f1ed47e4c086c2316d6377926a&=&format=webp&quality=lossless&width=2334&height=374",
            "https://media.discordapp.net/attachments/1046851171052175451/1175828284546748557/Untitled_1.png?ex=667ce42c&is=667b92ac&hm=bf9609d36d92e75035c927231522ad4aae11df3f48ed1ccc7aab73378713487c&=&format=webp&quality=lossless&width=1256&height=1326",
            "https://media.discordapp.net/attachments/1250872620740640798/1252286201361207456/image.png?ex=667cdea8&is=667b8d28&hm=da9f3b36615fea6ef4169d2ffc366cac8038353100791aef39369d9b8a4aa824&=&format=webp&quality=lossless&width=2592&height=902",
            "https://media.discordapp.net/attachments/1046851171052175451/1156265714840256682/IMG_9474.png?ex=667cea1c&is=667b989c&hm=ed9b4505fb0c9593d1d2a2e90d02404e94fa28b0ce26f38d4be7073bad466b89&=&format=webp&quality=lossless&width=612&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1152570096733143110/image.png?ex=667d500c&is=667bfe8c&hm=02306806b4abd239de5a5abd2f09780fca7786217d2a5c9145c81fae2d4c2803&=&format=webp&quality=lossless&width=1110&height=692",
            "https://media.discordapp.net/attachments/1046851171052175451/1138109983473549444/IMG_9261.png?ex=667d7105&is=667c1f85&hm=96a4e7aec519b5fa0a80eec83fb0e7f38aa5fa5f6ea95d7312264f87c382b0cb&=&format=webp&quality=lossless&width=612&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1137154148043849728/IMG_2422.png?ex=667d4294&is=667bf114&hm=8e60618fea019158eb54e95966ac6cee5c883a228189b1ddd7566ee4b9e46845&=&format=webp&quality=lossless&width=1350&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1118936703617482762/image.png?ex=667ce742&is=667b95c2&hm=2ec4b3dba1f06c2c95655528d7d61f95cc170149ef25749adda06ba8b70f8ef3&=&format=webp&quality=lossless&width=2592&height=484",
            "https://media.discordapp.net/attachments/1046851171052175451/1118928697727143966/image.png?ex=667cdfce&is=667b8e4e&hm=28772529c5356580b14dc3bd4c8fbb7c4ac7b26808bfe3f90bad80e9f6860ef4&=&format=webp&quality=lossless&width=828&height=1324",
            "https://media.discordapp.net/attachments/1046851171052175451/1118677413589684255/20230615_010414_0000.png?ex=667d4747&is=667bf5c7&hm=b0ad04768b284c5701dcecedb2ab5a2f627e03d9e9763ee2225e95c0d9f7b39a&=&format=webp&quality=lossless&width=778&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1117875172234506361/Picsart_23-06-12_12-55-29-101.png?ex=667cff22&is=667bada2&hm=6627a9e3482044167b4e8af01d337fda7a0c01216b40d0047f01a6c1e9ff3b28&=&format=webp&quality=lossless&width=1260&height=1260",
            "https://media.discordapp.net/attachments/1046851171052175451/1114296758848196658/LOL.jpg?ex=667d2979&is=667bd7f9&hm=42a44ac9373395f6999adf458ab564da113813d74faab48e52d2e6883f2815c6&=&format=webp&width=800&height=450",
            "https://media.discordapp.net/attachments/1046851171052175451/1114320943259598878/2weryl.png?ex=667d3fff&is=667bee7f&hm=2e3de353021f687edb040ae10564df5ae328d610adf122f3468035ef81a3f7f6&=&format=webp&quality=lossless&width=826&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1110232640298172518/Screenshot_20230522-104726.png?ex=667ce0f8&is=667b8f78&hm=a3688b5369bc98babbccdb1e958f5a523fe0a473116eacc80299635823930bfe&=&format=webp&quality=lossless&width=746&height=600",
            "https://media.discordapp.net/attachments/1046851171052175451/1101914711148204043/image.png?ex=667cf0cb&is=667b9f4b&hm=859f6e20438991b858e61c8d941cf97a75d8b92cc112803d9424b95b08563ce1&=&format=webp&quality=lossless&width=800&height=276",
            "https://media.discordapp.net/attachments/1046851171052175451/1101914236197802065/image.png?ex=667cf05a&is=667b9eda&hm=c82085212631c14f5dd504f02d980455c656c848cd26a689c92424e302270fb1&=&format=webp&quality=lossless&width=800&height=370",
            "https://media.discordapp.net/attachments/1046851171052175451/1101794549526966292/Lazy-and-Isen-pig-final.jpg?ex=667d29a2&is=667bd822&hm=eef2219dceefbffc276b7eb442688af71c5d73cb0dc1dfa28010c3b5c00518b0&=&format=webp&width=2592&height=1062",
            "https://media.discordapp.net/attachments/1250872620740640798/1252268058991398932/image.png?ex=667d7683&is=667c2503&hm=3022c2d980edd4d9f91477be30e4411e9ed1d61164d7def4ac93a8c7796c98b3&=&format=webp&quality=lossless&width=1100&height=574",
            "https://media.discordapp.net/attachments/1046851171052175451/1100954576691146813/image.png?ex=667d6719&is=667c1599&hm=29e4e1694469fe861edf7e9374538c7d96e545264fa87fd45cfe9a1758101c52&=&format=webp&quality=lossless&width=530&height=600",
            "https://media.discordapp.net/attachments/1250872620740640798/1252266066852319304/image.png?ex=667d74a8&is=667c2328&hm=be8678d57697deb3b5d5e167ed0ef524a9c4957950ff89687f2c86045f44b9af&=&format=webp&quality=lossless&width=2592&height=374",
            "https://media.discordapp.net/attachments/1250872620740640798/1252264506692997161/image.png?ex=667d7334&is=667c21b4&hm=f3369d1e1c7bc81d49b5e947b199c11b3e7a03c3fe4dd709501fa0245760fcd3&=&format=webp&quality=lossless&width=2592&height=750",
            "https://media.discordapp.net/attachments/1046851171052175451/1092603976442204200/Screenshot_20230403-191124_Discord.jpg?ex=667d587f&is=667c06ff&hm=cbb88ce903cfd7b1e1c1393f071caaa62ff6ce751ae0f409391753f5ae87c24d&=&format=webp&width=1552&height=324",
            "https://media.discordapp.net/attachments/1046851171052175451/1090603035887144991/image.png?ex=667d513a&is=667bffba&hm=33b9b373143d6cbb7086f096a9268c5d69740dc8c9afbc396699a73dcd54a2cd&=&format=webp&quality=lossless&width=962&height=710",
            "https://media.discordapp.net/attachments/1046851171052175451/1089603021014569041/image0.jpg?ex=667cf9a4&is=667ba824&hm=190f48ca345e0fc9b4e5ae2f43bbb05292ea875b5aa8472f26aa25d05b3a487c&=&format=webp&width=2340&height=1312",
            "https://media.discordapp.net/attachments/1046851171052175451/1089395930639388762/iceberg.png?ex=667ce185&is=667b9005&hm=fa4c3132940e18f76c1a27c62579b0e3fe139014b34b21864bf09e7d2292fdbd&=&format=webp&quality=lossless&width=492&height=600",
            "https://media.discordapp.net/attachments/1251044845749927958/1252261850641334332/Screenshot_2023-03-02_010245.png?ex=667d70bb&is=667c1f3b&hm=6615d24989f76311debe74b8c4d9822ad2d3d411ec643910db34b32cd64dbe47&=&format=webp&quality=lossless&width=1740&height=1326",
            "https://media.discordapp.net/attachments/1251044845749927958/1252261791384338532/image.png?ex=667d70ac&is=667c1f2c&hm=f451622691e57fbfbb7894727a600d6b78f9e7fab89b7b4900a8ef29076e04a1&=&format=webp&quality=lossless&width=900&height=490",
            "https://media.discordapp.net/attachments/1251044845749927958/1252261423510454422/Screenshot_2023-04-18_093948.png?ex=667d7055&is=667c1ed5&hm=5860f32de396401a614b781d894e80faac373fdd5b9a1d22560873df7da5897c&=&format=webp&quality=lossless&width=2136&height=1326",
            "https://media.discordapp.net/attachments/1251044845749927958/1252261391956578417/Screenshot_2023-04-20_135814.png?ex=667d704d&is=667c1ecd&hm=5affd227138f31ecc01c1f2076580ccbd63dc3d18b7e471b80d922d89ae72017&=&format=webp&quality=lossless&width=1462&height=206",
            "https://media.discordapp.net/attachments/1251044845749927958/1252261232627421274/Screenshot_2023-04-26_224230.png?ex=667d7027&is=667c1ea7&hm=a4be454b1a1c36dc19f86628831ffc561d004a9b266e55a6254740ebb3fc2287&=&format=webp&quality=lossless&width=1404&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1085934241566691378/image.png?ex=667d7892&is=667c2712&hm=770745b46c7346c5b3406b1358827c107112524723ee71f79f8832760dd86b90&=&format=webp&quality=lossless&width=586&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1083879492818305175/image.png?ex=667d3f30&is=667bedb0&hm=c3d1b3c9271342487b2264593f029d5f5a65141b1c79c554f98b973fd3154f85&=&format=webp&quality=lossless&width=1362&height=742",
            "https://media.discordapp.net/attachments/1046851171052175451/1083088150580166656/image.png?ex=667d0131&is=667bafb1&hm=93caa04db419a9d73e6adccb3536894839332a385050f7796f87ac017a1f4336&=&format=webp&quality=lossless&width=572&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1082564499984371772/IMG_8086.png?ex=667d13c1&is=667bc241&hm=f1a9033be0f5bf135aab8a628275464b5d03b83c44103bc83c2d44494276ee54&=&format=webp&quality=lossless&width=612&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1076235478686253086/image.png?ex=667d1fa5&is=667bce25&hm=302af1d2a4c0f522b0f9f1c62c100b186754e217f4dabc6bfc7467cc8b5426fb&=&format=webp&quality=lossless&width=1448&height=1118",
            "https://media.discordapp.net/attachments/1046851171052175451/1074935509622726697/20230214_010947.jpg?ex=667d0234&is=667bb0b4&hm=d06ad0f888d2c84fc6bbf4ca86c267f31be8e82d7bfe4c6682ff22509756e21c&=&format=webp&width=1106&height=1326",
            "https://media.discordapp.net/attachments/1046851171052175451/1073783011507708037/image.png?ex=667d6e1b&is=667c1c9b&hm=f708b0a86e8057f341a99710bdd31d8da8edeca819b14007fd1bdc61ed21b936&=&format=webp&quality=lossless&width=1202&height=646",
            "https://media.discordapp.net/attachments/1250872620740640798/1252253258538549337/image.png?ex=667d68ba&is=667c173a&hm=109f26c274bbf621eaee13aa6d0365710abacb2a7cce825b94d695e506d6518d&=&format=webp&quality=lossless&width=1100&height=460",
          ]
          const randomQuotes = Math.floor(Math.random() * quotesMsg.length);
          message.channel.send(`${quotesMsg[randomQuotes]}`)
        }
        break;
      }

      //videos
      case constants.videos: {
        if (command == constants.videos) {
          const videosMsg = [
            "https://www.youtube.com/watch?v=PgiGtmTgWus",
            "https://streamable.com/v7xpl6",
            "https://www.youtube.com/watch?v=zfICr-lti38",
            "https://youtu.be/0nPeDVYtI2s",
            "https://streamable.com/ow7vsm",
            "https://cdn.discordapp.com/attachments/731499501591855146/1252275360536592444/ruiningunitbuild.mp4?ex=667d7d50&is=667c2bd0&hm=c3d61216e665683cf0d96b87fcbbee2491aa8735cd0426653c3b9a3ce124c9d8&",
            "https://www.youtube.com/watch?v=oUS-Tx_c8nU",
            "https://www.youtube.com/watch?v=7qCeR7z0MCA",
            "https://cdn.discordapp.com/attachments/1046851171052175451/1126554286403358720/246df38d-8115-4765-8a2b-4dbea6b5897c.mp4?ex=667cee30&is=667b9cb0&hm=a26346958e60d48db5dbd3a1c5dd3689f09d89bb3fe3f9a46b63bb1fb76da501&",
            "https://www.youtube.com/watch?v=0Otrq3K6Amk",
            "https://cdn.discordapp.com/attachments/1046851171052175451/1079633609645883475/shino_amid.mp4?ex=667cf627&is=667ba4a7&hm=014600e1e73cfe26945938dc3e35d4694c5c8f0a57aa0c9847641ec893a30c50&",
            "https://www.youtube.com/watch?v=5UvcRyBdicg",
            "https://youtu.be/0nPeDVYtI2s",
          ]
          const randomvideosMsg = Math.floor(Math.random() * videosMsg.length);
          message.channel.send(`${videosMsg[randomvideosMsg]}`)
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