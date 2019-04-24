document.getElementById("git-feed").addEventListener("click", feedDisplay);
function feedDisplay() {
  let feedSettings = document.getElementById("github-feed");
  let bookmarkSettings = document.getElementById("bookmark-option");
  let calSettings = document.getElementById("github-cal");
  let weatherSettings = document.getElementById("weatherOpt");
  if (feedSettings.style.display === "none") {
    (feedSettings.style.display = "block"),
      (bookmarkSettings.style.display = "none"),
      (calSettings.style.display = "none"),
      (weatherSettings.style.display = "none");
  } else {
    feedSettings.style.display = "none";
  }
}

document
  .getElementById("bookmark-opt")
  .addEventListener("click", bookmarkDisplay);
function bookmarkDisplay() {
  let bookmarkSettings = document.getElementById("bookmark-option");
  let feedSettings = document.getElementById("github-feed");
  let calSettings = document.getElementById("github-cal");
  let weatherSettings = document.getElementById("weatherOpt");
  if (bookmarkSettings.style.display === "none") {
    (bookmarkSettings.style.display = "block"),
      (calSettings.style.display = "none"),
      (feedSettings.style.display = "none"),
      (weatherSettings.style.display = "none");
  } else {
    bookmarkSettings.style.display = "none";
  }
}

document.getElementById("githubCal").addEventListener("click", calendarDisplay);
function calendarDisplay() {
  let calSettings = document.getElementById("github-cal");
  let bookmarkSettings = document.getElementById("bookmark-option");
  let feedSettings = document.getElementById("github-feed");
  let weatherSettings = document.getElementById("weatherOpt");
  if (calSettings.style.display === "none") {
    (calSettings.style.display = "block"),
      (bookmarkSettings.style.display = "none"),
      (feedSettings.style.display = "none"),
      (weatherSettings.style.display = "none");
  } else {
    calSettings.style.display = "none";
  }
}

document
  .getElementById("weatherInfo")
  .addEventListener("click", weatherDisplay);
function weatherDisplay() {
  let calSettings = document.getElementById("github-cal");
  let bookmarkSettings = document.getElementById("bookmark-option");
  let feedSettings = document.getElementById("github-feed");
  let weatherSettings = document.getElementById("weatherOpt");
  if (weatherSettings.style.display === "none") {
    (weatherSettings.style.display = "block"),
      (calSettings.style.display = "none"),
      (bookmarkSettings.style.display = "none"),
      (feedSettings.style.display = "none");
  } else {
    weatherSettings.style.display = "none";
  }
}

document
  .getElementById("submitWeather")
  .addEventListener("click", weatherLocation);
function weatherLocation() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    /* console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`); */

    sessionStorage.userLatitude = crd.latitude;
    sessionStorage.userLongitude = crd.longitude;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}
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

document
  .getElementById("submitgituser")
  .addEventListener("click", submitGitUser);
function submitGitUser() {
  let user1 = document.getElementById("gitUser").value;

  if (sessionStorage.getItem("userGit" === null)) {
    return undefined;
  } else {
    sessionStorage.userGit = user1;
  }
  clearForm();
}
console.log(sessionStorage);

function clearForm() {
  document.getElementById("gitUser").value = "";
  document.getElementById("gitCalUser").value = "";
}

document
  .getElementById("submitbookmark")
  .addEventListener("click", saveBookmarks);
function saveBookmarks() {
  let userBookmarks = [];
  userBookmarks = document.getElementById("bookmarkForm").value;
  let tempBook = new Array();

  tempBook = marked.inlineLexer(userBookmarks, []).split(",");

  if (sessionStorage) {
    sessionStorage.userBookmark = tempBook;
  }

  /* let ul = "<ul>";

  tempBook.forEach(bookmarkfn);
  ul += "</ul>";

  document.getElementById("deleteBookmarks").innerHTML = ul;

  function bookmarkfn(value) {
    ul += "<li>" + value + "</li>";
  } */
}

document
  .getElementById("submitCalUser")
  .addEventListener("click", calendarUser);
function calendarUser() {
  let calendarName = document.getElementById("gitCalUser").value;

  if (sessionStorage.getItem("calName" === null)) {
    return undefined;
  } else {
    sessionStorage.calName = calendarName;
  }
  clearForm();
}
