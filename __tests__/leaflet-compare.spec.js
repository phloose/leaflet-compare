import L from "leaflet";
import { Compare } from "../src/leaflet-compare";

function thumbAndPaddingOffset(position, thumbSize = 42, padding = 0) {
    return (0.5 - position) * (2 * padding + thumbSize);
}

describe("leaflet-compare", () => {
    let map;
    let leftlayer;
    let rightlayer;
    let compare;

    const mapHeight = 600;
    const mapWidth = 800;

    beforeEach(() => {
        const mapDiv = document.createElement("div");
        // We use a virtual DOM so the clientHeight/clientWidth will be zero. Define
        // them so the map gets a fake viewport.
        Object.defineProperty(mapDiv, "clientHeight", {
            configurable: true,
            value: mapHeight,
        });
        Object.defineProperty(mapDiv, "clientWidth", {
            configurable: true,
            value: mapWidth,
        });
        map = L.map(mapDiv, {
            renderer: new L.SVG(), // from: https://github.com/oliverroick/Leaflet.Deflate/blob/master/tests/L.Deflate.test.js
            center: [0, 0],
            zoom: 10,
        });
    });

    afterEach(() => {
        compare.remove();
        map.remove();
    });
    describe("Methods", () => {
        describe("#setPosition", () => {
            test("via constructor", () => {
                compare = new Compare(leftlayer, rightlayer, {
                    position: 0.7,
                }).addTo(map);
                expect(compare.getPosition() / map.getSize().x).toBeCloseTo(
                    0.7,
                    1,
                );
            });

            test("via method", () => {
                compare = new Compare(leftlayer, rightlayer)
                    .addTo(map)
                    .setPosition(0.7);
                expect(compare.getPosition() / map.getSize().x).toBeCloseTo(
                    0.7,
                    1,
                );
            });
        });
    });

    describe("Layers with pane='tilePane' (GridLayer, TileLayer)", () => {
        beforeEach(() => {
            leftlayer = L.gridLayer().addTo(map);
            rightlayer = L.gridLayer().addTo(map);
        });
        test("default slider position", () => {
            compare = new Compare(leftlayer, rightlayer).addTo(map);

            expect(leftlayer.getContainer().style.clip).toEqual(
                `rect(0px, ${mapWidth / 2}px, ${mapHeight}px, 0px)`,
            );
            expect(rightlayer.getContainer().style.clip).toEqual(
                `rect(0px, ${mapWidth}px, ${mapHeight}px, ${mapWidth / 2}px)`,
            );
        });
        test("slider position on the left (position < 0.5)", () => {
            const position = 0.3;
            compare = new Compare(leftlayer, rightlayer)
                .addTo(map)
                .setPosition(position);
            expect(leftlayer.getContainer().style.clip).toEqual(
                `rect(0px, ${
                    mapWidth * position + thumbAndPaddingOffset(position)
                }px, ${mapHeight}px, 0px)`,
            );
            expect(rightlayer.getContainer().style.clip).toEqual(
                `rect(0px, ${mapWidth}px, ${mapHeight}px, ${
                    mapWidth * position + thumbAndPaddingOffset(position)
                }px)`,
            );
        });
        test("slider position on the right (position > 0.5)", () => {
            const position = 0.7;
            compare = new Compare(leftlayer, rightlayer)
                .addTo(map)
                .setPosition(position);
            expect(leftlayer.getContainer().style.clip).toEqual(
                `rect(0px, ${
                    mapWidth * 0.7 + thumbAndPaddingOffset(0.7)
                }px, ${mapHeight}px, 0px)`,
            );
            expect(rightlayer.getContainer().style.clip).toEqual(
                `rect(0px, ${mapWidth}px, ${mapHeight}px, ${
                    mapWidth * 0.7 + thumbAndPaddingOffset(0.7)
                }px)`,
            );
        });
    });
    describe("Layers with pane='overlayPane' (Point, Polygon, Polyline, ImageOverlay, LayerGroup, FeatureGroup, GeoJSON)", () => {
        beforeEach(() => {
            map.createPane("left");
            map.createPane("right");

            leftlayer = L.circle([0, -20], {
                pane: "left",
                radius: 1000,
            }).addTo(map);
            rightlayer = L.circle([0, 20], {
                pane: "right",
                radius: 1000,
            }).addTo(map);
        });
        test("default slider position", () => {
            compare = new Compare(leftlayer, rightlayer).addTo(map);
            expect(leftlayer.getPane().style.clip).toEqual(
                `rect(0px, ${mapWidth / 2}px, ${mapHeight}px, 0px)`,
            );
            expect(rightlayer.getPane().style.clip).toEqual(
                `rect(0px, ${mapWidth}px, ${mapHeight}px, ${mapWidth / 2}px)`,
            );
        });
        test("slider position on the left (position < 0.5)", () => {
            const position = 0.2;
            compare = new Compare(leftlayer, rightlayer)
                .addTo(map)
                .setPosition(position);
            expect(leftlayer.getPane().style.clip).toEqual(
                `rect(0px, ${
                    mapWidth * position + thumbAndPaddingOffset(position)
                }px, ${mapHeight}px, 0px)`,
            );
            expect(rightlayer.getPane().style.clip).toEqual(
                `rect(0px, ${mapWidth}px, ${mapHeight}px, ${
                    mapWidth * position + thumbAndPaddingOffset(position)
                }px)`,
            );
        });
        test("slider position on the right (position > 0.5)", () => {
            const position = 0.8;
            compare = new Compare(leftlayer, rightlayer)
                .addTo(map)
                .setPosition(position);
            expect(leftlayer.getPane().style.clip).toEqual(
                `rect(0px, ${
                    mapWidth * position + thumbAndPaddingOffset(position)
                }px, ${mapHeight}px, 0px)`,
            );
            expect(rightlayer.getPane().style.clip).toEqual(
                `rect(0px, ${mapWidth}px, ${mapHeight}px, ${
                    mapWidth * position + thumbAndPaddingOffset(position)
                }px)`,
            );
        });
    });
});
