var PLAYER_SPEED = 50;
var castlePlayer = function(){};

castlePlayer.prototype = {
    preload: function() {
        game.load.spritesheet('ninja',
            'app/assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
    },

    create: function() {
        player = game.add.sprite(32, 0, 'ninja');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        player.scale.setTo(0.8, 0.7);
        game.physics.ninja.enableAABB(player);
        player.scale.setTo(1, 1);
        player.body.bounce = 0;
        player.body.friction = 0.14;
        player.anchor.setTo(0.5, 0.65);
        player.body.collideWorldBounds = true;
        player.frame=5;
        this.health=6;
        this.immunity=false;
        this.getStats();
        this.updateStatsDash();
    },

    update: function() {
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

        if (castleControl.jumpCtrl()) {
            this.jump();
        }

        //world kill if falls
        if (player.body.y > WORLD_DEATH) {
            this.killPlayer();
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



        game.physics.ninja.overlap(player, castleStage.enemies, this.fightEnemy,
            null, this);
        game.physics.ninja.overlap(player, castleStage.spikes, this.damagePlayer,
            null, this);

    },

    moveLeft: function() {
        //This keeps the player from moving to the left of the camera frame.
        //You can't go back, you can only go foward.
        var gap = player.body.x - game.camera.x;
        // console.log("gap: ",gap);
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
        }
        this.immunity=true;
        game.time.events.add(Phaser.Timer.SECOND * 1.5, this.loseImmunity, this);
      }
    },
    loseImmunity: function(){
      player.body.sprite.visible = true;
      player.body.sprite.tint = 16777215;
      this.immunity=false;
    },
    fightEnemy: function() {
        if (newSword.swordExists()) {
            enemy.kill();
        }
        else {
            this.damagePlayer();
        }
    },
    killPlayer: function(){
      player.kill();
      login.gameOver();
    },
    health: 6,
    gold: 100,
    weapon: 1,
    potion: 1,
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
    }


};
