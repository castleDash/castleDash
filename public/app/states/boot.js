var Boot = function(){};



Boot.prototype = {
  init:function(){
    console.log('boot');

  },

  preload:function(){
    console.log("preloading loading bar");
    game.load.image('loading','app/assets/sprites/loadingBar.png');
  },

  create: function(){

    game.state.start("LoadSave");
  },

};
