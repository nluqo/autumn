API
=======

### .autumn(color,keyAttribute)
color the matched set of elements based on their order (by default) or a specified attribute
 * **colorProperty**: a CSS or DOM property to color. Default is 'backgroundColor'
 * **keyAttribute**: the name of an attribute to use as a key for generating colors (e.g. 'id'). If not specified, the key will default to the element's index.

### $.fn.autumn.init(options)
specify the color space and how to explore it
  * **options**:
    * **colorProfile**: The name of an existing colorProfile to use (the profiles are shown in the [this demo](https://rawgithub.com/nluqo/autumn/master/autumn.html)) *or* an array describing a new color profile:
      * A color space ('hsl', 'husl', or 'huslp'). [Read more about HUSL](http://boronine.com/husl/).
      * A minimum saturation (0-100).
      * A maximum saturation (0-100).
      * A minimum lightness (0-100).
      * A maximum lightness (0-100).
    * **hueScale**: What fraction of hues to explore (0-1). Default is 1.
    * **hueCenter**: Where to center hue exploration (0-360). Default is 0 (red).
    * **generator**: The algorithm for generating colors('[halton](http://en.wikipedia.org/wiki/Halton_sequence)' or 'primeWalk'). Prime walk lets you specify exactly the distance between consecutive hues (say, for generating a rainbow). Default is 'halton'.
    * **primeWalkHueDistance**: When using primeWalk, the distance between consecutive hues (0-360). Default is 223.  

### $.fn.autumn.getColor(key)
returns a color based on a key
  * **key**: a number or string

### $.fn.autumn.getGradientColors(key, lightnessSpread)
returns an array with colors (0: lighter, 1: darker) which can be used for creating gradients
  * **key**: a number or string
  * **lightnessSpread**: a number 0-100 specifying the lightness difference between the two colors. Default i.s 30

### Demo

[kitchen sink demo](https://rawgithub.com/nluqo/autumn/master/kitchensinkdemo.html)

```javascript
  //init with all options specified
  $.fn.autumn.init({
  	colorProfile:['hsl', 40, 80, 60, 60], //a name would work fine as well (e.g. 'light')
  	hueScale:.25,
  	hueCenter:270,
  	generator:'primeWalk',
  	primeWalkHueDistance: 53
  });
  
  $("div").autumn();
  
  //init with no options; reverts to defaults
  $.fn.autumn.init({});
  
  $("#hello").autumn("color","data-foo");
  
  $("#lorem").css({
  	"color": $.fn.autumn.getColor(99)
  });
  
  var gradColors = $.fn.autumn.getGradientColors(128, 40);
  $("#button").css({
  	'background': 'linear-gradient(180deg, '+gradColors[0]+','+gradColors[1]+')'
  });
```
