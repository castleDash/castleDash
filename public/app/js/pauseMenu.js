var game = NinjaGame.game;

var castlePause = function() {};

castlePause.prototype = {

    create: function() {
        volUp = $("#volUp");
        volDown = $("#volDown");
        musicOff = $("#musicOff");

        $("#resume").on("click", this.unPause);
        $("#exit").on("click",this.exitLevel);
        $("#restart").on("click",this.restartLevel);

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
        method:"GET",
        url:"/saveList",
        success:function(saves){
          newPause.unPause();
          newPlayer = new castlePlayer();
          game.state.start('MainMenu',true,false, saves);
        }
      });
    },
    restartLevel: function(){
      newPause.unPause();
      newPlayer.health = 6;
      newPlayer.gold = newPlayer.previousGold;
      $(".messages").html("");
      newPlayer.levelLoader();
    }

};
