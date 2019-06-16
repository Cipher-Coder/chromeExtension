# Changelog

### Any noteable changes and version notes will be kept in this file.

&nbsp;

## v0.2.1

### Changes

#### Sanitize user input

Needed to sanitize user input for all the bookmarks added.

- DOMPurify lib was added and all input is run through that.

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
