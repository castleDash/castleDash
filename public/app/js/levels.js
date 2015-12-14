//DO NOT TOUCH THIS AT ALL!
var patFormKennyTiles = [0, 1, 1, 32, 1, 1, 33, 32, 30, 1, 33, 32, 1, 1, 33, 1,
    2, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 32,
    1, 1, 1, 32, 1, 1, 1, 32, 1, 1, 1, 32, 1, 1, 1, 5, 1, 1, 1, 13, 1, 32,
    1, 20, 12, 2, 30, 1, 1, 1, 1, 1, 1, 3, 2, 1, 1, 32, 3, 30, 1, 32, 1, 1,
    1, 32, 1, 1, 1, 32, 1, 1, 1, 21, 1, 1, 1, 13, 30, 1, 1, 20, 20, 1, 30,
    12, 32, 1, 1, 1, 20, 12, 1, 33, 30, 1, 2, 1, 2, 1, 1, 1, 1, 1,
    3, 1, 3, 1, 32, 20, 32, 1, 32, 1, 32, 21, 32, 20, 32, 32, 32, 1, 32, 1,
    5, 1, 5, 2, 13, 3, 13, 1, 4, 42, 4, 32, 12, 4, 12, 0, 1, 13, 1, 0,
    1, 1, 1, 0
]; //SERIOUSLY, DO NOT TOUCH THIS, THIS IS USED WITH NINJA PHYSICS AND THE patformkenney-32 TILESET
var castleStage = {
    preload: function() {
        game.load.tilemap('level', 'app/assets/levels/testLevel.json', null,
            Phaser.Tilemap.TILED_JSON); //pulls json file of the level
        game.load.image('tiles',
            'app/assets/tiledMaps/patformkenney-32-4x39.png'); //pulls tileset art
        game.load.image('tree', 'app/assets/tiledMaps/PineTree.png')
        game.load.image('sky', 'app/assets/backgroundArt/sky.png');
        game.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    },
    createBack: function() {
        //just some  nicer art that's not part of the level object
        game.add.sprite(0, 0, 'sky');
        game.add.sprite(800, 0, 'sky');
        game.add.sprite(1600, 0, 'sky');
        game.add.sprite(2400, 0, 'sky');
        game.add.sprite(3600, 0, 'sky');
        map = game.add.tilemap('level'); //puts the level in the map varirable
        map.addTilesetImage('groundLayer', 'tiles'); //adds tileSet art into the map
        map.addTilesetImage('PineTree', 'tree'); //adds the pinetree art into map
        ground = map.createLayer('ground'); //creates layer called ground
        ground.resizeWorld();
        layer = map.createLayer('filler');
        layer.resizeWorld();
        slopeMap = patFormKennyTiles; //assigns master array to slopeMap
        this.tiles = game.physics.ninja.convertTilemap(map, ground, slopeMap);
        layer = map.createLayer('background');
        layer.resizeWorld();

        //adding spikeLayer for spike hazards
        spikes =[];
		      spikeLayer = map.createLayer('spikeLayer');
		        spikeLayer.resizeWorld();
		          this.spikeTiles = game.physics.ninja.convertTilemap(map, spikeLayer, slopeMap);
		            spikeLayer.kill();
		        for (var i = 0; i< this.spikeTiles.length; i++){
			           newSpike = game.add.sprite(this.spikeTiles[i].x, this.spikeTiles[i].y, 'spike');
                 newSpike.scale.setTo(1, 0.5);
                 newSpike.enableBody = true;
                 game.physics.ninja.enable(newSpike);
                 newSpike.scale.setTo(1, 1);
                 newSpike.anchor.setTo(0.5, 0.7);
                 spikes.push(newSpike);
		             }

    },
    createFront: function() {
        layer = map.createLayer('foreground'); //creates foreground layer to render after player is created so you can move behind objects
        layer.resizeWorld();
    },
    update: function() {
        //Magic for loop for tile collision
        for (var i = 0; i < this.tiles.length; i++) {
            player.body.aabb.collideAABBVsTile(this.tiles[i].tile);
            enemy.body.aabb.collideAABBVsTile(this.tiles[i].tile);
            for (var j = 0; j < spikes.length; j++) {
              spikes[j].body.aabb.collideAABBVsTile(this.tiles[i].tile);
            }

        }

    },
    spikeKill: function() {
      player.kill();
    },

    tiles:[],
    spikeTiles:[],
    spikes:[]
  };
