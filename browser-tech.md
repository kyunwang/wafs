# Analyse

A analyse for the minor subject Browser Technologies.

# Table of Content

- [Mouse/Trackpad](#mouse/trackpad)
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


## Process

I started the research by checking accessibility for the visualy impaired. By using the `tab` key to navigate with the `VoiceOver` function from Mac. These problems came out from the test:

**Problems**
1. The context will be lost whenever you focus on a `button` and/or `a` tags.
2. There is a button containing a link. This causes the focus to go from button to the link which is unecessary.

**Solutions**
1. For more context `title` attributes have been added to `button` and `a` tags for more clarity.
2. The wrapping button needs to be removed.


*Note*
The images do not contain a `alt=""` attribute as it contains a `h3` tag.

