var game = {
  init: function(){
    game.styling();
  },
  styling: function(){
    var mygame = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: game.preload, create: game.create, update: game.update });
  },
  events: function(){

  },
  preload: function(){

  },
  create: function(){

  },
  update: function(){

  }
};

$(document).ready(function () {
  game.init();
});
