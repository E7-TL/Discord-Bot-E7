const ClassWithImmutablePublicAttr = require('../baseClasses/classWithImmutablePublicAttr');
const ProtectedScope = require('../classExtensions/protectedScope');
const sheets = require('../googleAuth/googleSheet');
require('dotenv').config();

const googleSheets = new sheets(process.env.e7sheet);

const UNIT_NAME_START = 0;
const BUILD_DATA_START = 5;
const BUILD_DATA_END = 15;
const LINK_LENGTH = 3;
const NO_BUILD_FOUND_STRING = '#N/A';
const NO_DATA_STRING = 'No Data';
const CORRECT_NUM_UNITS = 3;
// const SHEET_LINK = (process.env.sheetlink);
const NOT_ENOUGH_UNITS_STRING = "You didn't provide enough units to search.";
const TOO_MANY_UNITS_STRING = 'You input too many units.';
const GEAR_DATA_INSUFFICIENT = 'Gear data insufficient - cannot calculate gear score.'
const GEAR_DATA_OVERLIMIT = 'Gear data over limit - cannot calculate gear score.'


const Vhelp = (() => {
  const sharedProtected = ProtectedScope();

  return class Vhelp extends ClassWithImmutablePublicAttr {
    #message;
    #userId;
    #sharedFunctionality;
    #constants;
    #discordFunctionality

    constructor(message, sharedFunctionality, constants, discordFunctionality) {
      super();

      this.#message = message;
      this.#userId = message.member.user.id;
      this.#sharedFunctionality = sharedFunctionality;
      this.#constants = constants;
      this.#discordFunctionality = discordFunctionality;

      const set = sharedProtected(this).DefineImmutablePublic;

      set('doHelpCommand', this.#doHelpCommand)
      set('denyHelp', this.#denyHelp);
      set('directToHelpCommand', this.#directToHelpCommand);
      set('getCommands', this.#getCommands);
      set('getNoBuildComps', this.#GetNoBuildComps);
      set('ccGearScore', this.#getGearScore);

      Object.freeze(this);
    }

    //These are all private so we can create public immutable links to the functions
    #buildImageEmbeds(channelLink, imageLinks) {
      const { EmbedBuilder } = this.#discordFunctionality;

      return imageLinks.filter((element) => { if (element && element != NO_BUILD_FOUND_STRING) return true }).map((element) => {
        return new EmbedBuilder().setURL(channelLink).setImage(element);
      });
    }

    #buildVhelpEmbeds(userTag, channelLink, unitNames, imageLinks, builds) {
      const embedTitle = unitNames.reduce((finalString, currentString, index) => {
        return `${finalString}${index > 0 ? ',' : ''} ${currentString}`;
      }, "");

      const { EmbedBuilder } = this.#discordFunctionality;

      const embed = new EmbedBuilder()
        .setTitle(`Enemy Defense: ${embedTitle}`)
        .setURL(channelLink)
        .setDescription(this.#getSayings(userTag))
        .setTimestamp()
        .setThumbnail(this.#constants.embedImage)
        .setColor('#FFC933');

      //Loops through all comp info and adds fields for them
      builds.forEach((element, index) => {
        embed.addFields({ name: '\u200B', value: '\u200B', },);

        let offenseName = `Alternative ${index} Offense`;
        let artifactsName = `Alternative ${index} Artifacts`;
        let notesName = `Notes: Alternative ${index}`;

        if (index == 0) {
          offenseName = 'Recommended Offense';
          artifactsName = 'Recomended Artifacts';
          notesName = 'Notes: Recommended';
        }

        embed.addFields(
          { name: offenseName, value: element.recommendedUnits, inline: true },
          { name: artifactsName, value: element.recommendedArtifacts, inline: true },
          { name: notesName, value: element.recommendedNotes, inline: false },
        );
      });

      // embed.addFields(
      //   {name: '\u200B', value: '\u200B',},
      //   { name: 'Recommended Unit Stat + Link for Additional Stats', value: SHEET_LINK, inline: false},);

      embed.setFooter({
        text: `Requested by: ${userTag}`,
        iconURL: this.#message.author.displayAvatarURL(),
      });

      const imageEmbeds = Array.isArray(imageLinks) && imageLinks.length > 0 ? this.#buildImageEmbeds(channelLink, imageLinks) : [];

      return [embed, ...imageEmbeds];
    }

    #constructDataRanges(data) {
      const links = data.slice(data.length - LINK_LENGTH, data.length).map((element) => { return element[LINK_LENGTH] });

      return {
        unitNames: data[UNIT_NAME_START],
        buildData: data.slice(BUILD_DATA_START, BUILD_DATA_END),
        imageLinks: links,
      };
    }

    #createEmbedFieldsForComps(units, artifacts, notes) {
      let buildEmbeds = [];
      let includeDisclaimer = false;

      do {
        const buildUnits = units.splice(0, Math.min(units.length, 4));
        const buildArtifacts = artifacts.splice(0, Math.min(artifacts.length, 4));
        const buildNotes = (notes) ? notes.splice(0, Math.min(notes.length, 4)) : [];

        const unitString = `${buildUnits[0]}\n${buildUnits[1]}\n${buildUnits[2]}`;
        const artifactString = `${buildArtifacts[0]}\n${buildArtifacts[1]}\n${buildArtifacts[2]}`;
        const noteString = (buildNotes && buildNotes[0]) ? buildNotes[0] : NO_DATA_STRING;

        if (!includeDisclaimer) {
          includeDisclaimer = !this.#constants.nerfedUnits.every((unit) => {
            return buildUnits[0] != unit && buildUnits[1] != unit && buildUnits[2] != unit;
          })
        }

        buildEmbeds.push(
          {
            recommendedUnits: unitString,
            recommendedArtifacts: artifactString,
            recommendedNotes: noteString
          }
        );

      } while (units.length > 0);

      return {
        builds: buildEmbeds,
        disclaimer: includeDisclaimer
      }
    }

    #denyHelp() {
      this.#sendMessage(this.#constants.ccDenialResponse);
    }

    #directToHelpCommand() {
      this.#sendMessage(`Hey <@${this.#userId}>, please use the !cc command.`);
    }

    async #doHelpCommand(args, userTag, command) {
      const nickNameDictionary = this.#constants.unitNickNames;

      //replaces the user inputed value nicknames with the actual values where applicable
      const theRest = args.split(',').map((element) => {
        const userInputed = element.toLowerCase().trim();
        const nickName = nickNameDictionary[userInputed];

        if (nickName) return nickName;

        return userInputed;
      });

      if (theRest.length < CORRECT_NUM_UNITS) {
        this.#messageNotEnoughUnits();
        return;
      }

      if (theRest.length > CORRECT_NUM_UNITS) {
        this.#messageTooManyUnits();
        return
      }

      // add values into cells and read data from sheet
      const getRows = googleSheets.Update('Comp Search!B6:D6', [theRest]);
      const metaData = await googleSheets.GetMetaData();
      const readData = await googleSheets.ReadData('Comp Search!B4:M23');

      const { unitNames, buildData, imageLinks } = this.#constructDataRanges(readData);

      if (buildData[1] != NO_BUILD_FOUND_STRING) {

        //Creates all of the strings used for the embed later
        const { disclaimer, builds } = this.#createEmbedFieldsForComps(buildData[2], buildData[5], buildData[9]);

        const channelLink = `https://discord.com/channels/${this.#message.guildId}/${this.#message.channelId}`;

        const embeds = this.#buildVhelpEmbeds(userTag, channelLink, unitNames, imageLinks, builds);

        if (disclaimer) {
          const disclaimerString = this.#getDisclaimerString();
          this.#sendMessage(`${this.#sharedFunctionality.getPingUserString(command, this.#userId)} ${disclaimerString}`);
        }
        else {
          this.#sendMessage(this.#sharedFunctionality.getPingUserString(command, this.#userId));
        }

        this.#sendMessage({ embeds: [...embeds] });
      }
      else {
        await this.#doNoBuild(theRest, unitNames);
      }
    }

    async #doNoBuild(theRest, unitNames) {
      let shouldWrite = true;

      const output = unitNames.reduce((finalString, currentString, index) => {
        if (currentString == '#N/A') {
          shouldWrite = false;
          return `${finalString}${index > 0 ? ',' : ''} ${theRest[index]}`;
        }
        return `${finalString}${index > 0 ? ',' : ''} ${currentString}`;
      }, "");
      this.#sendMessage(`There is no build for: ${output}`);

      const noBuildData = await googleSheets.ReadData('Non-Response Raw Data!A2:A');
      const nextIndex = noBuildData.length + 2;

      if (shouldWrite) {
        try {
          const written = googleSheets.Update(`Non-Response Raw Data!A${nextIndex}:C${nextIndex}`, [unitNames.sort()]);
        }
        catch (err) {
          console.log(err);
        }
      }
    }

    async #GetNoBuildComps(command, userTag) {
      const noBuildData = await googleSheets.ReadData('Non-Response Report!A3:D');
      const displayString = noBuildData.reduce((finalString, current) => {
        const units = current.slice(0, 3).reduce((finalString, element, index) => {
          return `${finalString}${index > 0 ? ', ' : ''}${element}`;
        }, '');

        const occurrences = current.at(-1);

        return `${finalString}${occurrences} | ${units}\n`
      }, '');

      const channelLink = `https://discord.com/channels/${this.#message.guildId}/${this.#message.channelId}`;

      const { EmbedBuilder } = this.#discordFunctionality;

      const embed = new EmbedBuilder()
        .setTitle(`Inquiries Without Comps`)
        .setURL(channelLink)
        .setTimestamp()
        .setThumbnail(this.#constants.embedImage)
        .setColor('#FFC933')
        .addFields(
          { name: '# | Comps', value: displayString, inline: true },
        )
        .setFooter({
          text: `Requested by: ${userTag}`,
          iconURL: this.#message.author.displayAvatarURL(),
        });

      //{name: '\u200B', value: '\u200B',}
      this.#sendMessage(this.#sharedFunctionality.getPingUserString(command, this.#userId))
      this.#sendMessage({ embeds: [embed] });
    }

    async #getGearScore(gearData, userId) {
      // //this function checks if there are repeats of 'c' in command, but will always return true because within GearData, we are receiving
      // function hasRepeats(str) {
      //   return (/([a-z])\1/i).test(str)
      // };

      // hasRepeats(gearData);


      if (gearData) {
        const splitGearData = gearData.split(' ');
        // const formula = '(x * 1.6) + y + z + (a4 * 1.14)';
        if (splitGearData.length === 4) {
          const individualGearScores = splitGearData.map(scores => {
            const speed = scores.includes('spd');
            const crit = scores.includes('cc');
            const cd = scores.includes('cd');
            const fhp = scores.includes('fhp');
            const fdef = scores.includes('fdef');
            const fatk = scores.includes('fatk');
            const getScoreInt = (/\D/g, '');

            if (speed) {
              scores.replace(getScoreInt);
              const finalSpeedScore = parseInt(scores) * 2;
              return finalSpeedScore;
            } else if (crit) {
              scores.replace(getScoreInt);
              const finalCritScore = parseInt(scores) * 1.6;
              return finalCritScore;
            } else if (cd) {
              scores.replace(getScoreInt);
              const finalCdScore = parseInt(scores) * 1.14;
              return finalCdScore;
            } else if (fhp) {
              scores.replace(getScoreInt);
              const finalHpScore = parseInt(scores) / 56.11;
              return finalHpScore;
            } else if (fdef) {
              scores.replace(getScoreInt);
              const finalfDefScore = parseInt(scores) / 6.03;
              return finalfDefScore;
            } else if (fatk) {
              scores.replace(getScoreInt);
              const finalfAtkScore = parseInt(scores) / 12.72;
              return finalfAtkScore;
            } else {
              scores.replace(getScoreInt);
              const finalScore = parseInt(scores);
              return finalScore;
            };
          });
          const finalGearScore = individualGearScores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
          const gsMsg = `Hey <@${this.#userId}>, here is your gear score: **${finalGearScore.toFixed(2)}**`;
          const getRandom = (list) => {
            return list[Math.floor((Math.random() * list.length))];
          }
          // < 40
          const errorGs = [
            '<:peeporeally:830096158445404210>'
          ]
          // 40 - 62
          const veryLowGs = [
            'Average TL5 member gear.',
            'Why are you rolling blue gear?',
            'I take no responsibility for what has transpired here.',
            'Is that you Inj?',
            'Always knew you were French <:higairl:954157809858134016>',
            'Are you sure you are in the right guild?',
            'You know you can do better <:trashmodelluluca:997253202539986994>',
            'Looks like a nice charm.',
            'Maybe the gear you feed this into will roll better.',
            'Did you roll this to be in LazyP\'s meme video?',
            'Are you competing for lowest gs in the treasure hunt?',
            'Have you tried reforging?',
            'I suggest you follow Inca\'s guide and stop rolling garbage.',
            'This gear should pull a Fav and disappear.',
            'In terms of gear, you are probably the guild member with the worst quality.',
            'Stop upgrading free gear.',
            'You know there is higher hunts than 7 right?',
            'Huche sells cheaper charms than this.',
            'You\'re supposed to sell story drops.',
            'I don\'t think you finished rolling your piece.',
            'You\'re supposed to check +15 gear',
            'My condolences <:worrypat:888488594178703371>',
            'Does Smilegate offer a gear refund policy',
            'You know red gear exists right?',
            'I hope at least your mother is proud of you.',
            'Stop it, get some help.',
            'Start looking for a new guild',
            'May i interest you in the services of Dark?',
          ]
          // 62 - 68
          const lowGs = [
            'Maybe usable in PVE?',
            'Pretty mid.',
            'Fribbels will find a way.',
            'I hope this is tank gear.',
            'This is definitely one of the gears of all time.',
            'If I could rate this gear out of 10, I would.',
            'Everyone has to start somewhere.',
            'How can you let Xanto outgears you bro',
            'It\’s not the size of the gs that matters, but how well u use it!',
            'If this came from a gear pack id refund my purchase.',
          ]
          // 70 - 75
          const midGs = [
            'Gimme more of this!',
            'Congrats, happy for you.',
            'Can you share some of your luck?',
            'This is a great gear for everyone, a great gear for everyone!',
            'Is it you, Greater Fallen Hero?',
            '<:solicoom:1068565653126127616>',
            '<:apocoom:1006197440719892591>',
            'You needed a bot to tell you this was good?',
            'GS yum yum',
            'Did you get this epic gear from Rift?'
          ]
          // 75 - 82
          const highGs = [
            'Auto to Emperor with this kind of gear.',
            'May I assist you with your fort application?',
            'OwO what\'s this?',
            'Why are you checking my gear?',
            'Can I keep it?',
            'When is Smilegate adding an auction house?',
            '<:lgtmig:1160500723457458236>',
            'That\'s a winner!',
            'Rich get richer <:lazypenguinirl:1117033128012296253>',
            'Baronjose would be proud.',
          ]
          // 82 - 86
          const veryHighGs = [
            'Is this hit set <:monkahmm:756070233273532547>.',
            'Are you also waiting for an ER scaling DPS?',
            'Let me guess, this has both ER and Effectiveness.',
            'Sitting there unused when you sort by gs in Fribbels?'
          ]
          // 86+
          const impossibleGs = [
            'How did you get early access to Epic 8?',
            'Didn\'t know the latest update included i100 gear.',
            'What\'s your Wyvern 14 team?'
          ]
          if (finalGearScore < 40) {
            this.#sendMessage(`${gsMsg}. ${getRandom(errorGs)}`);
          } else if (finalGearScore < 62) {
            this.#sendMessage(`${gsMsg}. ${getRandom(veryLowGs)}`);
          } else if (finalGearScore >= 62 && finalGearScore < 69) {
            this.#sendMessage(`${gsMsg}. ${getRandom(lowGs)}`);
          } else if (finalGearScore >= 69 && finalGearScore < 70) {
            this.#sendMessage(`${gsMsg} \n69, nice!`);
          } else if (finalGearScore > 70 && finalGearScore < 75) {
            this.#sendMessage(`${gsMsg}. ${getRandom(midGs)}`);
          } else if (finalGearScore >= 75 && finalGearScore < 82) {
            this.#sendMessage(`${gsMsg}. ${getRandom(highGs)}`);
          } else if (finalGearScore >= 82 && finalGearScore < 86) {
            this.#sendMessage(`${gsMsg}. ${getRandom(veryHighGs)}`);
          } else {
            this.#sendMessage(`${gsMsg}. ${getRandom(impossibleGs)}`);
          };
          return;
        } else if (splitGearData.length > 4) {
          this.#messageGearOverlimit();
        } else {
          this.#messageGearInsufficient();
        };
      } else {
        this.#messageGearInsufficient();
        return;
      };
    };

    #getCommands() {
      return [
        { name: '!ccHelp', text: this.#constants.cchelpText },
        { name: '!ccGS', text: this.#constants.ccGearCheck },
        { name: '!ccNoBuild', text: this.#constants.noBuildCommandText }
      ];
    }

    #getDisclaimerString() {
      const nerfedUnits = this.#constants.nerfedUnits.reduce((finalString, currentValue, index) => {
        return `${finalString}${index > 0 ? ',' : ''} ${currentValue}`;
      }, "");

      return `${this.#constants.nerfedUnitDisclaimer} ${nerfedUnits}`;
    }

    #getSayings(userTag) {
      if (userTag == this.#constants.aestheticaId) return this.#constants.aestheticaResponse;
      const randomInt = Math.floor(Math.random() * (this.#constants.sayings.length - 1));

      return this.#constants.sayings[randomInt];
    }

    #messageNotEnoughUnits() {
      this.#sendMessage(NOT_ENOUGH_UNITS_STRING);
    }

    #messageTooManyUnits() {
      this.#sendMessage(TOO_MANY_UNITS_STRING);
    }

    #messageGearOverlimit() {
      this.#sendMessage(GEAR_DATA_OVERLIMIT);
    }

    #messageGearInsufficient() {
      this.#sendMessage(GEAR_DATA_INSUFFICIENT);
    }

    #sendMessage(messageString) {
      this.#message.channel.send(messageString);
    }
  }
})();

module.exports = Vhelp;