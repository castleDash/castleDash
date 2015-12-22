var NinjaGame = NinjaGame || {};



var loggedIn = function(){

NinjaGame.game =new Phaser.Game(800, 320, Phaser.AUTO, 'game');

NinjaGame.game.state.add('Boot', NinjaGame.Boot);
NinjaGame.game.state.add('Preload', NinjaGame.Preload);
NinjaGame.game.state.add('MainMenu', NinjaGame.MainMenu);
NinjaGame.game.state.add('Game', NinjaGame.GameState);
NinjaGame.game.state.start('Boot');
};
