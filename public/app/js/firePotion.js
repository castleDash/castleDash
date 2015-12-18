var castlePotion = function () {};

castlePotion.prototype = {

 preload: function(){
  // game.load.spritesheet('sword', 'app/assets/sprites/Flame_Sword.png');
   game.load.spritesheet('firepot', 'app/assets/sprites/firepotionfull.png',32,32, 9);
 },

 create: function(){
   this.firePot = game.add.sprite(player.x, player.y, 'firepot');
   this.firePot.scale.setTo(0.5,0.5);
   this.firePot.animations.add('throw', [0, 1, 2, 3], 10, true, true);
   this.firePot.animations.add('splash', [4,5,6,7,8], 2, true, true);
   game.physics.ninja.enableAABB(this.firePot);
   this.firePot.anchor.setTo(0.5, 0.5);
   this.firePot.scale.setTo(1,1);
   this.firePot.enableBody = true;
   this.firePot.body.friction = 0.1;
   this.firePot.visible=true;
   this.firePot.collideWorldBounds = true;
  // this.firePot.collideAABBVsTile = true;

 },

 update: function(){
  //  if(meleeCtrl){
  //    this.type=1;
  //  }
  //  else if(rangeCtrl){
  //    this.type=1;
  //  }

   if (this.potionExists() && player.frame>4) {
     this.firePot.animations.play('throw');
     this.firePot.body.moveRight(16);
     if (this.firePot.body.x >= (player.x +25)){
       this.firePot.animations.play('splash');
     }
     if (this.firePot.body.x > (player.x + 75)){
     this.killPotion();
   }
 } else {
    if (this.potionExists() && player.frame <=4){
     this.firePot.animations.play('throw');
     this.firePot.body.moveRight(-16);
     if (this.firePot.body.x <= (player.x -25)){
       this.firePot.animations.play('splash');
     }
     if (this.firePot.body.x < (player.x - 75)){
     this.killPotion();
    }
  }
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

   if (this.firePot!=null){
     for (var i=0; i<castleStage.tiles.length; i++){
   this.firePot.body.aabb.collideAABBVsTile(castleStage.tiles[i].tile);
      }
    }
 },

 swordAttack: function(direction){
   if(!this.potionExists() && player.canAttack){
     this.create();

     this.firePot.visible=true;
     this.firePot.y=player.y;
     this.firePot.animations.play('throw');


     if(direction==="left"){
       this.firePot.scale.x=-1;
       this.firePot.x = player.x-20;
       //this.firePot.body.moveLeft(32);
       player.frame = 3;

      }
      else {
        this.firePot.scale.x=1;
        this.firePot.x=player.x+20;

      //  this.firePot.body.moveRight(32);
        player.frame = 8;
    }
  }
 },

  potionExists: function(){
    return (typeof this.firePot === "object");
  },
  killPotion: function(){
    this.firePot.kill();
    this.firePot=undefined;
  },

  sword: "",
  potion:"",
  type: 1
};
