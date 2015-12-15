var ENEMY_SPEED = 15;

var castleEnemy = function(){};

  preload: function(){
    game.load.spritesheet('orc',
        'app/assets/sprites/orc_piratess.png', 64, 64, 36);
  },

  create: function(){
    enemy = game.add.sprite(1400, 0, 'orc');
    enemy.animations.add('orcleft', [10,11,12,13,14,15,16,17], 15, true);
    enemy.animations.add('orcright', [28,29,30,31,32,33,34,35], 15, true);
    enemy.scale.setTo(0.5,0.7);
    game.physics.ninja.enableAABB(enemy);
    enemy.scale.setTo(1,1);
    enemy.anchor.setTo(0.5,0.6);
    enemy.body.collideWorldBounds = true;
  },

  update: function(){
    var dist = enemy.body.x - player.body.x;
    if(dist < 250 && dist > 5) {
      castleEnemy.moveLeft();
    }
    else if(dist < -5 && dist > -250){
      castleEnemy.moveRight();
    }
    else{
      castleEnemy.standStill();
    }
  },

  moveRight:function(){
    enemy.body.moveRight(ENEMY_SPEED);
    enemy.animations.play('orcright');
  },

  moveLeft: function(){
    enemy.body.moveLeft(ENEMY_SPEED);
    enemy.animations.play('orcleft');
  },

  standStill: function(){
    enemy.animations.stop();
    enemy.frame = 18;
  },

  detectPlayer: function(){},

  createNewEnemy: function(x,y){
    enemy = game.add.sprite(x, y, 'orc');
    enemy.animations.add('orcleft', [10,11,12,13,14,15,16,17], 15, true);
    enemy.animations.add('orcright', [28,29,30,31,32,33,34,35], 15, true);
    enemy.scale.setTo(0.5,0.7);
    game.physics.ninja.enableAABB(enemy);
    enemy.scale.setTo(1,1);
    enemy.anchor.setTo(0.5,0.6);
    enemy.body.collideWorldBounds = true;
    return enemy;
  }
