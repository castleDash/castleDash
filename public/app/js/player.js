var PLAYER_SPEED = 50;
var castlePlayer = function(){};
var jumpSound;
var walkSound;
//var swordSound;
var potionSound;
var splashSound;
var playerHurtSound;
var playerDeathSound;

castlePlayer.prototype = {
    preload: function() {

    },

    create: function(x,y) {
        player = NinjaGame.game.add.sprite(x,y, 'ninja');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.scale.setTo(0.8, 0.7);
        NinjaGame.game.physics.ninja.enableAABB(player);
        player.scale.setTo(1, 1);
        player.body.bounce = 0;
        player.body.friction = 0.14;
        player.anchor.setTo(0.5, 0.65);
        player.body.collideWorldBounds = true;
        player.frame=5;
        player.health=6;
        player.immunity=false;
        player.fightTimer= NinjaGame.game.time.create(false);
        player.beAttackedTimer= NinjaGame.game.time.create(false);
        player.canAttack= true;
        player.canBeAttacked=true;

        walkSound = game.add.audio('step');
        //swordSound = game.add.audio('swordSound');
        playerHurtSound = game.add.audio('playerHurt');
        playerDeathSound = game.add.audio('playerDeath');
        jumpSound = game.add.audio('playerJump');


    },

    update: function() {
        if (player.body.x>=castleStage.endTile[0].x && player.body.y>=castleStage.endTile[0].y && player.body.y<=(castleStage.endTile[0].y+32)){
            if(castleStage.levelName !="tutorial"){
              this.currentLevel = this.currentLevel +1;
              this.previousGold = this.gold;
              if(this.currentLevel === 4){
                NinjaGame.game.state.start('Credits',true,false,this.currentLevel);
              }
              else {
                this.saveGame();
                this.levelLoader();
              }
            }
            else{
                  $.ajax({
                    method:"GET",
                    url:"/saveList",
                    success:function(saves){
                      newPause.unPause();
                      newPlayer = new castlePlayer();
                      game.state.start('MainMenu',true,false, saves);
                    }
                  });
            }
        }
        else{
          //MOVEMENT
          if (player.body.touching.down) {
              PLAYER_SPEED = 50;
          }

          if (castleControl.leftCtrl()) {
              this.moveLeft();
          }
          else if (castleControl.rightCtrl()) {
              this.moveRight();
          }
          else {
              player.animations.stop();
              if (player.frame < 4) {
                  player.frame = 0;
              }
              else {
                  player.frame = 5;
              }
          }
        }
          if (castleControl.jumpCtrl()) {
              this.jump();
          }
          if (castleControl.volumeDown()){
            game.sound.volume -= 0.2;
          }
          if (castleControl.volumeUp()){
            game.sound.volume += 0.2;
          }
          if (castleControl.muteMusic()){
            backgroundMusic.volume = 0;
          }
          if (castleControl.unMuteMusic()){
            backgroundMusic.volume = game.sound.volume;
          }



          if(this.immunity){
            player.body.sprite.tint = 0xff0000;
            if(!player.body.sprite.visible){
              player.body.sprite.visible = true;
            }
            else{
              player.body.sprite.visible = false;
            }
          }

          _.each(castleStage.enemies, function(enemy){
            NinjaGame.game.physics.ninja.overlap(player, enemy.enemy, this.fightEnemy,
                null, newPlayer);
          }, newPlayer);
          NinjaGame.game.physics.ninja.overlap(player, castleStage.spikes, this.damagePlayer,
              null, this);



    },
    saveGame:function(){
      var that = this;
      var mylevel;
      var myscore;
      var playerSave;
      mylevel = this.currentLevel;
      myscore = this.gold;
      $.ajax({
        method:"POST",
        url:"/saveGame",
        data:{level:mylevel,score:myscore},
        success:function(){

        },
        error:function(){

        }
      });
    },

    moveLeft: function() {
        //This keeps the player from moving to the left of the camera frame.
        //You can't go back, you can only go foward.
        var gap = player.body.x - NinjaGame.game.camera.x;
        if (gap > 0) {
            //  Move to the left
            if (gap < PLAYER_SPEED) {
                player.body.moveLeft(gap);

            }
            else {
                player.body.moveLeft(PLAYER_SPEED);

            }
            player.animations.play('left');


        }
    },

    moveRight: function() {
        //  Move to the right
        player.body.moveRight(PLAYER_SPEED);
        player.animations.play('right');

    },

    jump: function() {
      if(player.body.touching.down){
        PLAYER_SPEED = 10;
        player.body.moveUp(450);
        jumpSound.play();
      }

    },
    damagePlayer: function(){
      if (!this.immunity){
        this.health--;
      //  playerHurtSound.play();
        if(this.health<=0){
          this.killPlayer();
        }else{
          this.immunity=true;
          NinjaGame.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.loseImmunity, this);
        }
      }
    },

    loseImmunity: function(){
      player.body.sprite.visible = true;
      player.body.sprite.tint = 16777215;
      this.immunity=false;
    },
    enableBeAttacked: function(){
      player.canBeAttacked=true;
    },
    enableAttack: function(){
      player.canAttack=true;
    },
    fightEnemy: function(player, enemy) {
        if (newWeapon.weaponExists() && player.canAttack) {
          player.canAttack=false;
          player.fightTimer.loop(500, this.enableAttack, this);
          player.fightTimer.start();
          if(castleControl.weaponType===0){
            player.canBeAttacked=false;
            player.beAttackedTimer.loop(500, this.enableBeAttacked, this);
            player.beAttackedTimer.start();
            newEnemy.damageEnemy(enemy);
          }
        }
        else if(player.canBeAttacked){
            this.damagePlayer();
        }
    },
    killPlayer: function(){
      this.health = 6;
      this.gold = this.previousGold;
      $(".messages").html("");
      this.levelLoader();
      playerHurtSound.mute = true;
      playerDeathSound.play();
      backgroundMusic.stop();
    },
    levelLoader: function(){
      var leveldata;
      if(castleStage.levelName !="tutorial"){
        leveldata = this.currentLevel;
      }else{
        leveldata = castleStage.levelName;
      }

      NinjaGame.game.state.start('Game',true,false,leveldata);
      backgroundMusic.stop();
    },
    health: 6,
    gold: 0,
    weapon: 1,
    potion: 1,
    currentLevel:1,
    previousGold:0,
    facingLeft: function(){
      if(player.frame<4){
        return true;
      }
      else{
        return false;
      }
    }


};
