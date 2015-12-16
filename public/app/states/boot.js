var Boot = function(){};



Boot.prototype = {
  init:function(){
    game.load.image('loading','app/assets/sprites/loadingbar.png');
  },

  start: function(){
    game.state.start("loadSave");
  },

};
