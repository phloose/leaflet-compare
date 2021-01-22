const L = require("leaflet");
require("./layout.css");
require("./range.css");

let mapWasDragEnabled;
let mapWasTapEnabled;

// Leaflet v0.7 backwards compatibility
function on(el, types, fn, context) {
    types.split(" ").forEach(type => {
        L.DomEvent.on(el, type, fn, context);
    });
}

// Leaflet v0.7 backwards compatibility
function off(el, types, fn, context) {
    types.split(" ").forEach(type => {
        L.DomEvent.off(el, type, fn, context);
    });
}

function getRangeEvent(rangeInput) {
    return "oninput" in rangeInput ? "input" : "change";
}

function cancelMapDrag() {
    mapWasDragEnabled = this._map.dragging.enabled();
    mapWasTapEnabled = this._map.tap && this._map.tap.enabled();
    this._map.dragging.disable();
    this._map.tap && this._map.tap.disable();
}

function uncancelMapDrag(e) {
    this._refocusOnMap(e);
    if (mapWasDragEnabled) {
        this._map.dragging.enable();
    }
    if (mapWasTapEnabled) {
        this._map.tap.enable();
    }
}

// convert arg to an array - returns empty array if arg is undefined
function asArray(arg) {
    return arg === "undefined" ? [] : Array.isArray(arg) ? arg : [arg];
}

function noop() {}

L.Control.SplitMap = L.Control.extend({
    options: {
        thumbSize: 42,
        padding: 0,
    },

    initialize(leftLayers, rightLayers, options) {
        this._leftLayers = asArray(leftLayers);
        this._rightLayers = asArray(rightLayers);
        this._updateClip();
        L.setOptions(this, options);
    },

    getPosition() {
        const rangeValue = this._range.value;
        const offset = (0.5 - rangeValue)
            * (2 * this.options.padding + this.options.thumbSize);
        return this._map.getSize().x * rangeValue + offset;
    },

    setPosition: noop,

    includes: L.Mixin.Events,

    addTo(map) {
        this.remove();
        this._map = map;
        const container = (this._container = L.DomUtil.create(
            "div",
            "leaflet-sbs",
            map._controlContainer,
        ));
        this._divider = L.DomUtil.create(
            "div",
            "leaflet-sbs-divider",
            container,
        );
        const range = (this._range = L.DomUtil.create(
            "input",
            "leaflet-sbs-range",
            container,
        ));
        range.type = "range";
        range.min = 0;
        range.max = 1;
        range.step = "any";
        range.value = 0.5;
        range.style.paddingLeft = range.style.paddingRight = `${this.options.padding}px`;
        this._addEvents();
        this._updateClip();
        return this;
    },

    remove() {
        if (!this._map) {
            return this;
        }
        this._leftLayers.forEach(left_layer => {
            if (left_layer.getContainer) {
                left_layer.getContainer().style.clip = "";
            } else {
                left_layer.getPane().style.clip = "";
            }
        });

        this._rightLayers.forEach(right_layer => {
            if (right_layer.getContainer) {
                right_layer.getContainer().style.clip = "";
            } else {
                right_layer.getPane().style.clip = "";
            }
        });
        this._removeEvents();
        L.DomUtil.remove(this._container);
        this._map = null;
        return this;
    },

    _updateClip() {
        if (!this._map) {
            return this;
        }
        const map = this._map;
        const nw = map.containerPointToLayerPoint([0, 0]);
        const se = map.containerPointToLayerPoint(map.getSize());
        const clipX = nw.x + this.getPosition();
        const dividerX = this.getPosition();
        this._divider.style.left = `${dividerX}px`;
        this.fire("dividermove", { x: dividerX });
        const clipLeft = `rect(${[nw.y, clipX, se.y, nw.x].join("px,")}px)`;
        const clipRight = `rect(${[nw.y, se.x, se.y, clipX].join("px,")}px)`;

        this._leftLayers.forEach(left_layer => {
            if (left_layer.getContainer) {
                left_layer.getContainer().style.clip = clipLeft;
            } else {
                left_layer.getPane().style.clip = clipLeft;
            }
        });

        this._rightLayers.forEach(right_layer => {
            if (right_layer.getContainer) {
                right_layer.getContainer().style.clip = clipRight;
            } else {
                right_layer.getPane().style.clip = clipRight;
            }
        });
    },

    _addEvents() {
        const range = this._range;
        const map = this._map;
        if (!map || !range) return;
        map.on("move", this._updateClip, this);
        map.on("layeradd layerremove", this._updateLayers, this);
        on(range, getRangeEvent(range), this._updateClip, this);
        on(
            range,
            L.Browser.touch ? "touchstart" : "mousedown",
            cancelMapDrag,
            this,
        );
        on(
            range,
            L.Browser.touch ? "touchend" : "mouseup",
            uncancelMapDrag,
            this,
        );
    },

    _removeEvents() {
        const range = this._range;
        const map = this._map;
        if (range) {
            off(range, getRangeEvent(range), this._updateClip, this);
            off(
                range,
                L.Browser.touch ? "touchstart" : "mousedown",
                cancelMapDrag,
                this,
            );
            off(
                range,
                L.Browser.touch ? "touchend" : "mouseup",
                uncancelMapDrag,
                this,
            );
        }
        if (map) {
            map.off("layeradd layerremove", this._updateLayers, this);
            map.off("move", this._updateClip, this);
        }
    },
});

L.control.splitMap = function (leftLayers, rightLayers, options) {
    return new L.Control.SplitMap(leftLayers, rightLayers, options);
};

module.exports = L.Control.SplitMap;
