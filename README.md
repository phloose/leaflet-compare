# leaflet-compare

A Leaflet control to add a split screen to compare two map overlays.

**This project is a fork of the fork ([leaflet-splitmap](https://github.com/QuantStack/leaflet-splitmap)) of the [leaflet-side-by-side](https://github.com/digidem/leaflet-side-by-side) plugin**

![screencast example](screencast.gif)

### L.control.compare(_leftLayer[s]_, _rightLayer[s]_, options)

Creates a new Leaflet Control for comparing two layers or collections of layers. It does
not add the layers to the map - you need to do that manually. Extends `L.Control` but
`setPosition()` and `getPosition()` are used differently compared to a normal `L.Control`
object. Currently `setPosition(offset)` sets the position of the slider by a given
offset between 0 and 1. `getPosition()` returns the position of the slider in pixels.
The latter can be converted to a slider offset between 0 and 1 by dividing by
`map.getSize().x`. 

### Parameters

| parameter     | type           | description   |
| ----------    | -------------- | ------------- |
| `leftLayers`  | L.Layer\|array | A Leaflet Layer or array of layers to show on the left side of the map. Any layer added to the map that is in this array will be shown on the left |
| `rightLayers` | L.Layer\|array | A Leaflet Layer or array of layers to show on the right side of the map. Any layer added to the map that is in this array will be shown on the right. These *should not be* the same as any layers in `leftLayers` |
| `options`     | Object         | Options |
| `options.thumbSize` | Number     | Width of the slider thumb in pixels. Defaults to `44` |
| `options.padding` | Number     | Padding between slider min/max and the edge of the screen in pixels. Defaults to `0` |
| `options.position` | Number    | Initial position of the slider given by a number between `0` (left/min) and `1` (right/max) for. Defaults to `0.5` |

### Events

Subscribe to events using [these methods](http://leafletjs.com/reference.html#events)

| Event         | Data           | Description   |
| ----------    | -------------- | ------------- |
| `dividermove` | {x: Number} | Fired when the divider is moved. Returns an event object with the property `x` = the pixels of the divider from the left side of the map container. |


### Example

[Live Example](https://phloose.github.io/leaflet-compare/) see [source](index.html)

### Installation

`leaflet-compare` is compatible with Leaflet 1.7.1 but should also work with older
versions.

To install it you can use npm:

`npm install leaflet-compare`

Then import it in your project:

`import "leaflet-compare"`

This will assign the `Compare` class to the `L.Control` namespace and the factory
function `compare` to the `L.control` namespace. 

As an alternative you can import the `Compare` class directly:

`import { Compare } from "leaflet-compare"`

Be sure to have included the Leaflet css and js files and the plugin's files
`leaflet-compare.css` *before* you use the plugin. Otherwise the slider will not be
shown.

#### Usage in the browser without ES6 imports

You can use `leaflet-compare` from a CDN like [unpkg](https://unpkg.com/). Include the
plugin's css and js files *after* the links to the Leaflet files. Then either use
`myScript.js` or use script tags in the body of the referencing html page.

```html
<head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" ></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet-compare/dist/leaflet-compare.css" />
    <script src="https://unpkg.com/leaflet-compare/dist/leaflet-compare.js"></script>
    <script src="myScript.js"></script>
</head>
```

### Limitations

- The divider is not movable with IE.
- Probably won't work in IE8, but what does?

### License

MIT
