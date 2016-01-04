var game = NinjaGame.game;
var volume=0;
var castlePause =  {

    create: function() {

        $("#resume").on("click", castlePause.unPause);
        $("#exit").on("click",castlePause.exitLevel);
        $("#restart").on("click",castlePause.restartLevel);
        $("#volUp").on("click", castlePause.volUp);
        $("#volDn").on("click", castlePause.volDown);
        $("#musicOff").on("click", castlePause.musicOff);
        $("#musicOn").on("click",castlePause.musicOn);
        $("#logout").on("click", castlePause.logout);
        $("#fullscreen").on("click",castlePause.fullscreen);


        game.onPause.add(castlePause.getVolume);
        game.onResume.add(castlePause.setVolume);
    },
    fullscreen:function() {
      castlePause.unPause();
      if (!game.scale.isFullScreen)
      {
          game.scale.startFullScreen(false);
      }

  },
    update: function() {
        if(castleControl.pauseCtrl()){
          castlePause.pause();
          castlePause.displayVolume();
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
      if(game.scale.isFullScreen){
        game.scale.stopFullScreen();
      }
      game.paused = true;
      $("#pauseMenu").css('display','block');
      castlePause.displayVolume();
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
                castlePause.unPause();
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
            castlePause.unPause();
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
      castlePause.unPause();
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
      castlePause.displayVolume();
    },
    volDown: function(){
      volume -=0.2;
      if(volume<0){
        volume=0;
      }
      castlePause.displayVolume();
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
      castlePause.unPause();
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
