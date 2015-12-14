var HAZARD_MINGAP = 200;
var HAZARD_MAXGAP = 100;
var castleHazards = {
    preload: function() {
        game.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    },
    create: function() {
        var numberOfSpikes = this.getRandomIntInclusive(5, 10);
        this.spikes = [];
        for (var a = 0; a < numberOfSpikes; a++) {
            var randomX = this.generateSpikeX();
            var randomY = this.getRandomIntInclusive(0, 100);
            testSpike = game.add.sprite(randomX, randomY, 'spike');
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
        // game.physics.ninja.overlap(player, this.spikes, this.spikeKill,
        //     null, this);
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
      player.kill();
    },
    spikes:[]
};
