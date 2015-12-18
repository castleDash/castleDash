var castleWeapon = function () {};

castleWeapon.prototype = {

 preload: function(){
  //  NinjaGame.game.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');

 },

 create: function(){
   this.sword = NinjaGame.game.add.sprite(0, 0, 'sword');
   this.sword.anchor.setTo(0.5,0.5);
   this.sword.scale.setTo(1,1);
   this.sword.enableBody = true;
   this.sword.visible=true;
 },

 update: function(){
  //  if(meleeCtrl){
  //    this.type=1;
  //  }
  //  else if(rangeCtrl){
  //    this.type=1;
  //  }
   if (this.swordExists()){
     this.killSword();
   }

   if (castleControl.attackCtrl()) {
       if (player.frame < 4) {
         if(this.type=1){
             this.swordAttack("left");
         }else{
           this.potionAttack("left");
         }
       }
       else {
         if(this.type=1){
           this.swordAttack("right");
         }else{
           this.potionAttack("right");
         }
      }
   }

 },

 swordAttack: function(direction){
   if(!this.swordExists() && player.canAttack){
     this.create();

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
  }
 },
  swordExists: function(){
    return (typeof this.sword === "object");
  },

  killSword: function(){
    this.sword.kill();
    this.sword=undefined;
  },
  sword: "",
  potion:"",
  type: 1
};
