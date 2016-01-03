var game = NinjaGame.game;
var DEFAULT_STRENGTH=3, DEFAULT_WEALTH=3;
var backgroundMusic;


var mycastleStage = function(){};


mycastleStage.prototype = {

    createBack: function(levelName) {
        this.levelName = levelName;
        this.spikes=[];
        this.enemies=[];

        if(this.levelName === "tutorial"){

          var mv = game.add.sprite(300,1000,'moveControl');
          mv.animations.add('go',[0,0,1,0,0,2],5,true);
          mv.scale.setTo(2,2);
          mv.animations.play('go');

          var jmp = game.add.sprite(900,1000,'jumperControl');
          jmp.animations.add('go',[0,0,1,0,0,2],5,true);
          jmp.scale.setTo(2,2);
          jmp.animations.play('go');

          var atk = game.add.sprite(1600,1000,'attackControl');
          atk.animations.add('go',[0,0,1,0,0,2],5,true);
          atk.scale.setTo(2,2);
          atk.animations.play('go');

          var tgl = game.add.sprite(2400,950,'toggleControl');
          tgl.animations.add('go',[0,0,1,0,0,2],5,true);
          tgl.scale.setTo(2,2);
          tgl.animations.play('go');

          var pos = game.add.sprite(2800,950,'pauseControl');
          pos.animations.add('go',[0,0,1,0,0,2],5,true);
          pos.scale.setTo(2,2);
          pos.animations.play('go');

          backgroundMusic = game.add.audio('music');

        }
        if (this.levelName === 'level1'){
          backgroundMusic = game.add.audio('level1Music');
        }
        if (this.levelName === 'level2'){
          backgroundMusic = game.add.audio('level2Music');
        }
        if (this.levelName === 'level3'){
          backgroundMusic = game.add.audio('level3Music');
        }

        map = game.add.tilemap(this.levelName); //puts the level in the map varirable
        map.addTilesetImage('groundLayer', 'tiles'); //adds tileSet art into the map
        map.addTilesetImage('PineTree', 'tree'); //adds the pinetree art into map
        map.addTilesetImage('pirateShip', 'ship');


        ground = map.createLayer('ground'); //creates layer called ground
        ground.resizeWorld();

        slopeMap = patFormKennyTiles; //assigns master array to slopeMap
        this.tiles = game.physics.ninja.convertTilemap(map, ground,
            slopeMap);


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
    //   toughEnemyLayer = map.createLayer('toughLayer');
    //   if (toughEnemyLayer!=null){
    //   toughEnemyLayer.resizeWorld();
    //   this.toughTiles = game.physics.ninja.convertTilemap(map, toughEnemyLayer, slopeMap);
    //   toughEnemyLayer.kill();
    //   for (var i = 0; i< this.toughTiles.length; i++){
    //     newFriend = new castleEnemy();
    //     newFriend.create(this.toughTiles[i].x-16, this.toughTiles[i].y, DEFAULT_WEALTH);
    //     newFriend.strength = 100;
    //     this.toughEnemies.push(newFriend);
    //   }
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
      // if (this.toughEnemies.length > 0){
      //   for (var t = 0; t<this.toughEnemies.length; t++){
      //     this.toughEnemies[t].enemy.body.aabb.collideAABBVsTile(this.tiles[i].tile);
      //   }
      // }
    }
  },
    tiles: [],
    playerTile: [],
    spikeTiles: [],
    spikes: [],
    enemies: [],
    enemyTiles: [],
    endTile: [],
    toughTiles: [],
    toughEnemies: []
};
