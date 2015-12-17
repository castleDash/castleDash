
var castleControl = {
  preload: function () {
    game.load.spritesheet('jumpBtn', 'app/assets/sprites/Jump_btn.png',32,32,2);
    game.load.spritesheet('attackBtn', 'app/assets/sprites/Attack_btn.png',32,32,2);
    game.load.spritesheet('leftBtn', 'app/assets/sprites/left.png',32,32,2);
    game.load.spritesheet('rightBtn', 'app/assets/sprites/right.png',32,32,2);
    game.load.spritesheet('upBtn', 'app/assets/sprites/up.png',32,32,2);


  },

  create: function(){
    cursors = game.input.keyboard.createCursorKeys();
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
    leftButton = game.add.button(100, game.camera.height-75, 'leftBtn');
    leftButton.fixedToCamera=true;
    leftButton.inputEnabled=true;
    leftButton.onInputDown.add(this.buttonLeft, this);
    leftButton.onInputUp.add(this.releaseButtonLeft, this);
    rightButton = game.add.button(132, game.camera.height-75, 'rightBtn');
    rightButton.fixedToCamera=true;
    rightButton.onInputDown.add(this.buttonRight, this);
    rightButton.onInputUp.add(this.releaseButtonRight, this);

    upButton = game.add.button(116, game.camera.height-93, 'upBtn', this.buttonUp, this, 0, 0, 1, 0);
    upButton.fixedToCamera=true;

  },
  update: function(){
    this.attack=false;
    this.jump=false;
    this.up=false;
  },
  attack: false,
  jump: false,
  left: false,
  right: false,
  up: false,
  leftCtrl: function(){
     if(keyA.isDown || cursors.left.isDown || this.left){
       return true;
     }
  },

  rightCtrl: function(){
    if(keyD.isDown || cursors.right.isDown || this.right){
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
  },
  releaseButtonLeft: function(){
    this.left=false;
  },
  releaseButtonRight: function(){
    this.right=false;
  }





};
