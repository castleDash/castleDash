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
        // game.load.tilemap('map', 'assets/super_mario.json', null,
        //     Phaser.Tilemap.TILED_JSON);
        // game.load.image('tiles', 'assets/super_mario.png');
        game.load.spritesheet('ninja',
            'assets/sprites/NinjaCoverGirl.png', 32, 48, 9);
        game.load.spritesheet('sword', 'assets/sprites/Flame_Sword.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.NINJA);

        // map = game.add.tilemap('map');
        // map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
        //
        // layer = map.createLayer('World1');
        //
        // layer.resizeWorld();
        castleStage.createBack();

        player = game.add.sprite(32, 0, 'ninja');
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);




        game.physics.ninja.enableAABB(player);
        game.physics.ninja.gravity = 2;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

        castleStage.createFront();

        cursors = game.input.keyboard.createCursorKeys();
        keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
        keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
        keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
        keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);

        game.camera.deadzone = new Phaser.Rectangle(0, 100, 600, 400);
        player.body.collideWorldBounds = true;
        player.


    },
    update: function() {
        castleStage.update();
        if (keyA.isDown || cursors.left.isDown) {
            //This keeps the player from moving to the left of the camera frame.
            //You can't go back, you can only go foward.
            var gap = player.body.x - game.camera.x;
            if (gap > 0) {
                //  Move to the left
                if (gap < 348) {
                    player.body.moveLeft(gap - 48);

                } else {
                    player.body.moveLeft(300);
                }
                player.animations.play('left');
            }

        } else if (keyD.isDown || cursors.right.isDown) {
            //  Move to the right
            player.body.moveRight(300);
            player.animations.play('right');


        } else if (keyK.isDown) {

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
        if (keyW.isDown || cursors.up.isDown) {
            player.body.moveUp(350);
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
    createSword: function(direction) {
      if(direction==="left"){
        sword = game.add.sprite(-SWORD_X, SWORD_Y, 'sword');
        sword.scale.setTo(-SWORD_SCALE, SWORD_SCALE);
      } else {
        sword = game.add.sprite(SWORD_X, SWORD_Y, 'sword');
        sword.scale.setTo(SWORD_SCALE, SWORD_SCALE);
      }
      player.addChild(sword);
      game.physics.ninja.enable(sword);
      sword.body.gravityScale = 0;
      sword.visible = true;
      return sword;
    },
    attack: function(direction) {
        if( typeof sword !="object"){
          sword = castleDash.createSword(direction);
        }
        if(direction==="left"){
          sword.scale.x=-1;
          sword.anchor.setTo(-.8,1)
          player.frame = 3;
        }
        else{
          sword.scale.x=1;
          sword.anchor.setTo(0,1)
          player.frame = 8;
        }
        return sword;
    }

};

$(document).ready(function() {
    castleDash.init();
});
