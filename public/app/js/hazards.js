var castleHazards = function(){};

castleHazards.prototype = {


    createSpike: function(x, y) {
      newSpike = game.add.sprite(x, y, 'spike');
      newSpike.scale.setTo(1, 0.5);
      newSpike.enableBody = true;
      game.physics.ninja.enableAABB(newSpike);
      newSpike.scale.setTo(1, 1);
      newSpike.anchor.setTo(0.5, 0.7);
      newSpike.body.immovable = true;
      return newSpike;
    },



  }//end prototype
