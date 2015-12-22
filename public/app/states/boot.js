var NinjaGame = NinjaGame || {};
NinjaGame.Boot = function(){};



NinjaGame.Boot.prototype = {

  preload:function(){
    this.load.image('preloadbar', 'app/assets/sprites/loadingBar.png');
  },

  create: function(){
    this.game.stage.backgroundColor = '#DDDDDD';

    this.game.physics.startSystem(Phaser.Physics.NINJA);

    this.state.start('Preload');


  },

};
