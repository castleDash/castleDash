var HAZARD_MINGAP = 600;
var HAZARD_MAXGAP = 500;
var MIN_HAZARDS = 1;
var MAX_HAZARDS = 3;

var castleHazards = {
    preload: function() {
        game.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    },
    create: function() {
        var numberOfSpikes = this.getRandomIntInclusive(MIN_HAZARDS, MAX_HAZARDS);
        this.spikes = [];
        _.times(numberOfSpikes, function(){
          castleHazards.createSpike();
        });
    },
    update: function() {
        for (var i = 0; i < castleStage.tiles.length; i++) {
          _.each(this.spikes, function (spike) {
            spike.body.aabb.collideAABBVsTile(castleStage.tiles[
                i].tile);
          });
        };
        game.physics.ninja.overlap(player, this.spikes, this.spikeKill,
            null, this);
    },
    generateSpikeX: function() {
        var lastX;
        if (this.spikes.length === 0) {
            lastX = 0;
        }
        else {
            lastX = this.spikes[this.spikes.length - 1].x;
        }
        var newX = this.getRandomIntInclusive(lastX + HAZARD_MINGAP,
            lastX + HAZARD_MAXGAP);
        return newX;
    },
    createSpike: function(){
      var randomX = castleHazards.generateSpikeX();
      newSpike = game.add.sprite(randomX, 0, 'spike');
      newSpike.scale.setTo(1, 0.5);
      newSpike.enableBody = true;
      game.physics.ninja.enable(newSpike);
      newSpike.scale.setTo(1, 1);
      newSpike.anchor.setTo(0.5, 0.7);
      castleHazards.spikes.push(newSpike);
    },
    getRandomIntInclusive: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    spikeKill: function() {
      castlePlayer.killPlayer();
    },
    spikes:[]
};
