# Analyse

A analyse for the minor subject Browser Technologies.

# Table of Content

- [](#mouse/trackpad)
- [](#javascript)
- [](#problems)
- [](#fixes)
- [](#)
- [](#)

## The points

- cookies
- network
- font
- javascript
- images
- color
- local storage
- Mouse/Trackpad

### Cookies

Small files? living in the browser which you can send to the server instead of using localstorage.
(Safer than LocalStorage?)
Turning it off may block you off certain sites.

### Mouse/Trackpad

If there is no access or less dexterity. One has to be able to navigate using other means e.g. the keyboard, screenreaders.

The tab navigation works completely, however the targets/links are not descriptive enough when navigation with a screenreader.

**Fix:** I have added `title` attributes to `<a>` and `<button>` tags. This attribute gives more context for users of screenreaders as the title will also be read.


### Javascript
Javascript, a scripting language usually used on the web (in webbrowsers) to apply interaction.

The application is a assignment of the course Wafs from the minor everyone web. The goal was to make a SPA using client-side javascript only, so it is not possible to fix this issue yet.

**Fix:** A fix for this is to render the application server-side




### Images
More and more images are used on the web.
They take a lot of (unnecessary data) and may or may not be necessary for context.



### Local Storage
An in browser storage, named `Local Storage`. In here data can be stored and saved.

I am using `Local Storage` to save the data for a certain period of time.

### Color
Color usage is usually about color contrast. It is important to keep accessibility for color impaired in mind.

Apart from the loaded in images, the color palette is really simple and does not affect accessibility for the visually impaired (Does for the blind though)

Tested using the mac application `sim daltonism`

**Fix:** No fix is needed

### Network
Network connection (speed) may vary case per case. Some are flakey, some are slow and some are lightning quick.

The api is not the quickest, but after the first call the first fetch data will be saved (in localstorage) which will save data and prevent extra data usage. (can also use cache). The problem of using localstorage/cache is that they will not refresh at every update, which is a problem with versatile data.

The images also are fetched through a cdn, but is not necessary as the cards are still distinguishable even without images. (They do give a lot of context thought)

**Fix:** Use cache (with a limited expiration header)

### Font
A google font is used but the fall-back `sans-serif` does not differ too much. Downloading and caching the font may be the best option to save data and speed up the network. Subsetting it may also help. No font icons are used so that is not an issue.

**Fix:** Cache the font

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


