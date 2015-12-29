var game = NinjaGame.game;
var volume=0;
var castlePause = function() {};

castlePause.prototype = {

    create: function() {
        $("#resume").on("click", this.unPause);
        $("#exit").on("click",this.exitLevel);
        $("#restart").on("click",this.restartLevel);
        $("#volUp").on("click", this.volUp);
        $("#volDn").on("click", this.volDown);
        $("#musicOff").on("click", this.musicOff);
        $("#musicOn").on("click",this.musicOn);
        $("#logout").on("click", this.logout);

        game.onPause.add(this.getVolume);
        game.onResume.add(this.setVolume);
    },
    update: function() {
        if (castleControl.pauseCtrl()) {
            newPause.pause();
        }
    },
    pause: function(){
      game.paused = true;
      $("#pauseMenu").css('display','block');
      castleControl.pause=false;
    },
    unPause: function() {
      game.paused = false;
      $("#pauseMenu").css('display','none');
      castleControl.pause=false;
    },
    exitLevel: function(){
      $.ajax({
        method:"POST",
        url:"/exitSave",
        success:function(){
          $.ajax({
            method:"GET",
            url:"/saveList",
            success:function(saves){
              newPause.unPause();
              console.log("exiting");
              newPlayer = new castlePlayer();
              game.state.start('MainMenu',true,false, saves);
            }
          });
        }
      });
    },
    restartLevel: function(){
      newPause.unPause();
      console.log("restarting");
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
    },
    volDown: function(){
      volume -=0.2;
      if(volume<0){
        volume=0;
      }
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
      console.log("setting volume",volume);
      game.sound.volume=volume;
    },
    getVolume: function(){
      console.log("getting volume",game.sound.volume);
      volume=game.sound.volume;
    }

};
