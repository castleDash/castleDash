var ENEMY_SPEED = 15;

var castleEnemy = function () {};

castleEnemy.prototype = {


  create: function(x,y,strength,wealth){
    this.enemy = game.add.sprite(x, y, 'orc');
    this.enemy.animations.add('orcleft', [10,11,12,13,14,15,16,17], 15, true);
    this.enemy.animations.add('orcright', [28,29,30,31,32,33,34,35], 15, true);
    this.enemy.scale.setTo(0.5,0.7);
    game.physics.ninja.enableAABB(this.enemy);
    this.enemy.scale.setTo(1,1);
    this.enemy.anchor.setTo(0.5,0.6);
    this.enemy.body.collideWorldBounds = true;
    this.enemy.strength = strength;
    this.enemy.wealth = wealth;
    this.enemy.immunity = false;
  },

  update: function(){
    // this.enemy.body.collision()
    if(player.alive){
      var distX = this.enemy.body.x - player.body.x;
      var distY = this.enemy.body.y - player.body.y;
      if(distX < 250 && distX > 5 && distY <64) {
        this.moveLeft();
      }
      else if(distX < -5 && distX > -250 && distY < 64){
        this.moveRight();
      }
      else{
        this.standStill();
      }

    }
    if(this.enemy.immunity){
      this.enemy.body.sprite.tint = 0xff0000;
      if(!this.enemy.body.sprite.visible){
        this.enemy.body.sprite.visible = true;
      }
      else{
        this.enemy.body.sprite.visible = false;
      }
    }
  },
  damageEnemy: function(enemy){
      enemy.strength--;
      if(castleControl.weaponType==0){
        if (newPlayer.facingLeft()){
          enemy.body.x=enemy.body.x-32;
        }
        else{
          enemy.body.x=enemy.body.x+32;
        }
      }
      if(enemy.strength<=0){
        enemy.kill();
        newPlayer.gold = parseInt(newPlayer.gold)+enemy.wealth;
        newPlayer.updateStatsDash();
      }
  },
  moveRight:function(){
    this.enemy.body.moveRight(ENEMY_SPEED);
    this.enemy.animations.play('orcright');
  },

  moveLeft: function(){
    this.enemy.body.moveLeft(ENEMY_SPEED);
    this.enemy.animations.play('orcleft');
  },

  standStill: function(){
    this.enemy.animations.stop();
    this.enemy.frame = 18;
  }
};
