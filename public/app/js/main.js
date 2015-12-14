var login = {
  init: function(){
    login.events();
  },

  events: function(){
    $("#loginBtn").on("click", function () {
      login.submitLogin();
    })
    $('#password').keypress(function (e) {
      if (e.which == 13) {
        login.submitLogin();
    }
    });    $("#registerBtn").on("click", function () {
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
          $("#login").prepend("Username invalid");
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
        $("#login").prepend("Incorrect Login");
      })
      .then(function(data) {
        //check for successful login
        if(data==="success"){
          $("#login").addClass("hidden");
          $("#game").removeClass("hidden");
          castleDash.init();
        }
        else{
          $("#login").prepend("Incorrect Login");
        }
      });
  }

};
