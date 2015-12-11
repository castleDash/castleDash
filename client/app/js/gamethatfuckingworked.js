var castleDash = {
  init: function(){
    castleDash.styling();
  },
  styling: function(){
    game = new Phaser.Game(800, 240, Phaser.AUTO, 'game', { preload: castleDash.preload, create: castleDash.create, update: castleDash.update });

  },
  events: function(){

  },
  preload: function(){
    game.load.tilemap('map', 'assets/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/super_mario.png');
    game.load.spritesheet('ninja', 'assets/sprites/NinjaCoverGirl.png',32,48,9);
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.NINJA);

    map = game.add.tilemap('map');
    map.addTilesetImage('SuperMarioBros-World1-1','tiles');

    layer = map.createLayer('World1');

    layer.resizeWorld();

    player = game.add.sprite(32, 160, 'ninja');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);




    game.physics.ninja.enable(player);
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

    cursors = game.input.keyboard.createCursorKeys();
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);

    game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);


  },
  update: function(){
      if (keyA.isDown || cursors.left.isDown)
      {
        if(player.body.x+game.world.x>0){
          //  Move to the left
          player.body.moveLeft(300);
          player.animations.play('left');
        }
      }
      else if (keyD.isDown || cursors.right.isDown)
      {
        //  Move to the right
        player.body.moveRight(300);
        player.animations.play('right');
      }
      else if (keyK.isDown)
      {
        if(player.frame <4){
          castleDash.attackLeft();
        }
        else{
          castleDash.attackRight();
        }
      }
      else
      {
          player.animations.stop();
          // sword.visible = false;
          if(player.frame<4){
            player.frame=0;
          }
          else{
            player.frame=5;
          }
      }

      if (keyW.isDown || cursors.up.isDown)
      {
          player.body.moveUp(350);
      }
  },
  game: {},

};

$(document).ready(function () {
  castleDash.init();
});
