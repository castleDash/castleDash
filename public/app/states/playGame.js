PlayGame = function(){};

PlayGame.prototype = {

  init: function(ourSave){
    this.ourSave = ourSave;
    console.log('playGame');
  },
  preload: function(){
    game.load.script("public/app/js/untouchables.js");
    game.load.script("public/app/js/main.js");
    game.load.script("public/app/js/player.js");
    game.load.script("public/app/js/weapon.js");
    game.load.script("public/app/js/levels.js");
    game.load.script("public/app/js/gameControl.js");
    game.load.script("public/app/js/enemy.js");
    game.load.script("public/app/js/hazards.js");
  },

  create: function(){
    game.load.script('login','app/js/main.js');
    game.state.add('Login',Login);
    game.state.start('Login');

  },




};
