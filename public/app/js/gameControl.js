NinjaGame = NinjaGame || {};
var game = NinjaGame.game;

var castleControl = {



  create: function(){
    cursors = game.input.keyboard.createCursorKeys();
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyJ = game.input.keyboard.addKey(Phaser.Keyboard.J);
    keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);
    keyN = game.input.keyboard.addKey(Phaser.Keyboard.N);
    keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
    keyB = game.input.keyboard.addKey(Phaser.Keyboard.B);
    keyV = game.input.keyboard.addKey(Phaser.Keyboard.V);

    keyJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    jumpButton = game.add.button(game.camera.width - 100, game.camera.height-100, 'jumpBtn');
    jumpButton.fixedToCamera=true;
    jumpButton.onInputDown.add(this.buttonJump, this);
    jumpButton.onInputUp.add(this.releaseButtonJump, this);

    attackButton = game.add.button(game.camera.width - 125, game.camera.height-75, 'attackBtn');
    attackButton.fixedToCamera=true;
    attackButton.onInputDown.add(this.buttonAttack, this);
    attackButton.onInputUp.add(this.releaseButtonAttack, this);

    leftButton = game.add.button(99, game.camera.height-75, 'leftBtn');
    leftButton.fixedToCamera=true;
    leftButton.onInputDown.add(this.buttonLeft, this);
    leftButton.onInputUp.add(this.releaseButtonLeft, this);

    rightButton = game.add.button(133, game.camera.height-75, 'rightBtn');
    rightButton.fixedToCamera=true;
    rightButton.onInputDown.add(this.buttonRight, this);
    rightButton.onInputUp.add(this.releaseButtonRight, this);

    upButton = game.add.button(116, game.camera.height-93, 'upBtn');
    upButton.fixedToCamera=true;
    upButton.onInputDown.add(this.buttonUp, this);
    upButton.onInputUp.add(this.releaseButtonUp, this);

    downButton = game.add.button(116, game.camera.height-58, 'downBtn');
    downButton.fixedToCamera=true;
    downButton.onInputDown.add(this.buttonDown, this);
    downButton.onInputUp.add(this.releaseButtonDown, this);

    weaponLeftButton = game.add.button(110, game.camera.height-115, 'leftBtn');
    weaponLeftButton.fixedToCamera=true;
    weaponLeftButton.onInputDown.add(this.weaponLeft, this);
    weaponLeftButton.scale.setTo(.5,.5);
    weaponLeftButton.onInputUp.add(this.releaseWeaponLeft, this);

    weaponRightButton = game.add.button(138, game.camera.height-115, 'rightBtn');
    weaponRightButton.fixedToCamera=true;
    weaponRightButton.onInputDown.add(this.weaponRight, this);
    weaponRightButton.scale.setTo(.5,.5);
    weaponRightButton.onInputUp.add(this.releaseWeaponRight, this);


  },
  update: function(){
    // this.attack=false;
    // this.jump=false;
    // this.up=false;
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
    if(keyJ.isDown || cursors.up.isDown || keyJump.isDown || this.jump){
      return true;
    }
  },
  weaponType: 0,
  buttonAttack: function(){
    attackButton.frame=1;
    this.attack=true;
  },
  buttonJump: function(){
    jumpButton.frame=1;
    this.jump=true;
  },
  buttonLeft: function(){
    leftButton.frame=1;
    this.left=true;
  },
  buttonRight: function(){
    rightButton.frame=1;
    this.right=true;
  },
  buttonUp: function(){
    upButton.frame=1;
    this.up=true;
    this.changeWeaponType();
  },
  buttonDown: function(){
    downButton.frame=1;
    this.down=true;
  },
  releaseButtonJump: function(){
    jumpButton.frame=0;
    this.jump=false;
  },
  releaseButtonAttack: function(){
    attackButton.frame=0;
    this.attack=false;
  },
  releaseButtonLeft: function(){
    leftButton.frame=0;
    this.left=false;
  },
  releaseButtonRight: function(){
    rightButton.frame=0;
    this.right=false;
  },
  releaseButtonUp: function(){
    upButton.frame=0;
    this.up=false;
  },
  releaseButtonDown: function(){
    downButton.frame=0;
    this.down=false;
  },
  changeWeaponType: function(){
    if(this.weaponType===0){
      this.weaponType=1;
    }else{
      this.weaponType=0;
    }
  },
  weaponLeft: function(){
    weaponLeftButton.frame=1;
  },
  weaponRight: function(){
    weaponRightButton.frame=1;
  },
  releaseWeaponLeft:function(){
    weaponLeftButton.frame=0;
  },
  releaseWeaponRight: function () {
    weaponRightButton.frame=0;
  },
  volumeDown: function(){
    if (keyN.justDown){
      while (game.sound.volume > 0){
        return true;
      }
    }
  },
  volumeUp: function(){
    if (keyM.justDown){
      while (game.sound.volume < 1){
        return true;
      }
    }
  },
  muteMusic: function(){
    if (keyB.justDown){
      if (backgroundMusic.volume > 0){
        return true;
      }
    }
  },
unMuteMusic: function(){
  if (keyV.justDown){
      return true;
  }
}



};
