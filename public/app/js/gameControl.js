NinjaGame = NinjaGame || {};
var game = NinjaGame.game;

var castleControl = {



  create: function(muted){
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
    keyPause = game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    jumpButton = game.add.button(game.camera.width - 80, game.camera.height-90, 'jumpBtn');
    jumpButton.scale.setTo(1.5,1.5);
    jumpButton.fixedToCamera=true;
    jumpButton.onInputDown.add(this.buttonJump, this);
    jumpButton.onInputUp.add(this.releaseButtonJump, this);

    attackButton = game.add.button(game.camera.width - 135, game.camera.height-75, 'attackBtn');
    attackButton.scale.setTo(1.5,1.5);
    attackButton.fixedToCamera=true;
    attackButton.onInputDown.add(this.buttonAttack, this);
    attackButton.onInputUp.add(this.releaseButtonAttack, this);

    leftButton = game.add.button(75, game.camera.height-75, 'leftBtn');
    leftButton.scale.setTo(1.5,1.5);
    leftButton.fixedToCamera=true;
    leftButton.onInputDown.add(this.buttonLeft, this);
    leftButton.onInputUp.add(this.releaseButtonLeft, this);

    rightButton = game.add.button(153, game.camera.height-75, 'rightBtn');
    rightButton.scale.setTo(1.5,1.5);
    rightButton.fixedToCamera=true;
    rightButton.onInputDown.add(this.buttonRight, this);
    rightButton.onInputUp.add(this.releaseButtonRight, this);

    upButton = game.add.button(116, game.camera.height-115, 'upBtn');
    upButton.scale.setTo(1.5,1.5);
    upButton.fixedToCamera=true;
    upButton.onInputDown.add(this.buttonUp, this);
    upButton.onInputUp.add(this.releaseButtonUp, this);

    pauseButton = game.add.button(game.camera.width/2, game.camera.height-75, 'pauseBtn');
    pauseButton.fixedToCamera=true;
    pauseButton.onInputDown.add(this.buttonPause, this);
    pauseButton.onInputUp.add(this.releaseButtonPause, this);

    this.mute=muted;
    this.unMute=!muted;
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
  pauseCtrl: function(){
    if(keyPause.isDown || this.pause){
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
  buttonPause: function(){
    this.pause=true;
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
  releaseButtonPause: function(){
    pauseButton.frame=0;
    this.pause=false;
  },
  changeWeaponType: function(){
    if(this.weaponType===0){
      this.weaponType=1;
    }else{
      this.weaponType=0;
    }
  },
  mute: false,
  unMute: false,
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
    if (keyB.justDown || this.mute){
      newPlayer.muted=true;
      this.mute=false;
      return true;
    }
  },
  unMuteMusic: function(){
    if (keyV.justDown||this.unMute){
      newPlayer.muted=false;
      this.unMute=false;
      return true;
    }
}



};
