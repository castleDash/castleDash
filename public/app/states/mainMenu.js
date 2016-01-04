var NinjaGame = NinjaGame || {};

NinjaGame.MainMenu = function(){};
var counter = 1;

NinjaGame.MainMenu.prototype = {
  init:function(saves){
    this.saves = saves;
    counter = 1;
    this.game.stage.backgroundColor = '#000000';
  },

  create: function(){

    var that = this;
    var saveFiles = [];
    var v = this.game.add.text(this.game.width/2, this.game.height/2,"Tutorial",{font:"VT323",fontSize:'30px', fill:"#fff", align:"center"});
    v.anchor.set(0.5, 3.5-counter);
    counter++;
    v.inputEnabled = true;
    v.events.onInputUp.add(function(){
      NinjaGame.game.state.start("Game",true,false,"tutorial");
    });

    _.each(that.saves, function(save){

      that.addFile(save, function(){NinjaGame.game.state.start("Game",true,false,save);});

    });


    if(counter<4){
      for (var i = counter; i <= 4; i++) {
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
    var l = this.game.add.text(this.game.width/20, this.game.height/2,"Logout",{font:"VT323",fontSize:'30px', fill:"#fff", align:"center"});
    l.anchor.set(0, 3.5);
    l.inputEnabled = true;
    l.events.onInputUp.add(function(){
      login.submitLogout();
    });

  },

  update:function(){

  },

  addFile: function(fileName, callback){
    var that = this;
    var style = {font:"VT323",fontSize:'30px', fill:"#fff", align:"center"};
    var style2 = {font:"VT323",fontSize:'30px' , fill:'#D64937', align:"center"};
    var text;
    if(fileName != "New Game"){
      text = counter +". Level: "+ fileName.level;
      var u = this.game.add.text(this.game.width/2, this.game.height/2,"X",style2);
      u.anchor.set(-12,3.5-counter*1.2);
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
    t.anchor.set(0.5, 3.5-counter*1.2);
    t.inputEnabled = true;
    t.events.onInputUp.add(callback);
    counter++;
  }


};
