var SWORD_SCALE = 1;
var SWORD_Y = -15;
var SWORD_X = 20;
var SWORD_ANCHOR = .5;
var castleDash = {
    init: function() {
        castleDash.styling();
    },
    styling: function() {
        game = new Phaser.Game(800, 240, Phaser.AUTO, 'game', {
            preload: castleDash.preload,
            create: castleDash.create,
            update: castleDash.update,
            render: castleDash.render
        });

    },
    events: function() {

    },
    preload: function() {

        castlePlayer.preload();
        // castleWeapon.preload();
        game.load.tilemap('map', 'assets/super_mario.json', null,
            Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/super_mario.png');


    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.NINJA);

        castlePlayer.create();

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        castleControl.create();

        game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);



    },
    update: function() {

        if (castleControl.leftCtrl()) {
            castlePlayer.moveLeft();
        } else if (castleControl.rightCtrl()) {
            castlePlayer.moveRight();
        } else if (castleControl.attackCtrl()) {

            if (player.frame < 4) {
                  sword = castleDash.attack("left");

            } else {
                  sword = castleDash.attack("right");
            }
        } else {
            if (typeof sword === "object") {
                sword.kill();
                sword = undefined;
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

(function() {
  castleDash.init();

}());
