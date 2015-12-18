var NinjaGame = NinjaGame || {};
NinjaGame.Preload = function(){};

NinjaGame.Preload.prototype ={

  preload:function(){
    console.log("Preload");
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(2);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.spritesheet('ninja','app/assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
    this.load.spritesheet('orc','app/assets/sprites/orc_piratess.png', 64, 64, 36);
    this.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    //pulls json file of the level
    this.load.tilemap('level', 'app/assets/levels/testLevel.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', 'app/assets/levels/testLevel2.json', null, Phaser.Tilemap.TILED_JSON);
    //pulls tileset art
    this.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');
    this.load.image('tiles','app/assets/tiledMaps/patformkenney-32-4x39.png');
    this.load.image('tree', 'app/assets/tiledMaps/PineTree.png');
    this.load.image('sky', 'app/assets/backgroundArt/sky.png');
    this.load.spritesheet('jumpBtn', 'app/assets/sprites/Jump_btn.png',32,32,2);
    this.load.spritesheet('attackBtn', 'app/assets/sprites/Attack_btn.png',32,32,2);
    this.load.spritesheet('leftBtn', 'app/assets/sprites/left.png',32,32,2);
    this.load.spritesheet('rightBtn', 'app/assets/sprites/right.png',32,32,2);
    this.load.spritesheet('upBtn', 'app/assets/sprites/up.png',32,32,2);
    this.load.spritesheet('downBtn', 'app/assets/sprites/down.png',32,32,2);

    this.load.script('level.js','app/js/levels.js');
    this.load.script('enemy.js','app/js/enemy.js');
    this.load.script('gameControl.js','app/js/gameControl.js');
    this.load.script('hazards.js','app/js/hazards.js');
    this.load.script('player.js','app/js/player.js');
    this.load.script('save.js','app/js/save.js');
    this.load.script('untouchables.js','app/js/untouchables.js');
    this.load.script('weapon.js','app/js/weapon.js');

  },

  create:function(){
    this.state.start('MainMenu');
  }


};
