NinjaGame = NinjaGame || {};

NinjaGame.GameState = function(){};


//SWORD
var SWORD_SCALE = 1;
var SWORD_Y = -15;
var SWORD_X = 20;
var SWORD_ANCHOR = 0.5;
//OTHER
var NINJA_GRAVITY = 0.5;
var WORLD_DEATH = 270;
var newPlayer;
var newWeapon;
var castleStage;

NinjaGame.GameState.prototype = {
  init: function(levelData) {
      this.styling();
      this.levelData = levelData || 'level';
  },
  styling: function() {
    newPlayer = newPlayer || new castlePlayer();
    newWeapon = new castleWeapon();
    castleStage = new mycastleStage();
  },

  preload: function() {



  },


  create: function() {
    var text = "Running Our Game";
    var style = {font:'30px Arial', fill:"#fff", align:"center"};
    var t = this.game.add.text(this.game.width/2,this.game.height/2,text,style);
    t.anchor.set(0.5);
      castleStage.createBack(this.levelData);
      newPlayer.create(castleStage.playerTile[0].x, castleStage.playerTile[0].y);
      game.physics.ninja.gravity = NINJA_GRAVITY;

      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

      castleStage.createFront();

      castleControl.create();


  },
  update: function() {

      castleStage.update();
      newPlayer.update();
      newWeapon.update();
      _.each(castleStage.enemies, function(enemy){
        enemy.update();
      });
      castleControl.update();

  },
  render: function() {
    // game.debug.body(castleStage.enemies.children[0]);
    // game.debug.body(castleStage.enemies.children[1]);
    // game.debug.body(castleStage.enemies.children[2]);
  },


  weapons: [],





};
