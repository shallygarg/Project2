// //Authentication elements

var $signin = $(".signin");
var $username = $("#username");
var $password = $("#password");

$($signin).on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  var user = {
    username: $username.val().trim(),
    password: $password.val().trim()
  };
  event.preventDefault();
  console.log("sigining");
  console.log(user.username);
  console.log(user.password);

  var newUser = {
    userName: user.username,
    userPassword: user.password
  };
  // Send the POST request.
  $.ajax("/token", {
    type: "POST",
    data: JSON.stringify(newUser),
    contentType: "application/json"
  }).then(function(result) {
    console.log(result);
    if (result.hasOwnProperty("message")) {
      console.log("user does not exist");
      alert(result.message);
      window.location.href = "/register";
    } else {
      console.log("from server" + result.token);
      localStorage.setItem("token", result.token);
      var token = localStorage.getItem("token");
      console.log("from local storage " + token);
      if (token !== null) {
        //window.location.href = "/secret?token=" + token;
        window.location.href = "/?token=" + token;
      }
    }
  });
});
