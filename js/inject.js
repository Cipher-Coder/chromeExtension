let links = null

fetch('https://dev.to/api/articles')
  .then(function (response) {
    response.json().then(function (data) {
      links = data
      insertLinks(data)
    })
  })
  .catch(function (err) {
    console.log(err)
  })

let intervalId = setInterval(function () {
  if (links) {
    insertLinks(links)
  }
}, 50)

function insertLinks(data) {
  let trendsBox = document.getElementsByClassName(
    'css-1dbjc4n r-1ysxnx4 r-k0dy70 r-1867qdf r-1phboty r-rs99b7 r-1ifxtd0 r-1udh08x'
  )[0]
  if (!trendsBox) return
  let devBox = document.getElementById('dev-to-trends')
  if (!trendsBox || devBox) return
  let newItem = document.createElement('DIV')
  newItem.className =
    'css-1dbjc4n r-1ysxnx4 r-k0dy70 r-1867qdf r-1phboty r-rs99b7 r-1ifxtd0 r-1udh08x'
  newItem.innerHTML = trendsHTML(listHTML(data))
  insertAfter(newItem, trendsBox)
  clearInterval(intervalId)
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

function twitterLink(item) {
  if (!item.user.twitter_username) return ''
  return `<a style="display:inline;color:rgba(29, 161, 242, .8);" href="https://twitter.com/${item.user.twitter_username}">@${item.user.twitter_username}</a>`
}

function listHTML(data) {
  return data
    .slice(0, 11)
    .map(function (item) {
      return linkItemHTML(item)
    })
    .join('')
}

function linkItemHTML(item) {
  return `<li class="css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l  r-1f1sjgu r-ymttw5">
					<a target="_blank" class="r-111h2gw" style="text-decoration: none; color: #fff;" href="${
            item.url
          }">
					<span class="css-901oao r-1fmj7o5 r-1qd0xha r-a023e6 r-b88u0q r-rjixqe r-hrzydr r-bcqeeo" dir="ltr">${
            item.title
          }</span>
					</a>
					<div class="trend-item"></div>
					<div class="css-901oao" style="color: rgba(29, 161, 242, 1)">${
            item.user.name
          }\u00A0${twitterLink(item)}</div>
					</li>`
}

function trendsHTML(listItems) {
  return `<div class="css-1dbjc4n trend-mod">
					<div class="css-1dbjc4n trends-inner">
          <div class="r-1dbjc4n">
				  <div class="css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l flex-module-header">
				  <div class="css-1dbjc4n r-1wtj0ep r-ymttw5 r-1f1sjgu">
          <h2 class="css-4rbku5 css-1dbjc4n r-18u37iz"  style="color: #fff; font-size: 1.5rem; font-weight: 800;">dev.to</h2>
          </div>
				  </div>
				  <div class="flex-module-inner">
					<ul class="list-item css-1dbjc4n" style="list-style-type: none;" id="dev-to-trends">${listItems}</ul>
					</div></div></div>`
}
