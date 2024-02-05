const ClassWithImmutablePublicAttr = require('./baseClasses/classWithImmutablePublicAttr');
const ProtectedScope = require('./classExtensions/protectedScope');

const Constants = (() => {
  const sharedProtected = ProtectedScope();

  return class Constants extends ClassWithImmutablePublicAttr {
    constructor() {
      super();

      this.#setUpImmutableConstants();

      Object.freeze(this);
    }

    #setUpImmutableConstants() {
      const set = sharedProtected(this).DefineImmutablePublic;

      //----------COMMANDS-------------
      set('prefix', '!');
      set('ccHelpCommand', 'cc');
      set('cchelpText', `Input a command to get recommendations on your build.\n\nExample command: !cc peira, hwa, violet`);
      set('ccNoob', 'ccnoob');
      set('ccNoobMsg', `noob looking for solutions again.`);
      set('commands', 'commands');
      set('checkWinrate', 'ccwinrate');
      set('checkWinrateText', 'Checks your GVG Stats for the season.');
      set('noBuildCommand', `ccnobuild`);
      set('noBuildCommandText', `Gets the list of requested comps that we didn't have a build for.`);
      set('ccGearCheck', 'Check the stats on your gear. \n\nExample command:\n!ccGS 2cc, 1, 8, 7cd');
      set('ccGS', 'gs');
      set('welcome', 'wc');
      set('dmgCalc', 'dc');
      set('rta', 'rta');
      set('maint', 'mt');
      set('buffs', 'buff');
      set('unequip', 'uneq');
      set('mine', 'mine');

      //----------USERS-------------
      //set('bullied', 'vikChun8600');
      //set('aestheticaId', 'Aesthetica#4825');
      //set('officerRoles', ['Parabellum Officer'
      //, 'Parabellum2 Officer', 'Parabellum3 Officer'
      //]);

      //----------RESPONSES-------------
      set('ccDenialResponse', 'Find a guild member to sharingan, peasant.');
      set('vcroxDenialResponseGif', 'https://cdn.discordapp.com/attachments/963999915627913226/1027797143932645436/854092979358793759.gif');

      //----------EMBED IMAGE-------------
      set('embedImage', 'https://media.discordapp.net/attachments/1064657988855537675/1064792653784424468/image.png');

      set('sayings', [
        "This the comp.",
        "W ONLY."
      ]);

      set('nerfedUnits', ['Hwayoung']);
      set('nerfedUnitDisclaimer', '<a:gpb_JustCubes:889923431573880873> <a:gpb_JustCubes:889923431573880873> BEWARE! One of the following comps may not get the job done due to these nerfed units:');

      set('unitNickNames', {
        ayufine: 'Abyssal Yufine',
        ayufi: 'Abyssal Yufine',
        afine: 'Abyssal Yufine',
        ras: 'Adventurer Ras',
        aras: 'Adventurer Ras',
        atywin: 'Ambitious Tywin',
        aywin: 'Ambitious Tywin',
        angel: 'Angel of Light Angelica',
        aol: 'Angel of Light Angelica',
        aola: 'Angel of Light Angelica',
        momo: 'Angelic Montmorancy',
        aravi: 'Apocalypse Ravi',
        arby: 'Arbiter Vildred',
        ara: 'Aramintha',
        ads: "Archdemon's Shadow",
        ameru: "Archdemon's Shadow",
        garmin: 'Armin',
        fatcat: 'Assassin Cartuja',
        acidd: 'Assassin Cidd',
        acoli: 'Assassin Coli',
        alena: 'Astromancer Elena',
        alots: 'Auxiliary Lots',
        bacon: 'Baiken',
        broman: 'Benevolent Romann',
        bromann: 'Benevolent Romann',
        bingo: 'Blaze Dingo',
        blingo: 'Blaze Dingo',
        bbk: 'Blood Blade Karin',
        bmh: 'Blood Moon Haste',
        briseria: 'Briar Witch Iseria',
        cmerc: 'Celestial Mercedes',
        cdom: 'Challenger Dominiel',
        cerato: 'Champion Zerato',
        champz: 'Champion Zerato',
        forehead: 'Charlotte',
        rat: 'Choux',
        ccharles: 'Closer Charles',
        clorina: 'Commander Lorina',
        cavel: 'Commander Pavel',
        cilias: 'Conqueror Lilias',
        clilias: 'Conqueror Lilias',
        "c.lilias": 'Conqueror Lilias',
        carmin: 'Crimson Armin',
        dc: 'Dark Corvus',
        dorvus: 'Dark Corvus',
        ddr: 'Death Dealer Ray',
        djb: 'Desert Jewel Basar',
        sandguy: 'Desert Jewel Basar',
        delibet: 'Designer Lilibet',
        dilibet: 'Designer Lilibet',
        ed: 'Edward Elric',
        ftene: 'Fairytale Tenebria',
        flidica: 'Faithless Lidica',
        fkluri: 'Falconer Kluri',
        fluri: 'Falconer Kluri',
        fcc: 'Fallen Cecilia',
        fmaya: 'Fighter Maya',
        gpurg: 'General Purrgis',
        gp: 'General Purrgis',
        gaither: 'Guider Aither',
        gayther: 'Guider Aither',
        hofine: 'Holiday Yufine',
        hyufine: 'Holiday Yufine',
        ricardo: 'Inferno Khawazu',
        jkise: 'Judge Kise',
        juggs: 'Judge Kise',
        "fire handguy": 'Kawerik',
        gayron: 'Kayron',
        "vik's daddy": 'Kayron',
        lrk: 'Last Rider Krau',
        lermia: 'Lionheart Cermia',
        lhc: 'Lionheart Cermia',
        lqc: 'Little Queen Charlotte',
        maken: 'Martial Artist Ken',
        mlken: 'Martial Artist Ken',
        handguy: 'Mediator Kawerik',
        medwick: 'Mediator Kawerik',
        meru: 'Mercedes',
        gilias: 'Midnight Gala Lilias',
        milias: 'Midnight Gala Lilias',
        "moon mommy": 'Moon Bunny Dominiel',
        daddy: 'Mort',
        monk: 'Nahkwol',
        candy: 'Navy Captain Landy',
        nacl: 'Navy Captain Landy',
        "ml landy": 'Navy Captain Landy',
        mandy: 'Navy Captain Landy',
        obl: 'Ocean Breeze Luluca',
        oblulu: 'Ocean Breeze Luluca',
        slulul: 'Ocean Breeze Luluca',
        lulucar: 'Ocean Breeze Luluca',
        opsig: 'Operator Sigret',
        pflan: 'Pirate Captain Flan',
        faptain: 'Pirate Captain Flan',
        riolet: 'Remnant Violet',
        rv: 'Remnant Violet',
        "sage balls": 'Sage Baal and Sezan',
        sadin: 'Savior Adin',
        ssb: 'Seaside Bellona',
        srose: 'Shadow Rose',
        ssa: 'Shooting Star Achates',
        sba: 'Silver Blade Aramintha',
        singie: 'Sinful Angelica',
        spez: 'Specimen Sez',
        stene: 'Specter Tenebria',
        seline: 'Spirit Eye Celine',
        sharklotte: 'Summer Break Charlotte',
        siseria: 'Summertime Iseria',
        seaseria: 'Summertime Iseria',
        ssi: 'Summertime Iseria',
        sylvian: 'Sylvan Sage Vivian',
        tg: 'Taranor Guard',
        tsurin: 'Tempest Surin',
        tmluluca: 'Top Model Luluca',
        tml: 'Top Model Luluca',
        tomoca: 'Top Model Luluca',
        tmcrozet: 'Troublemaker Crozet',
        trozet: 'Troublemaker Crozet',
        arowell: 'Unbound Knight Arowell',
        mlchoux: 'Urban Shadow Choux',
        mlrat: 'Urban Shadow Choux',
        uschoux: 'Urban Shadow Choux',
        shoux: 'Urban Shadow Choux',
        wilk: 'Wanderer Silk',
        wschuri: 'Watcher Schuri',
      });
    }
  }
})();

module.exports = new Constants();