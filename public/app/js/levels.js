var castleStage = {
    preload: function() {
        game.load.tilemap('level', 'app/assets/levels/testLevel.json',
            null,
            Phaser.Tilemap.TILED_JSON); //pulls json file of the level
        game.load.image('tiles',
            'app/assets/tiledMaps/patformkenney-32-4x39.png'); //pulls tileset art
        game.load.image('tree', 'app/assets/tiledMaps/PineTree.png');
        game.load.image('sky', 'app/assets/backgroundArt/sky.png');
        game.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
        game.load.spritesheet('orc', 'app/assets/sprites/orc_piratess.png', 64, 64, 36);

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
        this.tiles = game.physics.ninja.convertTilemap(map, ground,
            slopeMap);
        layer = map.createLayer('background');
        layer.resizeWorld();

        //adding spikeLayer for spike hazards

        spikeLayer = map.createLayer('spikeLayer');
        spikeLayer.resizeWorld();
        this.spikeTiles = game.physics.ninja.convertTilemap(map,
            spikeLayer, slopeMap);
        spikeLayer.kill();
        var hazard = new castleHazards();
        for (var i = 0; i < this.spikeTiles.length; i++) {
          spike = hazard.createSpike(this.spikeTiles[i].x, this.spikeTiles[i].y);
             this.spikes.push(spike);
        }


        enemyLayer = map.createLayer('enemyLayer');
        enemyLayer.resizeWorld();
        this.enemyTiles = game.physics.ninja.convertTilemap(map, enemyLayer, slopeMap);
        enemyLayer.kill();
        for (var i = 0; i< this.enemyTiles.length; i++){
          newEnemy = new castleEnemy();
          newEnemy.create(this.enemyTiles[i].x, this.enemyTiles[i].y);
          this.enemies.push(newEnemy);
        }
        endLevelLayer = map.createLayer('levelEnd');
        endLevelLayer.resizeWorld();
        this.endTile = game.physics.ninja.convertTilemap(map, endLevelLayer, slopeMap);

        testLayer = map.createLayer('testLayer');
        if (testLayer!=null){
          testLayer.resizeWorld();
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
            // this.enemy.body.aabb.collideAABBVsTile(this.tiles[i].tile);
            for (var j = 0; j < this.spikes.length; j++) {
              // console.log(this.spikes[j]);
                this.spikes[j].body.aabb.collideAABBVsTile(this.tiles[i].tile);
            }
            for (var e = 0; e < this.enemies.length; e++){
              this.enemies[e].enemy.body.aabb.collideAABBVsTile(this.tiles[i].tile);

        }
    }
  },
    tiles: [],
    spikeTiles: [],
    spikes: [],
    enemies: [],
    enemyTiles: [],
    endTile: []
};
