var loadAssets = function(){};


loadAssets.prototype ={

  init: function(){
    console.log('assets');
    // this.ourSave = ourSave;
    var loadingBar = game.add.sprite(game.world.centerX, 200, 'loading');
  },
  loadScripts:function(){
    game.load.script('player', 'app/js/player.js');
    game.load.script('enemy','app/js/enemy.js');
    game.load.script('levels','app/js/levels.js');
    game.load.script('hazards','app/js/hazards.js');
    game.load.script('weapon','app/js/weapon.js');
    game.load.script('controlls','app/js/gameControl.js');
    game.load.script('untouchables','app/js/untouchables.js');
    game.load.script('castleGame','app/js/game.js');
  },

  loadImages:function(){
    game.load.spritesheet('ninja','app/assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
    game.load.spritesheet('orc','app/assets/sprites/orc_piratess.png', 64, 64, 36);
    game.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    //pulls json file of the level
    game.load.tilemap('level', 'app/assets/levels/testLevel.json', null, Phaser.Tilemap.TILED_JSON);
    //pulls tileset art
    game.load.image('tiles','app/assets/tiledMaps/patformkenney-32-4x39.png');
    game.load.image('tree', 'app/assets/tiledMaps/PineTree.png');
    game.load.image('sky', 'app/assets/backgroundArt/sky.png');
  },

  preload:function(){
    // game.add.existing(this.loadingBar);
    // this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
  },

  create: function(){
    game.state.start("PlayGame");
  },






};
