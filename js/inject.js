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

var intervalId = setInterval(function() {
  if (links) {
    insertLinks(links);
  }
}, 50);

function insertLinks(data) {
  var trendsBox = document.getElementsByClassName(
    "css-1dbjc4n r-1niwhzg r-ku1wi2"
  )[0];
  if (!trendsBox) return;
  var newItem = document.createElement("DIV");
  newItem.className =
    "css-1dbjc4n r-1uaug3w r-1uhd6vh r-t23y2h r-1phboty r-rs99b7 r-ku1wi2 r-1udh08x";
  newItem.innerHTML = trendsHTML(listHTML(data));
  insertAfter(newItem, trendsBox);
  clearInterval(intervalId);
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
    '<li class="r-qkLmgi r-rull8r r-1ila09b r-1sp51qo r-rs99b7">\
					<a target="_blank" class="r-111h2gw" style="text-decoration: none; color: #fff;" href="' +
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
    '<div class="css-1dbjc4n trend-mod">\
					<div class="trends-inner"><div class="r-1qd0xha trends-container context-trends-container">\
				  <div class="flex-module-header">\
				  <h3><span class="css-1dbjc4n r-1ila09b r-rull8r r-qklmqi r-1wtj0ep r-1sp51qo" style="color: #fff; font-size: 1.5rem; font-weight: 800;">dev.to</span></h3>\
				  </div>\
				  <div class="flex-module-inner">\
					<ul class="css-1dbjc4n r-1qd0xha" style="list-style-type: none;" id="dev-to-trends">\
					' +
    listItems +
    "</ul></div></div></div>"
  );
}
