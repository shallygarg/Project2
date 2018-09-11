// //Authentication elements

var $signin = $("#signin");
var $email = $("#email");
var $password = $("#password");

var handleSignIn = function() {
  var user = {
    email: $email.val().trim(),
    password: $password.val().trim()
  };
  $($signin).on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log(" sigining");
    console.log(user.email);
    console.log(user.password);

    var newUser = {
      userEmail: user.email,
      userPassword: user.password
    };
    //var password = $("#password").val().trim();

    // Send the POST request.
    //$.ajax("/api/user", {
    $.ajax("/token", {
      type: "POST",
      data: JSON.stringify(newUser),
      contentType: "application/json"
    }).then(function(result) {
      console.log("from server" + result.token);
      localStorage.setItem("token ", result.token);
      var token = localStorage.getItem("token");
      console.log("from local storage " + token);
      if (token !== null) {
        $.ajax("/secret", {
          type: "GET",
          data: token
        }).then(function(data) {
          console.log("in secret" + data);
        });
        //result.data.token
        //window.location.replace("/")
        //console.log(newUser);
        //console.log("new user");
      }
    });
  });
};

//Authenction Logic

$signin.on("click", handleSignIn);
