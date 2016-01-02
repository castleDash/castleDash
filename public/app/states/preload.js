var NinjaGame = NinjaGame || {};
NinjaGame.Preload = function(){};
var levelArr = [];


NinjaGame.Preload.prototype ={
  init:function(){




  },

  preload:function(){
    var that = this;
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(2);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.spritesheet('ninja','app/assets/sprites/NinjaCoverGirl.png', 32, 48, 10);
    this.load.spritesheet('orc','app/assets/sprites/orc_piratess.png', 64, 64, 36);
    this.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    //pulls json file of the level

    //audio effects

    this.load.audio('music', 'app/assets/audio/music/What a nice surprise.ogg');
    this.load.audio('level1Music', 'app/assets/audio/music/home.ogg');
    this.load.audio('level2Music', 'app/assets/audio/music/NorthernIsles.ogg');
    this.load.audio('level3Music', 'app/assets/audio/music/prepare_your_swords.ogg');
    this.load.audio('creditsMusic', 'app/assets/audio/music/What a nice surprise.ogg');

    this.load.audio('enemyHit', 'app/assets/audio/enemySound/orcHurt.ogg');

    this.load.audio('step', 'app/assets/audio/playerSound/Ejimas1.m4a');
    this.load.audio('swordSound', 'app/assets/audio/playerSound/swish-13.wav');
    this.load.audio('throwSound', 'app/assets/audio/playerSound/sfx_throw.wav');
    this.load.audio('bottleBreak', 'app/assets/audio/playerSound/Bottle Break.wav');
    this.load.audio('playerHurt', 'app/assets/audio/playerSound/playerHurt.ogg');
    this.load.audio('playerDeath', 'app/assets/audio/playerSound/playerDeath.ogg');
    this.load.audio('playerJump', 'app/assets/audio/playerSound/SFX_Jump_24.wav');




    //pulls tileset art
    this.load.spritesheet('jumperControl','app/assets/sprites/jumpcontrol.png',100,20,3);
    this.load.spritesheet('attackControl','app/assets/sprites/attackcontrol.png',100,20,3);
    this.load.spritesheet('moveControl','app/assets/sprites/movecontrols.png',100,20,3);
    this.load.spritesheet('pauseControl','app/assets/sprites/pausecontrol.png',100,20,3);
    this.load.spritesheet('toggleControl','app/assets/sprites/togglecontrol.png',100,20,3);
    this.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');
    this.load.spritesheet('firepot', 'app/assets/sprites/firepotionfull.png',32,32, 9);
    this.load.image('tiles','app/assets/tiledMaps/patformkenney-32-4x39.png');
    this.load.image('tree', 'app/assets/tiledMaps/PineTree.png');
    this.load.image('ship', 'app/assets/tiledMaps/2nd_ship_new_4.png');
    this.load.image('sky', 'app/assets/backgroundArt/sky.png');
    this.load.image('coin', 'app/assets/sprites/coin.png');
    this.load.image('fullheart', 'app/assets/sprites/fullheart.png');
    this.load.image('halfheart', 'app/assets/sprites/halfheart.png');
    this.load.image('emptyheart', 'app/assets/sprites/emptyheart.png');
    this.load.image('pauseBtn', 'app/assets/sprites/pause.png');
    this.load.spritesheet('jumpBtn', 'app/assets/sprites/Jump_btn.png',32,32,2);
    this.load.spritesheet('attackBtn', 'app/assets/sprites/Attack_btn.png',32,32,2);
    this.load.spritesheet('leftBtn', 'app/assets/sprites/left.png',32,32,2);
    this.load.spritesheet('rightBtn', 'app/assets/sprites/right.png',32,32,2);
    this.load.spritesheet('upBtn', 'app/assets/sprites/up.png',32,32,2);
    this.load.spritesheet('downBtn', 'app/assets/sprites/down.png',32,32,2);

    this.load.tilemap('tutorial', 'app/assets/tiledMaps/tutorial.json', null,  Phaser.Tilemap.TILED_JSON);

    this.load.script('level.js','app/js/levels.js');
    this.load.script('enemy.js','app/js/enemy.js');
    this.load.script('gameControl.js','app/js/gameControl.js');
    this.load.script('hazards.js','app/js/hazards.js');
    this.load.script('player.js','app/js/player.js');
    this.load.script('untouchables.js','app/js/untouchables.js');
    this.load.script('weapon.js','app/js/weapon.js');
    this.load.script('hud.js','app/js/hud.js');
    this.load.script('pauseMenu.js','app/js/pauseMenu.js');

    $.ajax({
      method:"GET",
      url:'/levelData',
      success: function(data){
        _.each(data, function(i){
          levelArr.push(i.levelCode);
        });
        that.doThis();
        $.ajax({
          method:"GET",
          url:"/saveList",
          success:function(saves){
            that.state.start('MainMenu',true,false, saves);
          }
        });

      }
    });
  },

  create:function(){},

  doThis:function(){
    this.load.tilemap('level1', null, levelArr[0],  Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level2', null, levelArr[1], Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('level3', null, levelArr[2], Phaser.Tilemap.TILED_JSON);
  },



};
