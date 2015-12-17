var game = new Phaser.Game(800, 320, Phaser.AUTO, 'game');

var Started = function(){};


Started.prototype ={
  init:function(){


  },

  preload:function(){
      game.load.script('boot','app/states/boot.js');
      game.load.script('main','app/js/main.js');
      game.load.script('assets','app/states/Load.js');
      game.load.script('saved', 'app/states/savedSelect.js');
      game.load.script('play','app/states/playGame.js');

  },


  create: function(){
    console.log("started");

    game.state.add("Boot", Boot);

    game.state.add("LoadSave", LoadSave);

    game.state.add("LoadingAssets", loadAssets);

    game.state.add("PlayGame", PlayGame);

    game.state.start("Boot");

  },

};
game.state.add('Started', Started );
game.state.start('Started');
