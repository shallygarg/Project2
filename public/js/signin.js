// //Authentication elements

var $signin = $("#signin");
var $username = $("#username");
var $password = $("#password");

$($signin).on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  var user = {
    username: $username.val().trim(),
    password: $password.val().trim()
  };
  event.preventDefault();
  console.log(" sigining");
  console.log(user.username);
  console.log(user.password);

  var newUser = {
    userName: user.username,
    userPassword: user.password
  };
  // Send the POST request.
  //$.ajax("/api/user", {
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
        // $.ajax("/secret", {
        //   type: "GET",
        //   beforeSend: function(request) {
        //     request.setRequestHeader("Authorization", token);
        //   }
        // }).then(function(data) {
        //   console.log(data);
        //   // if (data.success === true) {
        //   //   //window.location.href = "/secret";
        //   //   console.log("in secret" + data);
        //   // }
        //});
        window.location.href = "/secret?token=" + token;
      }
    }
  });
  //result.data.token
  //window.location.replace("/")
  //console.log(newUser);
  //console.log("new user");
});
