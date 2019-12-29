# Changelog

### Any noteable changes and version notes will be kept in this file.

&nbsp;

## v0.2.7

## Changes

#### Dev articles stale && Responsive Viewer

In this release I am attempting to fix the Dev.to articles from becoming stale. It seems as if the list of articles that shows in the extension is not the latest or the top that they have listed on their site. So I looked at their new API documentation and it seems I can just change the API call to append to at the end and it seems to be working better in testing.

I am also looking at adding some kind of responsive viewing capabilities. This is a very rudimentary implementation thus far. I really just create multiple iframes with different viewport sizes so I can load a URL and see the page and how it looks at different sizes. I have not even changed the user agent yet. Again, this is really more just to get an idea when doing responsive website building.

Also in this release I changes around the buttons on the settings page so they match the design a bit better and are just generally nicer.

&nbsp;

## v0.2.6

## Changes

#### DOMpurify causing an object instead of string

After using the extension on the new Chrome, I tried to add a single bookmark from the Dev Tabs homepage. In doing so I got `[object, Object]` as output instead of the expected string pushed to the end of the bookmarks array. After looking at the [DOMpurify issues](https://github.com/cure53/DOMPurify/issues/361) I realized the sanitized output returns TrustedHTML-Object instead of a string. So I had to convert the sanitized output `toString()` prior to appending it to the array. Now everything works as expected.

&nbsp;

## v0.2.5

## Changes

#### Complete re-write of github-calendar.js

This release is centered around a complete re-write of the github-calendar.js file. I changed from hitting GitHub in general to `https://github.com/users/username/contributions` API and instead of parsing the entire profile and getting just the contribution info this will in turn decrease the downloaded file size and increase loading time for the calendar since it is just the contribution info being loaded. Also this lib had a total rewrite from its maintainer. I also made sure my proxy was coded into the lib so it did not depend on someone elses free tier from App Engine.

&nbsp;

## v0.2.4

## Changes

#### Patched URL Proxy

The URL Proxy I was using to hit GitHub and get commit graph details kept going over its limit and interrupting my service. So I created my own Proxy through Google App Engine and am now hitting that and all is working agian.

&nbsp;

## v0.2.3

## Changes

#### Fixed the [DEV](https://dev.to) box from showing up in the central feed when you switch to another page

After changing the [DEV](https://dev.to) box CSS classes, I realized that if you were to click on another page it would put the box in the main feed. The CSS classes selected as a reference in the DOM were reused on the other page forcing the box into a position it should not have been in. I had to be even more specific and add in more of the classes to have more specificity.

&nbsp;

## v0.2.2

### Changes

#### Fixed Twitter portion of extension after Twitter's UI update

Changed all CSS classes

- Adjusted all function calls
- Changed all class names to match Twitter's new ones
- Changed Template literals so everything will work

_Still some work to be done on styling - Just wanted to at least get it working_

#### Sanitize user input

Needed to sanitize user input for all the bookmarks added.

- DOMPurify lib was added and all input is run through that. Bookmarks entered initially as well as any input from the user for bookmarks entered one at a time from the index page.

Ran autoprefixer on all CSS files

&nbsp;

## v0.2.0

### Changes

#### Added option to change Unit of Measure on Weather Display

Had a request to add in functionality to change the weather information display to Metric

- Added option in the Weather options to toggle between Imperial Units for the US and Metric Units for other countries.

- Now there is a toggle switch before getting weather location. The default is Imperial but you can toggle it to Metric so you can have the Wind Speed displayed in KPH instead of MPH and the Temperature will be in Celsius.

- This selection is stored in 'chrome.storage.local' with all the other options and is just appended onto the end of the API call to Open Weather Map then it will return the info in that unit of measure. Then the browser will check that selection again prior to display and show either MPH of KPH after wind speed.

&nbsp;

## v0.1.8

#### Bookmark options bleeding into Tracking info on bottom of screen on small screens

After looking at the extension loaded on a small laptop I noticed that when the bookmarks options are open, they bleed into the warning about tracking on the bottom of the screen

- Shrunk the margin on Options page to try and keep the Warning about deleting bookmarks from bleeding into the donate portion.

- On smaller screens the warning under Delete Bookmarks was mixed into the paragraph on donating.

- I shrunk the margin as well as shortened the message to warn users about deleting the bookmarks.

\*\* This only effected smaller screens otherwise you would not see any difference

&nbsp;

## v0.1.7

#### Style Updates

- Changed article description and repo description to italic and adjusted size on both. Also increased letter spacing on article desc.

- Added function to clear the input for bookmarks after you hit the save button.

- Bumped padding on the calendar boxes

&nbsp;

## v0.1.6

#### Update CSP | Security

In response to the Mozilla Review I changed a few things for security and got rid of the Content Security Policy

- Took out the Content security policy - did not need

- Updated the GitHub Feed js to make more secure

- Slight cosmetics - increased font size of repo name and added if statement to remind you to add a description if non listed

&nbsp;

## v0.1.5

#### Reduced permissions

Reduced permissions even more

- Took out all the API calls for the extension that I had listed in the permissions.

&nbsp;

## v0.1.4

#### Reduced Permissions

Took out any of the permissions I did not really need

- After launching and then installing on my own machine, I realized in development, I had to many permissions. When I installed the Chrome Store version it asked for a lot of permissions that are not required.

- I dropped the 'management', and 'content settings' permission. This was asking the user for access to everything... Which I do not need. Now I have 'storage', 'unlimited storage', 'favicon', and 'tabs' as this should be all I need for a 'New Tab' Extension. If I find that I do not need any of these I will take them out too.

&nbsp;

## v0.1.3

#### Initial Chrome Release

This will be the first version released to the public

- Fixed a few minor details on this release. Changed button color on the 'add bookmark' button. I shortened the writing to just instructions when you press the icon on the url bar. Few other minor tweeks.

- This will be the version I upload to the Chrome store for the initial public release.

&nbsp;

## v0.1.2 - Pre-Release

#### Updated icon and got rid of error in console

- Updated icons to more suitable ones.
- Got rid of an error in the console from an icon file that could not be read.

&nbsp;

## v0.1.1 - Pre-Release

## Initial Release

- This is the initial pre-release of Dev Tabs Chrome Extension.
