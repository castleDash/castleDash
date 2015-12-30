var game = NinjaGame.game;
var DEFAULT_STRENGTH=3, DEFAULT_WEALTH=3;
var backgroundMusic;
var ship;
var originalY;

var mycastleStage = function(){};


mycastleStage.prototype = {

    createBack: function(levelName) {
        this.levelName = levelName;
        this.spikes=[];
        this.enemies=[];
        //just some  nicer art that's not part of the level object
        // game.add.sprite(0, 0, 'sky');
        // game.add.sprite(800, 0, 'sky');
        // game.add.sprite(1600, 0, 'sky');
        // game.add.sprite(2400, 0, 'sky');
        // game.add.sprite(3600, 0, 'sky');

        map = game.add.tilemap(this.levelName); //puts the level in the map varirable
        map.addTilesetImage('groundLayer', 'tiles'); //adds tileSet art into the map
        map.addTilesetImage('PineTree', 'tree'); //adds the pinetree art into map
        map.addTilesetImage('pirateShip', 'ship');


        ground = map.createLayer('ground'); //creates layer called ground
        ground.resizeWorld();

        slopeMap = patFormKennyTiles; //assigns master array to slopeMap
        this.tiles = game.physics.ninja.convertTilemap(map, ground,
            slopeMap);

        layer = map.createLayer('filler');
        if (layer !=null){
        layer.resizeWorld();
      }



        layer = map.createLayer('background');
        if (layer!=null){
        layer.resizeWorld();
      }

      playerLayer = map.createLayer('playerSpawn');
      if (playerLayer!=null){
        this.playerTile = game.physics.ninja.convertTilemap(map,playerLayer,slopeMap);
        playerLayer.resizeWorld();
      }

        //adding spikeLayer for spike hazards

        spikeLayer = map.createLayer('spikeLayer');
        if (spikeLayer != null){
        spikeLayer.resizeWorld();
        this.spikeTiles = game.physics.ninja.convertTilemap(map,
            spikeLayer, slopeMap);
        spikeLayer.kill();
        var hazard = new castleHazards();
        for (var i = 0; i < this.spikeTiles.length; i++) {
          spike = hazard.createSpike(this.spikeTiles[i].x - 16 , this.spikeTiles[i].y);
              //hazard is created at tile.x -16 because tile is drawn from left to right. at just x it draws halfway through a tile. this keeps everthing lined up nicely
             this.spikes.push(spike);
        }
      }

        endLevelLayer = map.createLayer('levelEnd');
        if (endLevelLayer!=null){
        endLevelLayer.resizeWorld();
        this.endTile = game.physics.ninja.convertTilemap(map, endLevelLayer, slopeMap);
      }


        enemyLayer = map.createLayer('enemyLayer');
        if (enemyLayer!=null){
        enemyLayer.resizeWorld();
        this.enemyTiles = game.physics.ninja.convertTilemap(map, enemyLayer, slopeMap);
        enemyLayer.kill();
        for (var i = 0; i< this.enemyTiles.length; i++){
          newEnemy = new castleEnemy();
          newEnemy.create(this.enemyTiles[i].x-16, this.enemyTiles[i].y, DEFAULT_WEALTH);
          this.enemies.push(newEnemy);
        }
      }

      backgroundMusic = game.add.audio('music');

      // if (levelName === 'level3'){
      //   ship = NinjaGame.game.add.sprite(5500,6908, 'ship');
      //   //ship doesn't spawn in proper spot for some insane reason...Guess the image itself is too large
      //   //ship.enableBody = true;
      //   NinjaGame.game.physics.ninja.enableAABB(ship);
      // }




    },
    createFront: function() {
        layer = map.createLayer('foreground'); //creates foreground layer to render after player is created so you can move behind objects
        if (layer !=null){
        layer.resizeWorld();
      }
    },

    update: function() {






        //Magic for loop for tile collision
        for (var i = 0; i < this.tiles.length; i++) {
            player.body.aabb.collideAABBVsTile(this.tiles[i].tile);
            if (this.spikes.length>0){
            for (var j = 0; j < this.spikes.length; j++) {
                this.spikes[j].body.aabb.collideAABBVsTile(this.tiles[i].tile);
            }
          }
          if (this.enemies.length>0){
            for (var e = 0; e < this.enemies.length; e++){
              this.enemies[e].enemy.body.aabb.collideAABBVsTile(this.tiles[i].tile);
        }
      }
    }
  },
    tiles: [],
    playerTile: [],
    spikeTiles: [],
    spikes: [],
    enemies: [],
    enemyTiles: [],
    endTile: [],
    shipTiles: []
};
