var login = {
  init: function(){
    login.events();
  },

  events: function(){
    $("#loginBtn").on("click", function () {
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
          }
          else{
            $("#login").prepend("Incorrect Login");
          }
        });
    })
    $("#registerBtn").on("click", function () {
      var username = $("input[type='username']");
      var password = $("input[type='password']");
      $("input[type='username']").val("");
      $("input[type='password']").val("");
      $.ajax({
        method: "POST",
        url: "/createUser",
        data: { username: username, password: password}
      })
        .success(function( data ) {
          //check for successful login
          if (data){
            $("#login").addClass("hidden");
            $("#game").removeClass("hidden");
          };
        });
    })
  }

};
