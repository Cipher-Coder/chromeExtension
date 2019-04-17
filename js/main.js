window.onload = function makeBookmark() {
  let myBookmarks = sessionStorage.userBookmark;

  let tempBook = new Array();

  tempBook = myBookmarks.split(",");

  let ul = "<ul>";

  tempBook.forEach(makeBookmark);
  ul += "</ul>";

  document.getElementById("bookmarkList").innerHTML = ul;

  function makeBookmark(value) {
    ul += "<li>" + value + "</li>";
  }
};

new GitHubCalendar(".calendar", "Cipher-Coder", { responsive: true });

if (sessionStorage.userGit === undefined) {
  document.getElementById("github-feeds").style.color = "red";
  document.getElementById("github-feeds").textContent =
    "Please configure Github Username!";
} else {
  GithubFeed.init({
    username: sessionStorage.userGit,
    container: "#github-feeds",
    count: 10,
    order: "desc",
    onComplete: function() {
      console.log("Feed Loaded");
    }
  });
}
console.log(sessionStorage);

// Start of Clock and Calendar

let tday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let tmonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function GetClock() {
  let d = new Date();
  let nday = d.getDay(),
    nmonth = d.getMonth(),
    ndate = d.getDate(),
    nyear = d.getFullYear();
  let nhour = d.getHours(),
    nmin = d.getMinutes(),
    nsec = d.getSeconds(),
    ap;

  if (nhour == 0) {
    ap = " AM";
    nhour = 12;
  } else if (nhour < 12) {
    ap = " PM";
  } else if (nhour == 12) {
    ap = " PM";
  } else if (nhour > 12) {
    ap = " PM";
    nhour -= 12;
  }

  if (nmin <= 9) nmin = "0" + nmin;
  if (nsec <= 9) nsec = "0" + nsec;

  let clocktext =
    "" +
    tday[nday] +
    ", " +
    tmonth[nmonth] +
    " " +
    ndate +
    ", " +
    nyear +
    "  " +
    nhour +
    ":" +
    nmin +
    ":" +
    nsec +
    ap +
    "";

  document.getElementById("clock").textContent = clocktext;
}

GetClock();

setInterval(GetClock, 1000);

// Start of Weather Widget

const apiKey = "de86474ef2fa9963ad1c2292b7b89082"; //Please change to your own API key. They are free.
let cityEl = document.getElementById("city");
let currTempEl = document.getElementById("temp");
let humidityEl = document.getElementById("humidity");
let windEl = document.getElementById("wind");
let skyEl = document.getElementById("sky");

let lat = sessionStorage.userLatitude; //Location you want your weather for.
let lon = sessionStorage.userLongitude;

function findWeather() {
  let searchLink =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=imperial"; // Change this to metric or leave as imperial if in the US
  httpRequestAsync(searchLink, theResponse);
}

function theResponse(response) {
  let jsonObject = JSON.parse(response);
  cityEl.textContent = jsonObject.name; // Location
  currTempEl.textContent = parseInt(jsonObject.main.temp) + "° "; //Temperature
  humidityEl.textContent = jsonObject.main.humidity + "%"; // Humidity
  windEl.textContent = jsonObject.wind.speed + "mph "; // Wind Speed
  skyEl.textContent = jsonObject.clouds.all + "%"; // Cloud Cover %
}

function httpRequestAsync(url, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200)
      callback(httpRequest.responseText);
  };
  httpRequest.open("GET", url, true);
  httpRequest.send();
}
findWeather(); //Initiate the function

// Dev.to Feed

const app = document.getElementById("devStart");

const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(container);

let request = new XMLHttpRequest();
request.open("GET", "https://dev.to/api/articles", true);
request.send();
request.onload = function() {
  let data = JSON.parse(this.response);
  if (request.status != 200) {
    console.log("Error", request.statusText);
  } else {
    data.forEach(article => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      const a = document.createElement("a");
      a.href = article.url;
      a.textContent = article.title;
      const p = document.createElement("p");
      article.description = article.description.substring(0, 300);
      p.textContent = `${article.description}...`;
      const img = document.createElement("img");
      img.src = article.cover_image;

      container.appendChild(card);
      card.appendChild(a);
      card.appendChild(p);
      card.appendChild(img);
    });
  }
};
request.onerror = function() {
  console.log("request failed");
};

let bookmarkURL = sessionStorage.getItem("bookmarkURL");
let bookmarkName = sessionStorage.getItem("bookmarkName");
