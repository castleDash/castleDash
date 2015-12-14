//SWORD
var SWORD_SCALE = 1;
var SWORD_Y = -15;
var SWORD_X = 20;
var SWORD_ANCHOR = 0.5;
//OTHER
var NINJA_GRAVITY = 0.5;
var WORLD_DEATH = 270;



var castleDash = {
    init: function() {
        castleDash.styling();
    },
    styling: function() {
      game = new Phaser.Game(800, 320, Phaser.AUTO, 'game', {
          preload: castleDash.preload,
          create: castleDash.create,
          update: castleDash.update,
          render: castleDash.render
      });

    },
    events: function() {

    },
    preload: function() {
        castleStage.preload();
        castleWeapon.preload();
        castlePlayer.preload();
        castleEnemy.preload();
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.NINJA);
        castleStage.createBack();
        castlePlayer.create();
        castleEnemy.create();
        game.physics.ninja.gravity = NINJA_GRAVITY;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        castleStage.createFront();

        castleControl.create();

        // game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);

    },
    update: function() {
        castleStage.update();
        castlePlayer.update();
        castleWeapon.update();
        castleEnemy.update();
    },
    render: function() {


    },

    game: {},



};

$(document).ready(function() {
    login.init();
});
