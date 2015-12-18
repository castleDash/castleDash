var NinjaGame = NinjaGame || {};

NinjaGame.MainMenu = function(){};

NinjaGame.MainMenu.prototype = {

  create: function(){
    var text = "New Game";
    var style = {font:'30px Arial', fill:"#fff", align:"center"};
    var t = this.game.add.text(this.game.width/2,this.game.height/2,text,style);
    t.anchor.set(0.5);
  },

  update:function(){
    if(this.game.input.activePointer.justPressed()){
      this.game.state.start("Game");
    }
  }



};
