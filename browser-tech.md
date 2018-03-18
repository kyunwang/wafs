# Analyse

A analyse for the minor subject Browser Technologies.

# Table of Content

- [Mouse/Trackpad](#mouse/trackpad)
- [Audit](#audit)
- [Color](#color)
- [Images](#images)
- [Local Storage](#local-storage)
- [Network](#network)
- [Fonts](#fonts)


- [Cookies](#cookies)
- [Javascript](#javascript)
- [](#)
- [](#)
- [Device Lab](#device-lab)

## The points

- cookies
- network
- font
- javascript
- local storage

- Mouse/Trackpad
- Audit
- Color
- Images


## Process

### Mouse/Trackpad
I started the research by checking accessibility for the visualy impaired. By using the `tab` key to navigate with the `VoiceOver` function from Mac. These problems came out from the test:

**Problems**
1. The context will be lost whenever you focus on a `button` and/or `a` tags.
2. There is a button containing a link. This causes the focus to go from button to the link which is unecessary.

**Solutions**
1. For more context `title` attributes have been added to `button` and `a` tags for more clarity.
2. The wrapping button needs to be removed.


*Note*
The images do not contain a `alt=""` attribute as it contains a `h3` tag.

### Audit

After checking the screenreader accessibility, I did a Google Light House audit for accessibility. The following came out of it.

**Audit before changes**
![][b-access1]
<!-- ![][b-access2] -->

**Problems**
A score of 77 out of 100 has been given for accessibility.
1. The input does not have a `label` associated with it
2. The contrast of few elements are not high enough.

**Solutions**
1. A label has to be added for the element
2. The contrast has been increased with one exception, the *Library* button, because the constrast between the white label and white background is not high enough...... Well sherlock

*The nav with the button*

![The nav with the button][nav]

*Audit after the changes*

![Audit after the changes][access]

### Color
To be able to test for people with color impairments I will be using the Mac program called `Sim Daltonism`.

This progmra simulates how people with the following impairements see color:

**Red-Green**
- Deuteranopia (no green cones)
- Deuteranomaly (anomalous green cones)
- Protanopia (no red cones)
- Protanomaly (anomalous red cones)

**Blue-Yellow**
- Tritanopia (no blue cones)
- Tritanomaly (anomalous blue cones)

**All colors**
- Monochromacy
- Partial monochromacy

**Deuteranomaly**
![][c-deuteranomaly]

**Deuteranompia**
![][c-deuteranompia]

**Protanopia**
![][c-protanopia]

**Protanomaly**
![][c-protanomaly]

**Tritanopia**
![][c-tritanopia]

**Tritanomaly**
![][c-tritanomaly]

**Monochromacy**
![][c-monochromacy]

**Partial Monochromacy**
![][c-partialMono]


**Problems**
1. The images may have low contrast

**Solution**
1. None as this depends on the api

Except for the images the contrast is a big problem.


### Images
The application uses a lot of images as it is about anime(Japanese Animation) and manga(Japanese Comics).

Not serving the images is not an option, but there are a few simple fixes to combat data-usage.

**Problem**
1. A lot of images are called from the API taking lots of data
2. Nothing shows up when Images are disabled or not fetched correctly
3. Images are fetches from an CDN

**Solutions**

1. Fetching the images server-side
	1. Compressing the images server-side before serving them
	2. Caching the images
2. Added a minimum height.
3. Caching the images can help save data and eventually when the CDN is down
4. Maybe use svg (masks) to decrease image size
	- Source: [*SVG can do that?! - talk by Sarah Drasner*](https://www.youtube.com/watch?v=4laPOtTRteI)
	- [jpng.svg](https://codepen.io/shshaw/full/LVKEdv)

**Before when images are blocked or not fetched**
![][i-noImg]

**After**
![][i-img]


### Local Storage
I am using `Local Storage` to save the data for a certain period of time to save data usage. Doing this allows offline usage too (well under the condition that there was connection at time of entering the app)

**Problems**
1. No expire date can be set like cache
2. Local storage is not supported in many older phones
3. It is **NOT** secure
	- [Source](https://www.rdegges.com/2018/please-stop-using-local-storage/)

**Solutions**
1. Use cache instead
2. Choose another alternative (cache or cookies)
3. Again use something else like cache or cookies

Cookies have a limit of 4kb max so that not an option if the data is large. Local storage has a max limit of 5MB across major browsers.

Local storage can be used for saving public data, but **NOT** sensitive data.


### Network
The network equal performance in my opinion, thus I checked the performance with Google Light House again.


**Test result**
![][b-perf]


**Problems**
1. The first meaningfull paint takes a pretty long
2. There are render-blocking `link` tags (stylesheets)
3. CSS is nog minified and there are unused CSS rules
4. Text is not compressed (gzipped)

**Solutions**
1. Use Critical CSS, Async font loading and assets loading for example.
2. Load the css async
3. Minify and clean the Css before bundling the production package
4. Compress the assets before serving (server-side)


### Fonts
A google font called `Work Sans` is used for this application.

**Problems**
1. Slows down the site loading
2. Makes a extra call for the font (render-blocking)

**Solution**
1. Cache the font
2. Subset the font to save data
3. Load the font in asynchronously






[nav]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/nav.png

[b-access1]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/access1.png
[b-access2]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/access2.png
[b-perf]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/perf.png
[b-pwa1]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/pwa1.png
[b-pwa2]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/pwa2.png

[a-access]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/after/access.png

[c-deuteranomaly]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/deuteranomaly.png
[c-deuteranompia]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/deuteranompia.png
[c-protanopia]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/protanopia.png
[c-protanomaly]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/protanomaly.png
[c-tritanopia]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/tritanopia.png
[c-tritanomaly]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/tritanomaly.png
[c-monochromacy]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/monochromacy.png
[c-partialMono]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/color/partialMono.png


[i-noImg]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/image/noShow.png
[i-img]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/image/shown.png
[]:
[]:
[]: