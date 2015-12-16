var login = {
  init: function(){
    login.events();
  },

  events: function(){
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
          ($(".messages").html().indexOf("You died")!=-1 ||
           $(".messages").html().indexOf("You win")!=-1)) {
        $(".messages").html("");
        console.log("restarting game");
        castleDash.init();
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
          castleDash.init();
        }
        else{
          $(".messages").html("Username invalid");
        }
      });
    })
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
          castleDash.init();
        }
        else{
          $(".messages").html("Incorrect Password");
        }
      });
    },
    gameOver: function(){
      game.destroy();
      $("canvas").remove();
      $(".messages").html("<h2>You died</h2><p>Press enter to play again.</p>");
    },
    winLevel: function(){
      game.destroy();
      $("canvas").remove();
      $(".messages").html("<h2>You win</h2><p>Press enter to play again.</p>");
    }

};
