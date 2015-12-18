var castleWeapon = function () {};

castleWeapon.prototype = {

 create: function(){
   if(castleControl.weaponType===0){
     this.weapon = NinjaGame.game.add.sprite(0, 0, 'sword');
   }
   else{
       console.log("creating firepot");
       this.weapon = NinjaGame.game.add.sprite(player.x, player.y, 'firepot');
       this.weapon.animations.add('throw', [0, 1, 2, 3], 10, true, true);
       this.weapon.animations.add('splash', [4,5,6,7,8], 2, true, true);
       NinjaGame.game.physics.ninja.enableAABB(this.weapon);
       this.weapon.body.friction = 0.1;
       this.weapon.collideWorldBounds = true;
   }
   this.weapon.anchor.setTo(0.5,0.5);
   this.weapon.scale.setTo(1,1);
   this.weapon.enableBody = true;
   this.weapon.visible=true;
 },

 update: function(){
   if (this.weaponExists() && castleControl.weaponType===0){
     this.killWeapon();
   }

   if (castleControl.attackCtrl()) {
       if (player.frame < 4) {
         this.weaponAttack("left",castleControl.weaponType);
       }
       else {
         this.weaponAttack("right",castleControl.weaponType);
      }
   }

    if (this.weaponExists() && castleControl.weaponType===1){
      this.rangeCollide();
     }

 },

 weaponAttack: function(direction,type){
   if(player.canAttack){
     if (!this.weaponExists()){
       this.create();
     }
     this.weapon.visible=true;
     this.weapon.y=player.y;
     if(type===0){
       if(direction==="left"){
         this.weapon.scale.x=-1;
         this.weapon.x=player.x-20;
         player.frame = 3;
        }
        else {
          this.weapon.scale.x=1;
          this.weapon.x=player.x+20;
          player.frame = 8;
        }
     }
     else{
       //this is where we make the potion a projectile
       }

   }
 },
  weaponExists: function(){
    return (typeof this.weapon === "object");
  },

  killWeapon: function(){
    this.weapon.kill();
    this.weapon=undefined;
  },
  rangeCollide: function(){
    for (var i=0; i<castleStage.tiles.length; i++){
      this.weapon.body.aabb.collideAABBVsTile(castleStage.tiles[i].tile);
     }
  },
  weapon: "",
  type: 1
};
