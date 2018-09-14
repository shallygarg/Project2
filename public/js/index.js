// Get references to page elements
var $signout = $("#signout");
var $threadText = $("#thread-text");
var $threadDescription = $("#thread-description");
var $submitBtn = $("#submit");
var $threadList = $("#thread-list");
var $threadImage = $("#thread-image");
//var $home = $("#home");

var $commentDescription = $("#comment-description");
var $commentSubmitBtn = $("#commentSubmit");

// The API object contains methods for each kind of request we'll make
var API = {
  saveThread: function(data) {
    var formData = new FormData();
    formData.append("text", data.text);
    formData.append("description", data.text);
    formData.append("image", data.image);

    return $.ajax({
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      url: "api/threads"
    });
  },
  saveComment: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/comments",
      data: JSON.stringify(data)
    });
  },
  getThreads: function() {
    return $.ajax({
      url: "api/threads",
      type: "GET"
    });
  },
  updateThread: function(data) {
    return $.ajax({
      url: "api/threads",
      type: "PUT",
      data: JSON.stringify(data)
    }).then(function(data) {
      console.log(data);
    });
  },

  deleteThread: function(id) {
    return $.ajax({
      url: "api/thread/" + id,
      type: "DELETE"
    });
  },
  likeThread: function(id) {
    return $.ajax({
      url: "api/thread/" + id + "/like",
      type: "POST"
    });
  }
};

// refreshThreads gets new threads from the db and repopulates the list
var refreshThreads = function() {
  API.getThreads().then(function(data) {
    var $threads = data.map(function(data) {
      var $a = $("<a>")
        .text(data.text)
        .attr("href", "/thread/" + data.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": data.id
        })
        .append($a);

      var $edit = $("<button>")
        .addClass("btn btn-primary float-right edit")
        .text("Edit");

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      var $like = $("<button>")
        .addClass("btn btn-warning float-right like")
        .text("Like");

      var $count = $("<span>")
        .addClass("float-right mr-5 disabled font-italic")
        .attr("id", "count")
        .text("Total Likes: " + data.likes);

      $li.append($button);
      $li.append($edit);
      $li.append($like);
      $li.append($count);

      return $li;
    });

    $threadList.empty();
    $threadList.append($threads);
  });
};

// handleFormSubmit is called whenever we submit a new thread
// Save the new thread to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  var thread = {
    text: $threadText.val().trim(),
    description: $threadDescription.val().trim(),
    image: $threadImage[0].files[0]
  };

  if (!(thread.text && thread.description)) {
    alert("You must enter a thread text and description!");
    return;
  }

  API.saveThread(thread).then(function() {
    refreshThreads();
  });

  $threadText.val("");
  $threadDescription.val("");
  $threadImage.val("");
};

// COMMENT handleFormSubmit is called whenever we submit a new comment
// Save the new comment to the db and refresh the list
var commentHandleFormSubmit = function(event) {
  event.preventDefault();

  var comment = {
    description: $commentDescription.val().trim(),
    ThreadId: $commentSubmitBtn.attr("data-id")
  };
  if (!comment.description) {
    alert("You must enter a comment!");
    return;
  }

  API.saveComment(comment).then(function() {
    location.reload();
  });

  $commentDescription.val("");
};

var handleEditBtnClick = function() {
  event.preventDefault();

  var threadId = $(this)
    .closest("[data-id]")
    .attr("data-id");

  window.location.href = "/thread/" + threadId + "/edit";
};

// handleDeleteBtnClick is called when an thread's delete button is clicked
// Remove the thread from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteThread(idToDelete).then(function() {
    refreshThreads();
  });
};

var handleLikeBtnClick = function() {
  event.preventDefault();

  var threadId = $(event.target)
    .closest("[data-id]")
    .attr("data-id");

  API.likeThread(threadId).then(function() {
    refreshThreads();
  });
};

$($signout).on("click", function() {
  localStorage.setItem("token", "invalid");
  var token = localStorage.getItem("token");
  console.log("from local storage in signout" + token);
  alert("you have successfully signedout");
  if (token === "invalid") {
    //window.location.href = "/secret?token=" + token;
    window.location.href = "/signin";
  }
});

$("#home").on("click", function() {
  var token = localStorage.getItem("token");
  if (token === "invalid") {
    window.location.href = "/signin";
  } else {
    window.location.href = "/?token=" + token;
  }
});
// Add event listeners to the submit and delete buttons
//TO DO: Consider adding document load ready logic or something
$submitBtn.on("click", handleFormSubmit);
$threadList.on("click", ".edit", handleEditBtnClick);
$threadList.on("click", ".delete", handleDeleteBtnClick);
$threadList.on("click", ".like", handleLikeBtnClick);
$commentSubmitBtn.on("click", commentHandleFormSubmit);
