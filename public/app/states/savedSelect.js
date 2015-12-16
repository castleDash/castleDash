var loadSave = function(){};


loadSave.prototype = {
  init:function(){
    var file = 1;
    

  },

  getSaves: function(){



    // this.runSave(____)
  },
  create:function(){
    _.each(saves, function(){

    });
  },



  runSave:function(ourSave){
  game.state.start("loadingAssets",true, false, ourSave);

  },


};
