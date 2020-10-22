const GIT_FEED = document.getElementById('github-feed');
const BOOKMARK_OPT = document.getElementById('bookmark-option');
const GITHUB_CAL = document.getElementById('github-cal');
const WEATHER_OPT = document.getElementById('weatherOpt');

const GITHUB_FEED = document.getElementById('git-feed');
const BOOKMARK_DISPLAY = document.getElementById('bookmark-opt');
const CALENDAR_DISPLAY = document.getElementById('githubCal');
const WEATHER_DISPLAY = document.getElementById('weatherInfo');

GITHUB_FEED.addEventListener('click', feedDisplay);
function feedDisplay() {
  if (GIT_FEED.style.display === 'none') {
    GIT_FEED.style.display = 'block';
    BOOKMARK_OPT.style.display = 'none';
    GITHUB_CAL.style.display = 'none';
    WEATHER_OPT.style.display = 'none';
  } else {
    GIT_FEED.style.display = 'none';
  }
}
// Toggle settings being shown
BOOKMARK_DISPLAY.addEventListener('click', bookmarkDisplay);
function bookmarkDisplay() {
  if (BOOKMARK_OPT.style.display === 'none') {
    BOOKMARK_OPT.style.display = 'block';
    GITHUB_CAL.style.display = 'none';
    GIT_FEED.style.display = 'none';
    WEATHER_OPT.style.display = 'none';
  } else {
    BOOKMARK_OPT.style.display = 'none';
  }
}
// Toggle settings being shown
CALENDAR_DISPLAY.addEventListener('click', calendarDisplay);
function calendarDisplay() {
  if (GITHUB_CAL.style.display === 'none') {
    GITHUB_CAL.style.display = 'block';
    BOOKMARK_OPT.style.display = 'none';
    GIT_FEED.style.display = 'none';
    WEATHER_OPT.style.display = 'none';
  } else {
    GITHUB_CAL.style.display = 'none';
  }
}
// Toggle settings being shown
WEATHER_DISPLAY.addEventListener('click', weatherDisplay);
function weatherDisplay() {
  if (WEATHER_OPT.style.display === 'none') {
    WEATHER_OPT.style.display = 'block';
    GITHUB_CAL.style.display = 'none';
    BOOKMARK_OPT.style.display = 'none';
    GIT_FEED.style.display = 'none';
  } else {
    WEATHER_OPT.style.display = 'none';
  }
}
// Get location for weather

document.getElementById('submitWeather').addEventListener('click', () => {
  weatherLocation();
  getUnitOfMeasure();
});

function weatherLocation() {
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    const crd = pos.coords;
    // Set location in local storage
    chrome.storage.local.set(
      { userLat: crd.latitude, userLong: crd.longitude },
      function () {
        console.log('Location Saved!');
      }
    );
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

function getUnitOfMeasure() {
  let isChecked = document.getElementById('myonoffswitch').checked;
  if (isChecked === false) {
    isChecked = 'metric';
  } else {
    isChecked = 'imperial';
  }
  chrome.storage.local.set({ unitOfMeasure: isChecked }, () => {
    console.log('Unit of Measure: ' + isChecked);
  });
}

// Get Github username for feed

document
  .getElementById('submitgituser')
  .addEventListener('click', submitGitUser);
function submitGitUser() {
  let user1 = document.getElementById('gitUser').value;

  if (!user1) {
    console.log('Please submit Github Username!');
    return;
  }
  chrome.storage.local.set({ userGit: user1 }, function () {
    console.log('Setting Saved');
  });
  clearForm();
}

function clearForm() {
  document.getElementById('gitUser').value = '';
  document.getElementById('gitCalUser').value = '';
}

// Get user defined bookmarks

document
  .getElementById('submitbookmark')
  .addEventListener('click', saveBookmarks);
function saveBookmarks() {
  let userBookmarks = [];
  userBookmarks = document.getElementById('bookmarkForm').value;

  let mytempBook = DOMPurify.sanitize(userBookmarks);

  let tempBook = marked.inlineLexer(mytempBook, []).split(',');

  chrome.storage.local.set({ userBookmark: tempBook }, function () {
    console.log('Bookmarks Logged');
  });
  clearInput();
}

function clearInput() {
  document.getElementById('bookmarkForm').value = '';
}
// Set Github calendar username

document.getElementById('submitCalUser').addEventListener('click', function () {
  let calendarName = document.getElementById('gitCalUser').value;
  if (!calendarName) {
    console.log('Please input username');
    return;
  }
  chrome.storage.local.set({ gitCalName: calendarName }, function () {
    console.log('Setting Saved');
  });
  clearForm();
});

document
  .getElementById('deleteBookmark')
  .addEventListener('click', function () {
    let confirmationCheck = confirm(
      'Are you sure you want to delete your Dev Tab Bookmarks. (This will not effect your browser bookmarks)'
    );
    if (confirmationCheck === true) {
      chrome.storage.local.remove('userBookmark', function () {
        alert('Bookmarks Deleted!');
      });
    } else {
      alert('Action Cancelled');
    }
  });

document.getElementById('backHome').addEventListener('click', function () {
  window.history.back();
});
