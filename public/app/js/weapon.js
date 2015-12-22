var castleWeapon = function () {};

castleWeapon.prototype = {

 create: function(){
   if(castleControl.weaponType===0){
     this.weapon = NinjaGame.game.add.sprite(0, 0, 'sword');

     this.weapon.enableBody = true;
   }
   else{
       this.weapon = NinjaGame.game.add.sprite(player.x, player.y-40, 'firepot');
       this.weapon.animations.add('throw', [0, 1, 2, 3], 10, true, true);
       this.weapon.animations.add('splash', [4,5,6,7,8], 10, true, true);
       NinjaGame.game.physics.ninja.enableAABB(this.weapon);
       this.weapon.enableBody = true;
       this.weapon.body.friction = 0.2;
       this.weapon.collideWorldBounds = true;
       this.weapon.body.bounce = 0.1;
   }
   this.weapon.anchor.setTo(0.5,0.5);
   this.weapon.scale.setTo(1,1);
   this.weapon.visible=true;
 },

 update: function(){
   if(keyW.isDown){
     if(this.weaponExists()){
       this.killWeapon();
     }
     castleControl.changeWeaponType();
   }
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
      if(this.weapon.body.touching.down){
        this.weapon.animations.play('splash');
        NinjaGame.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.killWeapon, this);
      }
     }

 },

 weaponAttack: function(direction,type){
   if(player.canAttack){
     if (!this.weaponExists()){
       this.create();
     }
     if(type===0){
       this.weapon.y=player.y;
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
       if(direction==="left"){
         this.weapon.body.moveLeft(50);
       }
       else{
         this.weapon.body.moveRight(50);
       }
       this.weapon.body.moveUp(50);
       this.weapon.animations.play('throw');
       }

   }
 },
  weaponExists: function(){
    return (typeof this.weapon === "object");
  },

  killWeapon: function(){
    if(this.weaponExists()){
      this.weapon.kill();
      this.weapon=undefined;
    }
  },
  rangeCollide: function(){
    for (var i=0; i<castleStage.tiles.length; i++){
      this.weapon.body.aabb.collideAABBVsTile(castleStage.tiles[i].tile);
     }
     _.each(castleStage.enemies, function(enemy){
       NinjaGame.game.physics.ninja.overlap(enemy.enemy, this.weapon, newEnemy.damageEnemy,
           null, this);
     }, this);
  },
  weapon: "",
  type: 1
};
