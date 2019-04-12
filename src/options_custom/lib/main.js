document.getElementById("git-feed").onclick = function() {
  let feedSettings = document.getElementById("github-feed");
  if (feedSettings.style.display === "none") {
    feedSettings.style.display = "block";
  } else {
    feedSettings.style.display = "none";
  }
};

document.getElementById("bookmark-opt").onclick = function() {
  let bookmarkSettings = document.getElementById("bookmark-option");
  if (bookmarkSettings.style.display === "none") {
    bookmarkSettings.style.display = "block";
  } else {
    bookmarkSettings.style.display = "none";
  }
};

document.getElementById("githubCal").onclick = function() {
  let calSettings = document.getElementById("github-cal");
  if (calSettings.style.display === "none") {
    calSettings.style.display = "block";
  } else {
    calSettings.style.display = "none";
  }
};
