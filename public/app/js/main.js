var NinjaGame = NinjaGame || {};
var login = {
  init: function(){
    login.events();
  },

  events: function(){
    window.addEventListener("beforeunload", function() {
      login.submitLogout();
    });
    $("#logout").on("click",function(){
      login.submitLogout();
    });
    $("#loginBtn").on("click", function () {
      login.submitLogin();
    });
    $("#password").keypress(function (e) {
      if (e.which == 13) {
        login.submitLogin();
      }
    });
    $("body").keypress(function (e) {
      if (e.which == 13
          &&
          ($("#game").html().indexOf("You died")!=-1 ||
           $("#game").html().indexOf("You win")!=-1)) {
        $("#game").html("");
        game.state.start(game.state.current);
      }
    });
    $("#registerBtn").on("click", function () {
      var username = $("input[type='username']").val();
      var password = $("input[type='password']").val();
      $("input[type='username']").val("");
      $("input[type='password']").val("");
      $.ajax({
        method: "POST",
        url: "/createUser",
        data: { username: username, password: password}
      })
      .then(function(data) {

        //check for successful login
        if(data==="success"){
          $("#login").addClass("hidden");
          $("#game").removeClass("hidden");
          loggedIn();
        }
        else{
          $(".messages").html("Username invalid");
        }
      });
    });
  },
  submitLogout: function(){
    console.log("logging out");
    $.ajax({
      method:"POST",
      url:"/logout",
      success:function(){
        NinjaGame.game.state.clearCurrentState();
        NinjaGame.game.cache.destroy();
        newPlayer = undefined;
        NinjaGame.game.world.shutdown();
        NinjaGame.game.destroy();
        $('canvas').remove();
        $('.messages').html("");
        $("#game").addClass("hidden");
        $("#login").removeClass("hidden");
      }
    });
  },
  submitLogin: function(){
    var username = $("input[type='username']").val();
    var password = $("input[type='password']").val();
    $("input[type='username']").val("");
    $("input[type='password']").val("");
    $.ajax({
      method: "POST",
      url: "/login",
      data: { username: username, password: password}
    })
      .error(function(data){
        $(".messages").html("Incorrect Password");
      })
      .then(function(data) {
        //check for successful login
        if(data==="success"){
          $("#login").addClass("hidden");
          $("#game").removeClass("hidden");
          loggedIn();
        }
        else{
          $(".messages").html("Incorrect Password");
        }
      });
    },

    gameOver: function(){

      // game.destroy();
      // $("canvas").remove();
      // $("#game").html("<h2>You died</h2><p>Press enter to play again.</p>");
    },
    winLevel: function(){

      // game.destroy();
      // $("canvas").remove();
      // $("#game").html("<h2>You win</h2><p>Press enter to play again.</p>");
    }
};
(function() {
  'use strict';
    login.init();
}());
