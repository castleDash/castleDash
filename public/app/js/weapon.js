var castleWeapon = function () {};

castleWeapon.prototype = {

 preload: function(){
   game.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');

 },

 create: function(){
   this.sword = game.add.sprite(0, 0, 'sword');
   this.sword.anchor.setTo(0.5,0.5);
   this.sword.scale.setTo(1,1);
   this.sword.enableBody = true;
   this.sword.visible=true;
 },

 update: function(){
   if (this.swordExists()){
     this.killSword();
   }

   if (castleControl.attackCtrl()) {
       if (player.frame < 4) {
             this.attack("left");

       }
       else {
             this.attack("right");
       }
   }
 },

 attack: function(direction){
   if(!this.swordExists()){
     this.create();
   }

   this.sword.visible=true;
   this.sword.y=player.y;

   if(direction==="left"){
     this.sword.scale.x=-1;
     this.sword.x=player.x-20;
     player.frame = 3;
    }
    else {
      this.sword.scale.x=1;
      this.sword.x=player.x+20;
      player.frame = 8;
    }
 },
  swordExists: function(){
    return (typeof this.sword === "object");
  },

  killSword: function(){
    this.sword.kill();
    this.sword=undefined;
  },
  sword: ""
};
