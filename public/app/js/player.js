var PLAYER_SPEED = 50;
var castlePlayer = function(){};

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
        //player.checkWorldBounds = true;
        //player.outOfBoundsKill = true;
        player.frame=5;
        player.health=6;
        player.immunity=false;
        this.getStats();
        this.updateStatsDash();
        player.fightTimer= NinjaGame.game.time.create(false);
        player.beAttackedTimer= NinjaGame.game.time.create(false);
        player.canAttack= true;
        player.canBeAttacked=true;

    },

    update: function() {
        if (player.body.x>=castleStage.endTile[0].x && player.body.y>=castleStage.endTile[0].y && player.body.y<=(castleStage.endTile[0].y+32)){
          this.currentLevel = this.currentLevel +1;
          this.saveGame();
          this.levelLoader();

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
      var mylevel;
      var myscore;
      var playerSave;
      mylevel = this.currentLevel;
      myscore = this.gold;


      console.log("level: " +mylevel+" score: "+myscore);

      $.ajax({
        method:"POST",
        url:"/saveGame",
        data:{level:mylevel,score:myscore},
        success:function(){
          console.log(success);
          this.levelLoader();
        },
        error:function(){
          console.log("error");
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
      }

    },
    damagePlayer: function(){
      if (!this.immunity){
        this.health--;
        this.saveStats();
        this.updateStatsDash();
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
          player.canBeAttacked=false;
          player.fightTimer.loop(500, this.enableAttack, this);
          player.fightTimer.start();
          player.beAttackedTimer.loop(500, this.enableBeAttacked, this);
          player.beAttackedTimer.start();
          newEnemy.damageEnemy(enemy);
        }
        else if(player.canBeAttacked){
            this.damagePlayer();
        }
    },
    killPlayer: function(){
      var that = this;
      this.health = 6;
      this.loseImmunity();
      this.levelLoader();

    },
    levelLoader: function(){
      var leveldata = this.currentLevel;
      this.loseImmunity();
      NinjaGame.game.state.start('Game',true,false,leveldata);
    },
    health: 6,
    gold: 0,
    weapon: 1,
    potion: 1,
    currentLevel:1,
    getStats: function(){
      //ajaxy stuff
      //this.health = stuff;
    },
    saveStats: function(){
      //ajaxy stuff
      //data.health = this.health
    },
    updateStatsDash: function(){
      //this is where the ajax call will go

      dashplayer = {health:this.health, gold:this.gold, weapon:this.weapon, potion:this.potion};

      var dashTmpl = _.template(dashTemplate);
      var healthHTML = getHearts(dashplayer.health);
      $(".messages").html(dashTmpl(dashplayer)+healthHTML);
    },
    facingLeft: function(){
      if(player.frame<4){
        return true;
      }
      else{
        return false;
      }
    }


};
