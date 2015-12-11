var castleWeapon = {

 preload: function(){
   game.load.spritesheet('sword', 'assets/sprites/Flame_Sword.png');

 },

 create: function(){
   sword = game.add.sprite(0, 0, 'sword');
   sword.anchor.setTo(0.5,0.5);
   sword.scale.setTo(1,1);
   sword.visible=true;
 },

 update: function(){
   sword.visible=false;

 },
 attackLeft: function(){
   sword.visible=true;
   sword.scale.x=-1;
   sword.y=player.y;
   sword.x=player.x-20;
   player.frame = 3;

 },
 attackRight: function(){
   sword.visible=true;
   sword.scale.x=1;
   sword.y=player.y;
   sword.x=player.x+20;
   player.frame = 8;
 },

};
