// Get references to page elements
var $threadText = $("#thread-text");
var $threadDescription = $("#thread-description");
var $submitBtn = $("#submit");
var $threadList = $("#thread-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveThread: function(data) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/threads",
      data: JSON.stringify(data)
    });
  },
  getThreads: function() {
    return $.ajax({
      url: "api/threads",
      type: "GET"
    });
  },
  updateThreads: function() {
    return $.ajax({
      url: "api/thread" + id,
      type: "PUT"
    });
  },
  deleteThread: function(id) {
    return $.ajax({
      url: "api/thread/" + id,
      type: "DELETE"
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

      $li.append($button);
      $li.append($edit);

      return $li;
    });

    $threadList.empty();
    $threadList.append($threads);
  });
};

// var updateThread = function() {

// };

// handleFormSubmit is called whenever we submit a new thread
// Save the new thread to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var thread = {
    text: $threadText.val().trim(),
    description: $threadDescription.val().trim()
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
};

var handleEditBtnClick = function() {
  event.preventDefault();

  var thread = {
    text: $threadEditText.val().trim(),
    description: $threadEditDescription.val().trim()
  };

  if (!(thread.text && thread.description)) {
    alert("You must enter an post text and description!");
    return;
  }

  var idToEdit = $(this)
    .parent()
    .attr("data-id");

  API.updateThread(idToEdit).then(function() {
    updateThread();
    refreshThreads();
  });
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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$threadList.on("click", ".edit", handleEditBtnClick);
$threadList.on("click", ".delete", handleDeleteBtnClick);
