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
var saveInfo;

NinjaGame.GameState.prototype = {
  init: function(levelData) {

      var that = this;
      this.styling();
      this.levelData = levelData;
      if(!isNaN(levelData)){
        that.levelData = 'level'+levelData;
      }
      else if(levelData === undefined){
        that.levelData = 'level1';
      }
      else{
        that.levelData = 'level'+levelData.level;
        that.SaveInfo = levelData;
        saveInfo =levelData;
        var saveId = that.SaveInfo.id;

        $.ajax({
          method:"POST",
          url:"/selectSave",
          data:{id:saveId},
          success:function(){

          }
        });
      }
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
      backgroundMusic.loop = true;
      backgroundMusic.play();

      newPlayer.create(castleStage.playerTile[0].x, castleStage.playerTile[0].y);
      if(this.SaveInfo !== undefined){
        if(newPlayer.currentLevel < this.SaveInfo.level){
          newPlayer.currentLevel = this.SaveInfo.level;
          newPlayer.gold = this.SaveInfo.score;
          newPlayer.loseImmunity();
        }
        if(newPlayer.immunity){
          newPlayer.loseImmunity();
        }
      }

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
