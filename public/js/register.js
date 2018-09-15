var $register = $("#register");
var $newUserId = $("#newUserID");
var $newPassword = $("#newUserPassword");
var $reenterPassword = $("#reenterPassword");

function stringlength() {
  //var username = $newUserId.val().trim();
  var password = $newPassword.val().trim();
  var renteredPassword = $reenterPassword.val().trim();
  var minlength = 8;
  var maxlength = 20;
  if (password.length <= minlength || password.length >= maxlength) {
    alert(
      "Please input the password between " +
        minlength +
        " and " +
        maxlength +
        " characters"
    );
    password.value = "";
    renteredPassword.value = "";
    location.reload();
    return false;
  } else {
    return true;
  }
}

$($register).on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  var user = {
    username: $newUserId.val().trim(),
    password: $newPassword.val().trim(),
    renteredPassword: $reenterPassword.val().trim()
  };
  if (stringlength()) {
    console.log("aaa");
    if (user.password === user.renteredPassword) {
      console.log("bbb");
      event.preventDefault();
      console.log(" Registring a new user");
      console.log(user.username);
      console.log(user.password);
      var newUser = {
        userName: user.username,
        userPassword: user.password
      };
      // Send the POST request.
      //$.ajax("/api/user", {
      $.ajax("/register", {
        type: "POST",
        data: JSON.stringify(newUser),
        contentType: "application/json"
      }).then(function(result) {
        console.log(result);
        if (result !== null) {
          alert(result.message);
          window.location.href = "/signin";
        }
      });
    } else {
      alert("Password does not match");
    }
  }
});
