var game = NinjaGame.game;

var castleHUD = function () {};

castleHUD.prototype = {


  create: function(){
    this.headsUpDisplay = game.add.group();
    var coin = game.add.sprite(game.width/2-32,12,'coin');
    coin.scale.setTo(.5,.5);
    this.headsUpDisplay.add(coin);
    this.headsUpDisplay.fixedToCamera=true;
    this.displayHealth();
    this.displayWeapon();
    this.displayGold();
  },
  update: function(){
    this.displayHealth();
    this.displayWeapon();
    this.displayGold();
  },
  displayHealth: function(){
    _.each(this.hearts, function(heart){
      heart.destroy();
    });
    var sprite1='fullheart';
    var sprite2='fullheart';
    var sprite3='fullheart';

    if(newPlayer.health===0){
      sprite1='emptyheart';
    }
    else if(newPlayer.health===1){
      sprite1='halfheart';
    }

    if(newPlayer.health<3){
      sprite2='emptyheart';
    }
    else if(newPlayer.health===3){
      sprite2='halfheart';
    }
    
    if(newPlayer.health<5){
      sprite3='emptyheart';
    }
    else if(newPlayer.health===5){
      sprite3='halfheart';
    }
    this.hearts[0]=game.add.sprite(game.width/2-16,0,sprite1);
    this.hearts[1]=game.add.sprite(game.width/2+16,0,sprite2);
    this.hearts[2]=game.add.sprite(game.width/2+48,0,sprite3);
    var that = this;
    _.each(this.hearts, function(heart){
      heart.scale.setTo(2,2);
      that.headsUpDisplay.add(heart);
    });
  },
  displayWeapon: function () {
    if(this.weapon.visible){
      this.weapon.destroy();
    }
    if(castleControl.weaponType===0){
      this.weapon = game.add.sprite(game.width/2-80,0,'sword');
    }
    else{
      this.weapon = game.add.sprite(game.width/2-80,0,'firepot');
    }
    this.weapon.scale.setTo(2,2);
    this.headsUpDisplay.add(this.weapon);
  },
  displayGold: function(){
    if(this.scoreText.visible){
      this.scoreText.destroy();
    }
    this.score = newPlayer.gold;
    var style = {font:'20px Arial', fill:"#fff", align:"center"};
    this.scoreText = game.add.text(game.width/2-29,32,this.score,style);
    this.headsUpDisplay.add(this.scoreText);
  },
  weapon:{},
  score:0,
  hearts:[],
  scoreText: "",
  headsUpDisplay: {}
};
