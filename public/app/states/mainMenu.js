var NinjaGame = NinjaGame || {};

NinjaGame.MainMenu = function(){};
var counter = 1;

NinjaGame.MainMenu.prototype = {
  init:function(saves){
    this.saves = saves;
    counter = 1;
  },

  create: function(){
    var that = this;
    var saveFiles = [];


    _.each(that.saves, function(save){

      that.addFile(save, function(){NinjaGame.game.state.start("Game",true,false,save);});

    });
    if(counter<4){
      for (var i = counter; i < 4; i++) {
        that.addFile("New Game",function(){$.ajax({method:"POST",url:"/createSave",success:function(){console.log("Success");NinjaGame.game.state.start("Game",true,false)}})});
      }
    }


    // var t = this.game.add.text(this.game.width/2,this.game.height/2,textOne,style);
    // t.anchor.set(1);
    // var u = this.game.add.text(this.game.width/2,this.game.height/2,textTwo, style);
    // u.anchor.set(0.5);
    // var v = this.game.add.text(this.game.width/2,this.game.height/2,textThree, style);
    // v.anchor.set(0.0);

  },

  update:function(){
    if(this.game.input.activePointer.justPressed()){
      this.game.state.start("Game");
    }
  },

  addFile: function(fileName, callback){
    var style = {font:'30px Arial', fill:"#fff", align:"center"};
    var text;
    if(fileName != "New Game"){
      text = counter +". - level: "+ fileName.level;
    }
    else{
      text = fileName;
    }
    var t = this.game.add.text(this.game.width/2, this.game.height/2,text,style);
    t.anchor.set(0.5, 3.5-counter*1.5);
    t.inputEnabled = true;
    t.events.onInputUp.add(callback);
    counter++;
  }



};
