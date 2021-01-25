# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).


## [leaflet-splitmap 1.1.0] - tba

### Added

- New option `position` for setting the sliders initial position.
- `setPosition` is no longer a noop and serves the purpose of setting the range sliders position.

### Changed

- Use webpack-dev-server instead of budo
- Use ESLint instead of standard
- Use jest for testing
- `leaflet` is now a peerDependency since it is assumed that the user already has leaflet installed himself.

### Fixed

- Use `L.Evented` instead of deprecated `L.Mixin.Events`

### Security

- Updated all devDependencies to their latest versions
- Removed vulnerable (and unused) dependencies from the original leaflet-side-by-side
  plugin.

## [leaflet-splitmap]

- ADDED: Allows Leaflet version 0.7.7 through 1.x

## [leaflet-side-by-side v2.0.0] - 2015-12-08

- ADDED: Add `setLeftLayers()` and `setRightLayers()` methods
- ADDED: `options.padding`
- ADDED: `getPosition()` returns the x coordinate (relative to the map container) of the divider
- FIXED: **[BREAKING]** Export factory function on `L.control` not `L.Control`
- FIXED: Slider drag was not working on touch devices

## [leaflet-side-by-side v1.1.1] - 2015-12-03

- FIXED: fix package.json settings for npm distribution

## [leaflet-side-by-side v1.1.0] - 2015-12-03

- ADDED: Events
- FIXED: Fix initial divider position in Firefox, should start in middle of map

## [leaflet-side-by-side] v1.0.2 - 2015-12-02

Initial release
