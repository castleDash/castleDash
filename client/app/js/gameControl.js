
var castleControl = {


  create: function(){
    cursors = game.input.keyboard.createCursorKeys();
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);
    keyJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  leftCtrl: function(){
     if(keyA.isDown || cursors.left.isDown){
       return true;
     }
  },

  rightCtrl: function(){
    if(keyD.isDown || cursors.right.isDown){
      return true;
    }
  },

  attackCtrl: function(){
    if(keyK.isDown){
      return true;
    }
  },

  jumpCtrl: function(){
    if(keyW.isDown || cursors.up.isDown || keyJump.isDown){
      if(player.body.touching.down){
        return true;
      }
    }
  }





};
