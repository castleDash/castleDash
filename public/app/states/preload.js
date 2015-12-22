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

    this.load.spritesheet('ninja','app/assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
    this.load.spritesheet('orc','app/assets/sprites/orc_piratess.png', 64, 64, 36);
    this.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    //pulls json file of the level

    //pulls tileset art
    this.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');
    this.load.spritesheet('firepot', 'app/assets/sprites/firepotionfull.png',32,32, 9);
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
            console.log(saves);
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
