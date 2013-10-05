Autumn.js
======
Autumn generates deterministic colors. It's great for coloring tags, navigation, and icons ([this post](http://jere.in/why-are-cnns-headers-grey) demonstrates one such use case).

### Using Autumn

Include jQuery, [HUSL](http://boronine.com/husl/) (optional, but recommended), and Autumn.
```javascript
<script src="jquery-1.10.1.min.js"/>
<script src="husl.min.js"/>
<script src="autumn.min.js"/>
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

### API

[Here](api.md).
