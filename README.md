# leaflet-compare

A Leaflet control to add a split screen to compare two map overlays.

**This project is a fork of the fork ([leaflet-splitmap](https://github.com/QuantStack/leaflet-splitmap)) of the [leaflet-side-by-side](https://github.com/digidem/leaflet-side-by-side) plugin**

![screencast example](screencast.gif)

### L.control.compare(_leftLayer[s]_, _rightLayer[s]_)

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
| `options.padding` | Number     | Padding between slider min/max and the edge of the screen in pixels. Defaults to `44` - the width of the slider thumb |
| `options.position` | Number    | Initial position of the slider given by a number between 0 (left) and 1 (right) for. Defaults to 0.5 |

### Events

Subscribe to events using [these methods](http://leafletjs.com/reference.html#events)

| Event         | Data           | Description   |
| ----------    | -------------- | ------------- |
| `dividermove` | {x: Number} | Fired when the divider is moved. Returns an event object with the property `x` = the pixels of the divider from the left side of the map container. |


### Example

[Live Example](http://lab.digital-democracy.org/leaflet-side-by-side/) see [source](index.html)

### Limitations

- The divider is not movable with IE.
- Probably won't work in IE8, but what does?

### License

MIT
