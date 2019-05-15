# Dev Tabs

## Chrome Extension for Developers - Replaces your NewTab and Homepage in Chrome

### Github Feed

The [Github](https://www.github.com) feed on the right hand side of the page lists the first 10 repo's in your profile. This makes it easy to quickly access a good portion of your repos.

I used a library called [GithubFeed](https://github.com/samwx/GithubFeed), from 'samwx' to implement this. The lib is very well documented however, I did have to alter the code slightly as well as the CSS so it matched the Dev Tabs page.

Once you open the extension for the first time, click the settings cog in the middle of the page. The first setting is the 'Github Feed'. If you just put your Github Username in the input and save it, when you go back to the main page it will automatically load your Feed on the right hand side of the screen.

Once you save your username, it gets put into local storage and accessed from there. I debated on putting it into the chrome.sync.storage so that it gets sync'd across all instances of chrome, but ultimately decided to stick with local as it is not really hard to type it in. I also know that I have multiple Github accounts and may want to have one show up for my normal chrome instance and another username for my [Google Chrome Canary](https://www.google.com/chrome/canary/) instance. Just keep this in mind if you ever clear your local storage, you will have to input your usernames again. It is the same for the calendar. In fact all the storage in this extension is stored in local storage.

### Github Calendar

The [Github](https://www.github.com) calendar is integrated with a library from IonicaBizau. The library is [github-calendar.js](https://github.com/IonicaBizau/github-calendar), and can display your github contribution calendar. Very well explained lib, and is responsive. I changed the original styles that came with it to match the basic styles of the Dev Tabs page.

When you first start the extension, look under the weather info at the center of the page and click on the settings cog. On the settings page just click on the 'Github Calendar' selection on the left and fill in your github username. No quotes or anything and click save.

Again, this username is stored in chrome.storage.local. So if you clear your browser, you will have to input it again. This may change in the future. I may ultimately decide to put it in chrome.storage.sync, but for now, this is how it is.

### Time and Date

The time and date is pretty self explanatory. Just a clock with the date. I made it stand out with the color and I was going for a slight glow to it, so when I glance at it, it's easy to see.

### Dev.to

This is hooked up to the [dev.to](https://dev.to) API. It gets the articles from their website and creates a card for each individual article. Once the card is created, it gets appended to the div and the content gets appended to that. I had a bit of trouble getting chrome to not show the broken link image when there was not a url included for the articles image, but I beleve I have it figured out now. In the future, I may add a setting to display your individual feed. But for now, it is just the general article feed.

### Weather

This is just to display your current weather conditions. As I explained in the settings, I set it up to display your local weather. If you go to the settings and click the button to locate yourself, it will hit the HTML geolocation API. Once that is hit, it will take your coordinates, store that value in local storage. Then when you flip back to the main page it will take the coordinates from local storage, and hit the [Open Weather Map API](https://openweathermap.org/api) and display your weather conditions. That is all it does with that info. With that being said, this does not continually track you. It will store those coordinates until you go back to the settings page and hit the button again. So if you move to a different locale and want that weather, you will have to go back to the settings and just hit the button again.

## Location and Tracking

It was important to me that this extension not have any kind of tracking, storing of personal identifiable information, or serve any ads. This page is the first tab you see when you open your browser. It is the tab you will see every time you open a new tab. One of the motivations for making this extension was that I could not find any other new tab page, that I liked, that suited my needs as a new developer, and did not have any ads, or tracked me. I even left off Google analytics. There is nothing in the code that will track you. It is open source. You are welcome to check the code and change it any way you would like, the license is attached.
