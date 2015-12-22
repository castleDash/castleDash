//DO NOT TOUCH THIS AT ALL!
var patFormKennyTiles = [0, 1, 1, 32, 1, 1, 33, 32, 30, 1, 33, 32, 1, 1, 33, 1,
    2, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 32,
    1, 1, 1, 32, 1, 1, 1, 32, 1, 1, 1, 32, 1, 1, 1, 5, 1, 1, 1, 13, 1, 32,
    1, 20, 12, 2, 30, 1, 1, 1, 1, 1, 1, 3, 2, 1, 1, 32, 3, 30, 1, 32, 1, 1,
    1, 32, 1, 1, 1, 32, 1, 1, 1, 21, 1, 1, 1, 13, 30, 1, 1, 20, 20, 1, 30,
    12, 32, 1, 1, 1, 20, 12, 1, 33, 30, 1, 2, 1, 2, 1, 1, 1, 1, 1,
    3, 1, 3, 1, 32, 20, 32, 1, 32, 1, 32, 21, 32, 20, 32, 32, 32, 1, 32, 1,
    5, 1, 5, 2, 13, 3, 13, 1, 4, 42, 4, 32, 12, 4, 12, 0, 1, 13, 1, 0,
    1, 1, 1, 0
]; //SERIOUSLY, DO NOT TOUCH THIS, THIS IS USED WITH NINJA PHYSICS AND THE patformkenney-32 TILESET

var dashTemplate = ["<div class='weapon' id = 'melee'>",
            "<img src='app/assets/sprites/sword<%=weapon%>.png' alt='' />",
            "</div><div class='weapon' id = 'potion'>",
            "<img src='app/assets/sprites/potion<%=potion%>.png' alt='' />",
            "</div><div class='coin' >",
            "<img src='app/assets/sprites/coin.png' alt='' />",
            "<p id='gold'><%=gold%></p>",
            "</div><div class='health'>"
].join("");


var fullheart = "<img src='app/assets/sprites/fullheart.png' alt='' />"
var halfheart ="<img src='app/assets/sprites/halfheart.png' alt='' />"
var emptyheart = "<img src='app/assets/sprites/emptyheart.png' alt='' />"


var getHearts = function(health){
  switch(health){
    case 0:
      return emptyheart+emptyheart+emptyheart+"</div>";
      break;
    case 1:
      return halfheart+emptyheart+emptyheart+"</div>";
      break;
    case 2:
      return fullheart+emptyheart+emptyheart+"</div>";
      break;
    case 3:
      return fullheart+halfheart+emptyheart+"</div>";
      break;
    case 4:
      return fullheart+fullheart+emptyheart+"</div>";
      break;
    case 5:
      return fullheart+fullheart+halfheart+"</div>";
      break;
    case 6:
      return fullheart+fullheart+fullheart+"</div>";
      break;
    default:
      return emptyheart+emptyheart+emptyheart+"</div>";
      break;
  }
};
