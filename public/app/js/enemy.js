var ENEMY_SPEED = 15;

var castleEnemy = function (x,y) {
  Phaser.Sprite.call(this, game, x, y, 'orc');
};

castleEnemy.prototype = Object.create(Phaser.Sprite.prototype);
castleEnemy.prototype.constructor = castleEnemy;



castleEnemy.prototype.create= function(){
    this.animations.add('orcleft', [10,11,12,13,14,15,16,17], 15, true);
    this.animations.add('orcright', [28,29,30,31,32,33,34,35], 15, true);
    this.scale.setTo(0.5,0.7);
    game.physics.ninja.enableAABB(this);
    this.scale.setTo(1,1);
    this.anchor.setTo(0.5,0.5);
    this.body.collideWorldBounds = true;
  };

  castleEnemy.prototype.update =  function(){
    var dist = this.body.x - player.body.x;
    if(dist < 250 && dist > 5) {
      this.moveLeft();
    }
    else if(dist < -5 && dist > -250){
      this.moveRight();
    }
    else{
      this.standStill();
    }
  };

  castleEnemy.prototype.moveRight = function(){
    this.body.moveRight(ENEMY_SPEED);
    this.animations.play('orcright');
  };

  castleEnemy.prototype.moveLeft = function(){
    this.body.moveLeft(ENEMY_SPEED);
    this.animations.play('orcleft');
  };

  castleEnemy.prototype.standStill =  function(){
    this.animations.stop();
    this.frame = 18;
  };
