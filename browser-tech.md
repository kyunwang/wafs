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
- local storage

- Mouse/Trackpad
- Audit
- Color


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




<!-- ![][b-perf] -->
<!-- ![][b-pwa1] -->
<!-- ![][b-pwa2] -->



[nav]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/nav.png

[b-access1]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/access1.png
[b-access2]: https://github.com/kyunwang/web-app-from-scratch/blob/browser-tech/images/audit/before/access2.png
[b-perf]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/audit/before/perf.png
[b-pwa1]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/audit/before/pwa1.png
[b-pwa2]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/audit/before/pwa2.png

[a-access]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/audit/after/access.png

[c-deuteranomaly]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/deuteranomaly.png
[c-deuteranompia]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/deuteranompia.png
[c-protanopia]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/protanopia.png
[c-protanomaly]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/protanomaly.png
[c-tritanopia]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/tritanopia.png
[c-tritanomaly]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/tritanomaly.png
[c-monochromacy]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/monochromacy.png
[c-partialMono]: https://github.com/kyunwang/web-app-from-scratch/tree/browser-tech/images/color/partialMono.png
[]: