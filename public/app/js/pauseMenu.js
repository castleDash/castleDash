var game = NinjaGame.game;
var volume=0;
var castlePause = function() {};

castlePause.prototype = {

    create: function() {
        $("#resume").click(this.unPause);
        $("#exit").click(this.exitLevel);
        $("#restart").click(this.restartLevel);
        $("#volUp").click(this.volUp);
        $("#volDn").click(this.volDown);
        $("#musicOff").click( this.musicOff);
        $("#musicOn").click(this.musicOn);
        $("#logout").click( this.logout);

        game.onPause.add(this.getVolume);
        game.onResume.add(this.setVolume);
    },
    update: function() {
        if(castleControl.pauseCtrl()){
          newPause.pause();
          newPause.displayVolume();
        }
        if(!newPlayer.muted){
          $("#musicOn").css('display','none');
          $("#musicOff").css('display','block');
        }
        else{
          $("#musicOn").css('display','block');
          $("#musicOff").css('display','none');
        }
    },
    pause: function(){
      game.paused = true;
      $("#pauseMenu").css('display','block');
      newPause.displayVolume();
      castleControl.pause=false;
    },
    unPause: function() {
      game.paused = false;
      $("#pauseMenu").css('display','none');
      castleControl.pause=false;
    },
    exitLevel: function(){
      if(castleStage.levelName !="tutorial"){
        $.ajax({
          method:"POST",
          url:"/exitSave",
          success:function(){
            $.ajax({
              method:"GET",
              url:"/saveList",
              success:function(saves){
                newPause.unPause();
                var muted = newPlayer.muted;
                newPlayer = new castlePlayer();
                newPlayer.muted = muted;
                backgroundMusic.volume=0;
                game.state.start('MainMenu',true,false, saves);
              }
            });
          }
        });
      }else{
        $.ajax({
          method:"GET",
          url:"/saveList",
          success:function(saves){
            newPause.unPause();
            var muted = newPlayer.muted;
            newPlayer = new castlePlayer();
            newPlayer.muted = muted;
            backgroundMusic.volume=0;
            game.state.start('MainMenu',true,false, saves);
          }
        });
      }
    },
    restartLevel: function(){
      newPause.unPause();
      newPlayer.health = 6;
      newPlayer.gold = newPlayer.previousGold;
      $(".messages").html("");
      newPlayer.levelLoader();
    },
    volUp: function(){
      volume +=0.2;
      if (volume>1){
        volume=1;
      }
      newPause.displayVolume();
    },
    volDown: function(){
      volume -=0.2;
      if(volume<0){
        volume=0;
      }
      newPause.displayVolume();
    },
    musicOff: function(){
      castleControl.mute=true;
      $("#musicOff").css('display','none');
      $("#musicOn").css('display','block');
    },
    musicOn: function(){
      castleControl.unMute=true;
      $("#musicOn").css('display','none');
      $("#musicOff").css('display','block');
    },
    logout: function(){
      newPause.unPause();
      login.submitLogout();
    },
    setVolume: function () {
      game.sound.volume=volume;
    },
    getVolume: function(){
      volume=game.sound.volume;
    },
    displayVolume: function(){
      $(".volBlock").css("background-color","gray");
      if (volume>=.2) {
        $("#vol1").css("background-color","green");
      }
      if (volume>=.4) {
        $("#vol2").css("background-color","green");
      }
      if (volume>=.6) {
        $("#vol3").css("background-color","green");
      }
      if (volume>=.8) {
        $("#vol4").css("background-color","green");
      }
      if (volume>=1) {
        $("#vol5").css("background-color","green");
      }
    }

};
