var ENEMY_SPEED = 15;

var castleEnemy = {

  preload: function(){
    game.load.spritesheet('orc',
        'assets/sprites/orc_piratess.png', 64, 64, 36);

  },

  create: function(){
    enemy = game.add.sprite(1400,0,'orc');
    enemy.animations.add('orcleft', [10,11,12,13,14,15,16,17], 15, true);
    enemy.animations.add('orcright', [28,29,30,31,32,33,34,35], 15, true);
    enemy.scale.setTo(0.5,0.7);
    game.physics.ninja.enableAABB(enemy);
    enemy.scale.setTo(1,1);
    enemy.anchor.setTo(0.5,0.6);
    enemy.body.collideWorldBounds = true;
  },

  update: function(){
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



};
