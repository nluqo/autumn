*autumn*: color the matched set of elements based on their order (by default) or a specified attribute
 *colorProperty
keyAttribute


init()
options
colorProfile: the name of a color profile or an array describing one:
colorspace: hsl/husl/huslp
saturationMin
saturationMax
lightnessMin
lightnessMax
hueCenter: a central hue, default is 0
hueScale: what fraction of the color spectrum to use, default is 1
generator: halton (default), or primeWalk
primeWalkHueDistance


getColor()
key


getGradientColors(): returns 2 colors (0: lighter, 1: darker) which can be 
key

lightnessSpread


kitchen sink example:
