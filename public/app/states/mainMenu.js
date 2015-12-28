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
        that.addFile("New Game",function(){
          $.ajax({
            method:"POST",
            url:"/createSave",
            success:function(data){
              NinjaGame.game.state.start("Game",true,false,data);
            },
          });
        })
      }
    }
  },

  update:function(){

  },

  addFile: function(fileName, callback){
    var that = this;
    var style = {font:'30px Arial', fill:"#fff", align:"center"};
    var style2 = {font:'30px Arial', fill:'#D64937', align:"center"};
    var text;
    if(fileName != "New Game"){
      text = counter +". - level: "+ fileName.level;
      var u = this.game.add.text(this.game.width/2, this.game.height/2,"X",style2);
      u.anchor.set(-12,3.5-counter*1.5);
      u.inputEnabled = true;
      u.events.onInputUp.add(function(){
        $.ajax({
        method:"POST",
        url:"/deleteSave",
        data:{id:fileName.id},
        success:function(data){
          $.ajax({
            method:"GET",
            url:"/saveList",
            success:function(saves){
              that.state.start('MainMenu',true,false, saves);
            }
          });
        }
      });
    });
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
