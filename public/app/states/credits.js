var NinjaGame = NinjaGame || {};
NinjaGame.CreditState = function(){};



NinjaGame.CreditState.prototype = {

  preload:function(){

  },

  create: function(){

    player = NinjaGame.game.add.sprite(this.game.width/5, this.game.height/2 -100, 'ninja');
    player.scale.setTo(3,3);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.animations.add('stopped',[4],10,true);
    this.game.stage.backgroundColor = '#222222';
    var that = this;
    var style = {font:'25px Arial', fill:"#fff", align:"center"};
    var Devs = "DEVELOPERS\n Sally Kingston \nHolden Hughes \nDoug Scott \nBrandon Jones";
    var Creators = "FROM THE MINDS OF\n Henry Kingston\n Graham Kingston";
    var Testers = "QA TEAM\n Graham \n Henry \n Ayden \n Ellie";
    var GameArt = "ART SOURCES\n piskelapp.com\n opengameart.org";
    var Audio ="GAME SFX \n Graham \n Henry";
    var Instructors ="INFORMANTS\n Calvin Webster \n Nathan Hall \n Zach Oakes\n Matt McFarland\n Pablo Farias Navarro";
    var SpecThanks ="SPECIAL THANKS TO\n Betsy Hare \n Dave Hinkle \n David Martinez\n Jared Harrison";
    var SpecThanks2 ="AND\n Dark Chocolate \n Wine \n Beer \n Coffee \n Cookies";
    var myText = Devs;
    var restart = "MAIN MENU";

    var credArr = [Devs,Creators,Testers,GameArt,Audio,Instructors,SpecThanks,SpecThanks2];

    var counter = 0;

    var t = NinjaGame.game.add.text(this.game.width/2, this.game.height/2,myText,style);
    t.anchor.set(0.5,0.5);
    var changeText = function(){
      console.log("made it here");
      if(counter < credArr.length){
        console.log("Should be changing text",credArr[counter]);
        t.text = credArr[counter];
        NinjaGame.game.time.events.add(1000,function(){
          counter++;
          changeText();
        });
      }
      else{
        that.playerRunning = false;
        t.text = "The End\n thanks for playing";
        var u = NinjaGame.game.add.text(this.game.width/2, this.game.height -50, restart, style);
        u.anchor.set(0.5,0.5);
        u.inputEnabled = true;
        u.events.onInputUp.add(function(){$.ajax({
                  method:"GET",
                  url:"/saveList",
                  success:function(saves){
                    newPlayer = new castlePlayer();
                    that.playerRunning = true;
                    NinjaGame.game.state.start('MainMenu',true,false, saves);
                  }
                });
              });
      }
    };
    changeText();
  },
  playerRunning: true,

  update:function(){
    if(this.playerRunning){
      player.animations.play('right');
    }
    else{
      player.animations.play('stopped');
    }
  }

};
