var $threadId = $("#thread-id");
var $threadText = $("#thread-text");
var $threadDescription = $("#thread-description");
var $threadImage = $("#thread-image");
var $submitBtn = $("#submit");

// The API object contains methods for each kind of request we'll make
var API = {
  updateThread: function(data) {
    var formData = new FormData();
    formData.append("id", data.id);
    formData.append("text", data.text);
    formData.append("description", data.description);
    formData.append("image", data.image);

    return $.ajax({
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      url: "/api/threads"
    });
  }
};

$submitBtn.on("click", function(event) {
  event.preventDefault();

  var thread = {
    id: $threadId.val(),
    text: $threadText.val().trim(),
    description: $threadDescription.val().trim(),
    image: $threadImage[0].files[0]
  };

  if (!thread.id) {
    console.log("ID missing");
    return;
  }

  if (!(thread.text && thread.description)) {
    alert("You must enter a thread text and description!");
    return;
  }

  API.updateThread(thread).then(function() {
    //window.location = "/";
    var token = localStorage.getItem("token");
    if (token === "invalid") {
      window.location.href = "/signin";
    } else {
      window.location.href = "/?token=" + token;
    }
  });
});

$(".homepage").on("click", function() {
  var token = localStorage.getItem("token");
  if (token === "invalid") {
    window.location.href = "/signin";
  } else {
    window.location.href = "/?token=" + token;
  }
});
