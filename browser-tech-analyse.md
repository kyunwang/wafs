# Analyse

A analyse for the minor subject Browser Technologies.

## The points

- cookies
- network
- font
- javascript
- images
- color
- local storage
- Mouse/Trackpad


### Mouse/Trackpad

If there is no access or less dexterity. Tested by using the tab navigation.

### Javascript

What happens if javascript is disabled?


## Problems

Lighthouse accessibility score: 77

Lighthouse audit:
- There is no label for the textinput
- Color contrast is satisfactory - four elements fail
- There is no service worker present for offline usage / bad network

The other found problems:
- Pressing `enter` in the search button does not execute the search function.
- There is no skip to mian content (There is no main content if none is loaded)
- Does not work without javascript (It is a Small PWA which is dependant on Javascript)
- The context of buttons and a tags are not clear when spoken by screen readers.
- The maximum items are fetched from the api (limit 40)
- 'Nothing' shows up when images are disabled

Not sure wether it is necessary to add alt text to the images.

## Fixes

What has been done:
- Adding titles to buttons and a tags for clarity for screen readers.
- Reducing the fetched limit for users to decrease the initial image loading. (decreases ~800kb)
- Added a minimum height to display the images, albeit empty.
- Upped the contrast to pass the lighthouse audit
- Pressing the `enter` key now searches/ initiates the search function

Want to fix:

- Make the calls server side to be able to enable compress fetched images to decrease the load time.
- Fetch the data server side to be able to render all the items when javascript is disabled


