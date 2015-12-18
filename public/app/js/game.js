// //SWORD
// var SWORD_SCALE = 1;
// var SWORD_Y = -15;
// var SWORD_X = 20;
// var SWORD_ANCHOR = 0.5;
// //OTHER
// var NINJA_GRAVITY = 0.5;
// var WORLD_DEATH = 270;
// var newPlayer;
// var newSword;
// var castleStage = new castleStage();
// var castleDash = function(){};
//
// castleDash.prototype = {
//     init: function() {
//         this.styling();
//     },
//     styling: function() {
//
//       // game = new Phaser.Game(800, 320, Phaser.AUTO, 'game', {
//       //     preload: castleDash.preload,
//       //     create: castleDash.create,
//       //     update: castleDash.update,
//       //     render: castleDash.render
//       // });
//       newPlayer = new castlePlayer();
//       newSword = new castleWeapon();
//       game.create = this.create();
//       game.preload= this.preload();
//       game.update = this.update();
//       game.render = this.render();
//
//
//     },
//     events: function() {
//
//     },
//     preload: function() {
//       console.log("preloading dash");
//         castleStage.preload('testLevel.json');
//         newSword.preload();
//         newPlayer.preload();
//         castleControl.preload();
//     },
//     create: function() {
//       console.log("running game.create");
//         game.physics.startSystem(Phaser.Physics.NINJA);
//
//         castleStage.createBack();
//         newPlayer.create(castleStage.playerTile[0].x, castleStage.playerTile[0].y);
//         game.physics.ninja.gravity = NINJA_GRAVITY;
//
//         game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
//
//         castleStage.createFront();
//
//         castleControl.create();
//         // game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);
//
//     },
//     update: function() {
//       console.log("running game.update");
//
//         castleStage.update();
//         newPlayer.update();
//         newSword.update();
//         _.each(castleStage.enemies, function(enemy){
//           enemy.update();
//         });
//         castleControl.update();
//
//     },
//     render: function() {
//       // game.debug.body(castleStage.enemies.children[0]);
//       // game.debug.body(castleStage.enemies.children[1]);
//       // game.debug.body(castleStage.enemies.children[2]);
//     },
//
//
//     weapons: [],
//
//
//
// };
//
// $(document).ready(function() {
//     login.init();
// });
