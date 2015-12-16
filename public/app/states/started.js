var game = new Phaser.Game(800, 320, Phaser.AUTO, 'game');
(function() {
  'use strict';



game.state.add("Boot", Boot);

game.state.add("loadSave", loadSave);

game.state.add("loadingAssets", loadAssets);

game.state.add("playGame", playGame);

game.state.start("Boot");



}());
