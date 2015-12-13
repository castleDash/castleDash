var SWORD_SCALE = 1;
var SWORD_Y = -15;
var SWORD_X = 20;
var SWORD_ANCHOR = .5;
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
        castleHazards.preload();
        game.load.spritesheet('sword', 'assets/sprites/Flame_Sword.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.NINJA);


        castleStage.createBack();
        castlePlayer.create();
        castleHazards.create();
        game.physics.ninja.gravity = 0.7;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        castleStage.createFront();

        castleControl.create();

        game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);

    },
    update: function() {

        castleStage.update();
        castleHazards.update();
        if (castleControl.leftCtrl()) {
            castlePlayer.moveLeft();
        } else if (castleControl.rightCtrl()) {
            castlePlayer.moveRight();
        } else if (castleControl.attackCtrl()) {


            if (player.frame < 4) {
                  castleWeapon.attack("left");

            } else {
                  castleWeapon.attack("right");
            }
        } else {
            if (castleWeapon.swordExists()){
              castleWeapon.killSword();
            }
            player.animations.stop();
            if (player.frame < 4) {
                player.frame = 0;
            } else {
                player.frame = 5;
            }
        }

        if (castleControl.jumpCtrl()) {
            castlePlayer.jump();

        }

    },
    render: function() {
        // game.debug.body(player);
        // if (typeof sword === "object") {
        //     // game.debug.body(sword);
        //     game.debug.rectangle(sword);
        //
        // }

    },
    game: {},


};

$(document).ready(function() {
    castleDash.init();
});
