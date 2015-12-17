
var castleControl = {
  preload: function () {
    game.load.spritesheet('jumpBtn', 'app/assets/sprites/Jump_btn.png',32,32,2);
    game.load.spritesheet('attackBtn', 'app/assets/sprites/Attack_btn.png',32,32,2);
    // game.load.atlas('dPad', 'assets/controllers/d-pad.png', 'assets/controllers/d-pad.json');

  },

  create: function(){
    cursors = game.input.keyboard.createCursorKeys();
    // key1 = game.input.keyboard.addKey(Phaser.Keyboard.1);
    // key2 = game.input.keyboard.addKey(Phaser.Keyboard.2);
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);
    keyJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpButton = game.add.button(game.camera.width - 100, game.camera.height-100, 'jumpBtn', this.buttonJump, this, 0, 0, 1, 0);
    jumpButton.fixedToCamera=true;
    attackButton = game.add.button(game.camera.width - 125, game.camera.height-75, 'attackBtn', this.buttonAttack, this, 0, 0, 1, 0);
    attackButton.fixedToCamera=true;


  },
  update: function(){
    this.attack=false;
    this.jump=false;
  },
  attack: false,
  jump: false,
  left: false,
  right: false,
  up: false,
  down: false,
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
    if(keyK.isDown || this.attack){
      return true;
    }
  },

  jumpCtrl: function(){
    if(keyW.isDown || cursors.up.isDown || keyJump.isDown || this.jump){
      return true;
    }
  },
  meleeCtrl: function () {
    if(key1.isDown){
      return true;
    }
  },
  rangeCtrl: function () {
    if(key2.isDown){
      return true;
    }
  },
  buttonAttack: function(){
    this.attack=true;
  },
  buttonJump: function(){
    this.jump=true;
  },
  buttonLeft: function(){
    this.left=true;
  },
  buttonRight: function(){
    this.right=true;
  },
  buttonUp: function(){
    this.up=true;
  },
  buttonDown: function(){
    this.down=true;
  }





};
