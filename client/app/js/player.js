var castlePlayer= {


  preload: function(){
    game.load.spritesheet('ninja',
        'assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
  },

  create: function(){
    player = game.add.sprite(32, 160, 'ninja');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.scale.setTo(0.8,1);
    game.physics.ninja.enableAABB(player);
    player.scale.setTo(1,1);
    player.body.collideWorldBounds = true;
  },

  update: function(){


  },

  moveLeft: function(){
    //This keeps the player from moving to the left of the camera frame.
    //You can't go back, you can only go foward.
    var gap = player.body.x - game.camera.x;
    if (gap > 0) {
        //  Move to the left
        if (gap < 348) {
            player.body.moveLeft(gap - 48);

        } else {
            player.body.moveLeft(300);
        }
        player.animations.play('left');
    }
  },

  moveRight: function(){
    //  Move to the right
    player.body.moveRight(300);
    player.animations.play('right');
  },

  jump: function(){
    player.body.moveUp(350);
  }



};
