var links = null;

fetch("https://dev.to/api/articles")
  .then(function(response) {
    response.json().then(function(data) {
      links = data;
      insertLinks(data);
    });
  })
  .catch(function(err) {
    console.log(err);
  });

setInterval(function() {
  if (links) {
    insertLinks(links);
  }
}, 50);

function insertLinks(data) {
  var trendsBox = document.getElementsByClassName("r-rs99b7 r-15d164r")[0];
  var devBox = document.getElementById("dev-to-trends");
  if (!trendsBox || devBox) return;
  var newItem = document.createElement("DIV");
  newItem.innerHTML = trendsHTML(listHTML(data));
  insertAfter(newItem, trendsBox);
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function twitterLink(item) {
  if (!item.user.twitter_username) return "";
  return (
    '&nbsp; (<a style="display:inline;color:rgba(29, 161, 242, .8);" href="https://twitter.com/' +
    item.user.twitter_username +
    '">@' +
    item.user.twitter_username +
    "</a>)"
  );
}

function listHTML(data) {
  return data
    .slice(0, 11)
    .map(function(item) {
      return linkItemHTML(item);
    })
    .join("");
}

function linkItemHTML(item) {
  return (
    '<li class="r-qkLmgi r-rull8r r-1ila09b r-1sp51qo">\
					<a target="_blank" class="r-111h2gw" href="' +
    item.url +
    '">\
					<span class="css-16my406" dir="ltr">' +
    item.title +
    '</span>\
					</a>\
					<div class="trend-item"></div>\
					<div class="trend-item-stat" style="color: rgba(29, 161, 242, 1)">\
						' +
    item.user.name +
    twitterLink(item) +
    "\
					</div>\
					</li>"
  );
}

function trendsHTML(listItems) {
  return (
    '<div class="css-1dbjc4n r-1uaug3w r-1uhd6vh r-t23y2h r-1phboty r-rs99b7 r-15d164r r-1udh08x trend-mod">\
					<div class="trends-inner"><div class="flex-module trends-container context-trends-container">\
				  <div class="flex-module-header">\
				  <h3><span class="css-1dbjc4n r-1ila09b r-rull8r r-qklmqi r-1wtj0ep r-1sp51qo" style="color: #fff; font-size: 1.5rem; font-weight: 800;">dev.to</span></h3>\
				  </div>\
				  <div class="flex-module-inner">\
					<ul class="css-1dbjc4n" style="list-style-type: none;" id="dev-to-trends">\
					' +
    listItems +
    "</ul></div></div></div>"
  );
}
