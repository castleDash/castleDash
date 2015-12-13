var PLAYER_SPEED = 50;
var castlePlayer= {


  preload: function(){
    game.load.spritesheet('ninja',
        'app/assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
  },

  create: function(){
    player = game.add.sprite(32, 0, 'ninja');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.scale.setTo(0.8,0.7);
    game.physics.ninja.enableAABB(player);
    player.scale.setTo(1,1);
    player.body.bounce = 0;
    player.body.friction = 0.14;
    player.anchor.setTo(0.5,0.65);
    player.body.collideWorldBounds = true;
  },

  update: function(){
    if(player.body.touching.down){
      this.jumpCount=0;
    }


  },

  moveLeft: function(){
    //This keeps the player from moving to the left of the camera frame.
    //You can't go back, you can only go foward.
    var gap = player.body.x - game.camera.x;
    // console.log("gap: ",gap);
    if (gap > 0) {
        //  Move to the left
        if (gap < PLAYER_SPEED) {
            player.body.moveLeft(gap);

        } else {
          player.body.moveLeft(PLAYER_SPEED);
        }
        player.animations.play('left');
    }
  },

  moveRight: function(){
    //  Move to the right
    player.body.moveRight(PLAYER_SPEED);
    player.animations.play('right');

  },

  jump: function(){

      PLAYER_SPEED = 10;
      player.body.moveUp(450);

  },





};
