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
        for (var a = 0; a < numberOfSpikes; a++) {
            var randomX = this.generateSpikeX();
            testSpike = game.add.sprite(randomX, 0, 'spike');
            testSpike.scale.setTo(1, 0.5);
            testSpike.enableBody = true;
            game.physics.ninja.enable(testSpike);
            testSpike.scale.setTo(1, 1);
            testSpike.anchor.setTo(0.5, 0.7);
            this.spikes.push(testSpike);
        }
    },
    update: function() {
        for (var i = 0; i < castleStage.tiles.length; i++) {
            for (var a = 0; a < this.spikes.length; a++) {
                this.spikes[a].body.aabb.collideAABBVsTile(castleStage.tiles[
                    i].tile);
            }
        }
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
    getRandomIntInclusive: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    spikeKill: function() {
      castlePlayer.killPlayer();
    },
    spikes:[]
};
