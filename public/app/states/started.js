var NinjaGame = NinjaGame || {};
// var winwid = window.innerWidth * window.devicePixelRatio;
// var winheight = window.innerHeight * window.devicePixelRatio;
//
// if(window.innerWidth * window.devicePixelRatio > 1200){
//   winwid = 1200;
// }
// if(winheight >500){
//   winheight = 500;
// }
//
// var loggedIn = function(){
//
// NinjaGame.game =new Phaser.Game(winwid, winheight, Phaser.AUTO, 'game');


var loggedIn = function(){

NinjaGame.game =new Phaser.Game(800, 320, Phaser.AUTO, 'game');
NinjaGame.game.state.add('Boot', NinjaGame.Boot);
NinjaGame.game.state.add('Preload', NinjaGame.Preload);
NinjaGame.game.state.add('MainMenu', NinjaGame.MainMenu);
NinjaGame.game.state.add('Game', NinjaGame.GameState);
NinjaGame.game.state.add('Credits', NinjaGame.CreditState);
NinjaGame.game.state.start('Boot');
};
