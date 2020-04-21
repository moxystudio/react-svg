# react-svg

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][build-status-image]][build-status-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/@moxy/react-svg
[downloads-image]:https://img.shields.io/npm/dm/@moxy/react-svg.svg
[npm-image]:https://img.shields.io/npm/v/@moxy/react-svg.svg
[build-status-url]:https://github.com/moxystudio/react-svg/actions
[build-status-image]:https://img.shields.io/github/workflow/status/moxystudio/react-svg/Node%20CI/master
[codecov-url]:https://codecov.io/gh/moxystudio/react-svg
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/react-svg/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/react-svg
[david-dm-image]:https://img.shields.io/david/moxystudio/react-svg.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/react-svg?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/react-svg.svg

A component that renders the contents of an `SVG` file.

## Installation

```sh
$ npm install @moxy/react-svg
```

This library is written in modern JavaScript and is published in both CommonJS and ES module transpiled variants. If you target older browsers please make sure to transpile accordingly.

## Motivation

In the course of making a project, there is often a need to inject `SVG` into the DOM. This package aims to simplify this matter, allowing for `SVG` inlining and `SVG` spriting.

## Usage

```js
import React from 'react';
import Svg from '@moxy/react-svg';

import styles from './index.module.css';

const arrowLeft = import(/* webpackChunkName: "svg-sprite" */ '../media/icons/arrow-left.inline.svg');

const Home = () => {
    const svgPromise = Promise.resolve({ default: arrowLeft });

    return (
        <div>
            <h1>react-svg</h1>
            <Svg svg={ svgPromise } className={ styles.svg } />
        </div>
    );
};

export default Home;
```

## API

These are the props available in `@moxy/react-svg`.

#### svg

Type: `string` or `object` | Required: `true`

The contents of the `SVG` that should be rendered. 
In the case of the prop being an object, it must be the `Promise` that gets the contents of the `SVG`.

#### className

Type: `string` | Required: `false`

A className to apply to the component.

#### forwardedRef

Type: `object` | Required: `false`

A ref that will be attached to the icon (`<svg>`) component that `@moxy/react-svg` ultimately returns.


## Tests

```sh
$ npm test
$ npm test -- --watch # during development
```
## Demo

A demo [Next.js](https://nextjs.org/) project is available in the [`/demo`](./demo) folder so you can try out this component.

First, build the `{package-name}` project with:

```sh
$ npm run build
```

To run the demo, do the following inside the demo's folder:

```sh
$ npm i
$ npm run dev
```

*Note: Everytime a change is made to the package a rebuild is required to reflect those changes on the demo.*

## License

Released under the [MIT License](./LICENSE).