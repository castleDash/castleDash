
var castleHazards = function(){};

castleHazards.prototype = {
    preload: function() {
        game.load.image('spike', 'app/assets/sprites/Spike_Pixel.png');
    },

    createSpike: function(x, y) {
      newSpike = game.add.sprite(x, y, 'spike');
      newSpike.scale.setTo(1, 0.5);
      newSpike.enableBody = true;
      game.physics.ninja.enable(newSpike);
      newSpike.scale.setTo(1, 1);
      newSpike.anchor.setTo(0.5, 0.7);
      newSpike.body.immovable = true;
      return newSpike;
    },



  }//end prototype
