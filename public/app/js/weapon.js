
var castleWeapon = {

 preload: function(){
   game.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');

 },

 create: function(){
   castleWeapon.sword = game.add.sprite(0, 0, 'sword');
   castleWeapon.sword.anchor.setTo(0.5,0.5);
   castleWeapon.sword.scale.setTo(1,1);
   castleWeapon.sword.visible=true;
 },

 update: function(){
   castleWeapon.sword.visible=false;
 },
 attack: function(direction){
   if(!castleWeapon.swordExists()){
     castleWeapon.create();
   }
   castleWeapon.sword.visible=true;
   castleWeapon.sword.y=player.y;
   if(direction==="left"){
     castleWeapon.sword.scale.x=-1;
     castleWeapon.sword.x=player.x-20;
     player.frame = 3;
    }
    else {
      castleWeapon.sword.scale.x=1;
      castleWeapon.sword.x=player.x+20;
      player.frame = 8;
    }
 },
  swordExists: function(){
    return (typeof castleWeapon.sword === "object");
  },

  killSword: function(){
    castleWeapon.sword.kill();
    castleWeapon.sword=undefined;
  },
  sword: ""
};
