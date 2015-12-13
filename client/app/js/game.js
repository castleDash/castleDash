var SWORD_SCALE = 1;
var SWORD_Y = -15;
var SWORD_X = 20;
var SWORD_ANCHOR = 0.5;

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

        game.physics.ninja.gravity = 0.5;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        castleStage.createFront();

        castleControl.create();

        // game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);

    },
    update: function() {
        if(player.body.y > WORLD_DEATH){
          player.kill();
        }
        castleStage.update();
        castlePlayer.update();
        if(player.body.touching.down){
          PLAYER_SPEED = 50;
        }
            // PLAYER MOVEMENT
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

        // ENEMY MOVEMENT
        var dist = enemy.body.x - player.body.x;
        if(dist < 250 && dist > 5) {
          castleEnemy.moveLeft();
        }
        else if(dist < -5 && dist > -250){
          castleEnemy.moveRight();
        }
        else{
          castleEnemy.standStill();
        }




    },
    render: function() {
        // game.debug.body(player);
        // game.debug.body(enemy);
        // if (typeof sword === "object") {
        //     // game.debug.body(sword);
        //     game.debug.rectangle(sword);
        //
        // }

    },
    game: {},


};

$(document).ready(function() {
    login.init();
    castleDash.init();
});
