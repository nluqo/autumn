Autumn
======
Autumn generates deterministic colors. It's great for coloring tags, navigation, and icons.

### Using Autumn

Include jQuery, [HUSL](http://boronine.com/husl/) (optional, but recommended), and Autumn.
```javascript
<script src="https://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="https://rawgithub.com/boronine/husl/v2.0.0/husl.min.js"></script>
<script src="autumn.js"></script>
```
Then color as many elements as you want with a single line:
```javascript
$("div").autumn();
```
[Demo](https://rawgithub.com/nluqo/autumn/master/simpledemo.html)

### Why Autumn?

Generating random colors is [fairly easy](http://jsfiddle.net/6YLP5/):

```javascript
function randomColor(){
    return 'hsl('+Math.random()*360+',100%,60%)';
}
```

But generating lots of *deterministic* colors that look great together is a bit harder. Autumn has the following goals:

  * Colors shouldn't interfere with text readability.
  * Colors in a sequence should be easily distinguishable, especially consecutive colors.
  * Colors should repeat infrequently.

Judge for yourself on the [color profile demo](https://rawgithub.com/nluqo/autumn/master/autumn.html).

### Color profiles

Autumn lets you decide what color space to use and *how much* of it explore. Before coloring elements, you can configure Autumn by calling **init()** and passing an options arguments with any of the following arguments:

 * **colorProfile**: The name of an existing colorProfile to use (the profiles are shown in the above demo) *or* an array describing a new color profile:
    * A color space ('hsl', 'husl', or 'huslp'). [Read more about HUSL](http://boronine.com/husl/).
    * A minimum saturation (0-100).
    * A maximum saturation (0-100).
    * A minimum lightness (0-100).
    * A maximum lightness (0-100).
 * **hueScale**: What fraction of hues to explore. Default is 1.
 * **hueCenter**: Where to center hue exploration (0-359). Default is 0.
 * **generator**: The algorithm for generating colors('halton' or 'primeWalk'). Prime walk lets you specify exactly the distance between consecutive hues (say, for generating a rainbow). Default is 'halton'.
