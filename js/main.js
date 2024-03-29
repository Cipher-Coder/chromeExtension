window.onload = function makeBookmark() {
  //Get user input bookmarks from local storage
  chrome.storage.local.get(['userBookmark'], function (result) {
    let myBookmarks = result.userBookmark

    if (myBookmarks === undefined) {
      // Error Message
      let bookmarkStart = document.getElementById('bookmarkList')
      bookmarkStart.setAttribute('style', 'color: red; cursor: pointer;')
      bookmarkStart.textContent = 'Click to configure Bookmarks in Settings'
      bookmarkStart.addEventListener('click', () => {
        chrome.runtime.openOptionsPage()
      })
    } else {
      let ul = "<ul id='bmList'>"

      myBookmarks.forEach(makeBookmark)
      ul += '</ul>'

      let bkmk = document.getElementById('bookmarkList')

      bkmk.innerHTML = ul

      function makeBookmark(value) {
        ul += "<li class='userMark'>" + value + '</li>'
      }
    }
  })
}

// Get username for calendar

chrome.storage.local.get(['gitCalName'], function (result) {
  if (result.gitCalName === undefined) {
    //Error Message Block
    let calStart = document.getElementById('calendar-start')
    calStart.setAttribute(
      'style',
      'color: red; font-size: 1.25rem; cursor: pointer;'
    )
    calStart.textContent = 'Click here to configure your username!'
    calStart.addEventListener('click', () => {
      chrome.runtime.openOptionsPage()
    })
  } else {
    // Info to initiate the github calendar - pulled into the github-calendar.js
    let calendarName = result.gitCalName
    new GitHubCalendar('.calendar', calendarName, { responsive: true })
  }
})

// Get and set username for github feeds
chrome.storage.local.get(['userGit'], function (result) {
  if (result.userGit === undefined) {
    let feedUnknown = document.getElementById('github-feeds')
    feedUnknown.setAttribute(
      'style',
      'color: red; font-size: 1.15rem; cursor: pointer;'
    )
    feedUnknown.textContent = 'Click here configure Github Username!'
    feedUnknown.addEventListener('click', () => {
      chrome.runtime.openOptionsPage()
    })
  } else {
    // Initiate the Feed - This is pulled  into the githubFeed.js file
    GithubFeed.init({
      username: result.userGit,
      container: '#github-feeds',
      count: 10,
      order: 'desc',
      onComplete: function () {
        console.log('Feed Loaded')
      },
    })
  }
})

// Start of Clock and Calendar

function GetClock() {
  let tday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let tmonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  let d = new Date()
  let nday = d.getDay(),
    nmonth = d.getMonth(),
    ndate = d.getDate(),
    nyear = d.getFullYear()
  let nhour = d.getHours(),
    nmin = d.getMinutes(),
    nsec = d.getSeconds(),
    ap

  if (nhour === 0) {
    ap = ' AM'
    nhour = 12
  } else if (nhour < 12) {
    ap = ' AM'
  } else if (nhour === 12) {
    ap = ' PM'
  } else if (nhour > 12) {
    ap = ' PM'
    nhour -= 12
  }

  if (nmin <= 9) nmin = '0' + nmin
  if (nsec <= 9) nsec = '0' + nsec

  let dateText =
    '' + tday[nday] + ', ' + tmonth[nmonth] + ' ' + ndate + ', ' + nyear + ' '
  let clockText = nhour + ':' + nmin + ':' + nsec + ap + ''
  let clockDate = document.getElementById('date')
  let clockTime = document.getElementById('clock')
  clockDate.textContent = dateText
  clockTime.textContent = clockText
}

GetClock()

setInterval(GetClock, 1000)

// Start of Weather Widget

const apiKey = 'de86474ef2fa9963ad1c2292b7b89082' //API key.
let cityEl = document.getElementById('city')
let currTempEl = document.getElementById('temp')
let humidityEl = document.getElementById('humidity')
let windEl = document.getElementById('wind')
let skyEl = document.getElementById('sky')

chrome.storage.local.get(
  ['userLat', 'userLong', 'unitOfMeasure'],
  function (result) {
    // Pull from chrome local storage
    let lat = result.userLat
    let lon = result.userLong
    let unit = result.unitOfMeasure

    /**
     *
     * @type {object} response
     * @property {object} main
     * @property {number} temp
     * @property {number} humidity
     * @property {number} wind
     * @property {number} clouds
     * @property {string} name
     *
     */

    function findWeather() {
      let searchLink =
        'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        lon +
        '&appid=' +
        apiKey +
        '&units=' +
        unit
      httpRequestAsync(searchLink, theResponse)
    }

    function theResponse(response) {
      let jsonObject = JSON.parse(response)
      cityEl.textContent = jsonObject.name // Location
      currTempEl.textContent = parseInt(jsonObject.main.temp) + '° ' //Temperature
      humidityEl.textContent = jsonObject.main.humidity + '%' // Humidity
      let windSpeed = 'mph'

      if (unit === 'metric') {
        windSpeed = 'kph'
      }
      windEl.textContent = jsonObject.wind.speed + windSpeed + ' ' // Wind Speed
      skyEl.textContent = jsonObject.clouds.all + '%' // Cloud Cover %
    }

    function httpRequestAsync(url, callback) {
      let httpRequest = new XMLHttpRequest()
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200)
          callback(httpRequest.responseText)
      }
      httpRequest.open('GET', url, true)
      httpRequest.send()
    }
    findWeather() //Initiate the function
  }
)

// Dev.to Feed

const app = document.getElementById('devStart')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

/**
 *
 * @type {XMLHttpRequest}
 * @type {object} article
 * @property {object} article.user
 * @property {string} article.cover_image
 * @property {string} article.user.twitter_username
 * @property {string} article.description
 * @property {string} article.user.name
 * @property {string} article.user.username
 */

let request = new XMLHttpRequest()
let d = new Date()
request.open('GET', 'https://dev.to/api/articles/latest?per_page=20', true)
request.send()
request.onload = function () {
  let data = JSON.parse(this.response)
  if (request.status !== 200) {
    console.log('Error', request.statusText)
  } else {
    data.forEach((article) => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')
      const a = document.createElement('a')
      a.href = article.url
      a.textContent = article.title
      const p = document.createElement('p')
      p.setAttribute(
        'style',
        'font-style: italic; letter-spacing: 0.07em; font-size: 0.75em;'
      )
      article.description = article.description.substring(0, 300)
      p.textContent = `${article.description}...`
      const img = document.createElement('img')
      if (article.cover_image !== null) {
        img.src = article.cover_image
        img.alt = 'Article Cover Image'
      } else {
        img.onerror = function () {
          this.style.display = 'none'
        }
      }

      const aTwitter = document.createElement('a')
      let byLine
      if (article.user.twitter_username == null) {
        byLine = article.user.name
        aTwitter.className = 'card-byline'
        aTwitter.href = 'https://dev.to/' + article.user.username
        aTwitter.textContent = 'By: ' + byLine
      } else {
        byLine = article.user.twitter_username
        aTwitter.className = 'card-byline'
        aTwitter.href = 'https://twitter.com/' + byLine
        aTwitter.textContent = 'By: @' + byLine
      }

      container.appendChild(card) //Create card
      card.appendChild(img) // Add Image to card
      card.appendChild(a) // Add link
      card.appendChild(p) // Add description
      card.appendChild(aTwitter) // Add By line
    })
  }
}
request.onerror = function () {
  console.log('request failed')
}

document.getElementById('addIcon').addEventListener('click', showInput)
function showInput() {
  let input1 = document.getElementById('urlName')
  let input2 = document.getElementById('siteUrl')
  let addButton = document.getElementById('addItem')
  let label1 = document.getElementById('siteLabel')
  let label2 = document.getElementById('urlLabel')
  if (input1.style.display === 'none') {
    input1.style.display = 'inline-block'
    input2.style.display = 'inline-block'
    addButton.style.display = 'inline-block'
    label1.style.display = 'inline-block'
    label2.style.display = 'inline-block'
    document.getElementById('addIcon').innerText = '-'
  } else {
    input1.style.display = 'none'
    input2.style.display = 'none'
    addButton.style.display = 'none'
    label1.style.display = 'none'
    label2.style.display = 'none'
    document.getElementById('addIcon').innerText = '+'
  }
}

document.getElementById('addItem').addEventListener('click', addEntry)
function addEntry() {
  chrome.storage.local.get('userBookmark', function (result) {
    let existingEntries = result.userBookmark
    if (existingEntries == null) existingEntries = []
    let urlName = document.getElementById('urlName').value
    let url = document.getElementById('siteUrl').value
    let entry = "<a href='" + url + "'>" + urlName + '</a>'
    let cleanEntry = DOMPurify.sanitize(entry).toString()
    existingEntries.push(cleanEntry)
    chrome.storage.local.set({ userBookmark: existingEntries }, function () {
      console.log('New Entry Saved')

      clearInput()
    })
  })
}

function clearInput() {
  document.getElementById('urlName').value = ''
  document.getElementById('siteUrl').value = ''
  document.location.forceReload(true)
}
