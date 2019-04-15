document.getElementById("git-feed").onclick = function() {
  let feedSettings = document.getElementById("github-feed");
  let bookmarkSettings = document.getElementById("bookmark-option");
  let calSettings = document.getElementById("github-cal");
  if (feedSettings.style.display === "none") {
    (feedSettings.style.display = "block"),
      (bookmarkSettings.style.display = "none"),
      (calSettings.style.display = "none");
  } else {
    feedSettings.style.display = "none";
  }
};

document.getElementById("bookmark-opt").onclick = function() {
  let bookmarkSettings = document.getElementById("bookmark-option");
  let feedSettings = document.getElementById("github-feed");
  let calSettings = document.getElementById("github-cal");
  if (bookmarkSettings.style.display === "none") {
    (bookmarkSettings.style.display = "block"),
      (calSettings.style.display = "none"),
      (feedSettings.style.display = "none");
  } else {
    bookmarkSettings.style.display = "none";
  }
};

document.getElementById("githubCal").onclick = function() {
  let calSettings = document.getElementById("github-cal");
  let bookmarkSettings = document.getElementById("bookmark-option");
  let feedSettings = document.getElementById("github-feed");
  if (calSettings.style.display === "none") {
    (calSettings.style.display = "block"),
      (bookmarkSettings.style.display = "none"),
      (feedSettings.style.display = "none");
  } else {
    calSettings.style.display = "none";
  }
};

/* document.getElementById("submitgituser").onclick = function() {
  var user1 = document.getElementById("gitUser").value;
  if (!user1) {
    message("Error: Enter Username");
    return;
  }
  chrome.sessionStorage.setItem({ user1 }, function() {
    message("Settings Saved");
  });
};
 */

document.getElementById("submitgituser").onclick = function() {
  var user1 = document.getElementById("gitUser").value;
  sessionStorage.clear();
  sessionStorage.setItem("userGit", user1);
};
console.log(sessionStorage);

/* document.getElementById("submitbookmark").onclick = function() {
  var bmTree = document.getElementById("bookmark-tree").value;
  bookmarks.getChildren(bmTree, function() {
    console.log(bmTree);
  });
};
 */
