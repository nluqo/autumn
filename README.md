Autumn.js
======
Autumn generates deterministic colors. It's great for coloring tags, navigation, and icons ([this post](http://jere.in/why-are-cnns-headers-grey) demonstrates one such use case).

### Using Autumn

Include jQuery, [HUSL](http://boronine.com/husl/) (optional, but recommended), and Autumn.
```javascript
<script src="jquery-1.10.1.min.js"></script>
<script src="husl.min.js"></script>
<script src="autumn.min.js"></script>
```
Then color as many elements as you want with a single line: [simple demo](https://rawgithub.com/nluqo/autumn/master/simpledemo.html)
```javascript
$("div").autumn();
```

### Not random

Autumn might look like a *random color generator*, but it's not random. The [demo](https://rawgithub.com/nluqo/autumn/master/simpledemo.html) above always generates the same colors. So does the [color profile demo](https://rawgithub.com/nluqo/autumn/master/autumn.html). If you look carefully, you'll  see the sames hues being repeated (red, green, blue, orange...). Autumn is a hash function of sorts. It hashes keys into colors. In the previous two demos, the keys are based on order (0, 1, 2, 3...).

!["foo" and "bar" colored with Autumn](foobar.png)

Here's an example of hashing something other than order; this time the keys are "foo" and "bar". Again, those colors won't change unless the initial configuration is changed. This is useful if you want a persistent relationship between data and colors (e.g. being able to identify users by color).

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

### API

[Here](api.md).
