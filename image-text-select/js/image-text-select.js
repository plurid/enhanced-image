/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_ts_app_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ts/app.ts */ \"./src/ts/app.ts\");\n/* harmony import */ var _src_ts_app_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_ts_app_ts__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_sass_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/sass/app.scss */ \"./src/sass/app.scss\");\n/* harmony import */ var _src_sass_app_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_src_sass_app_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n@license @nocompile\nCopyright (c) 2018 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\nThe complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\nThe complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\nCode distributed by Google as part of the polymer project is also\nsubject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n*/\n(function () {\n  'use strict';\n\n  (function(){if(void 0===window.Reflect||void 0===window.customElements||window.customElements.hasOwnProperty('polyfillWrapFlushCallback'))return;const a=HTMLElement;window.HTMLElement=function HTMLElement(){return Reflect.construct(a,[],this.constructor)},HTMLElement.prototype=a.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,a);})();\n\n}());\n\n\n//# sourceURL=webpack:///./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js?");

/***/ }),

/***/ "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * @license\n * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.\n * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n * Code distributed by Google as part of the polymer project is also\n * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n\n(function() {\n  'use strict';\n\n  /**\n   * Basic flow of the loader process\n   *\n   * There are 4 flows the loader can take when booting up\n   *\n   * - Synchronous script, no polyfills needed\n   *   - wait for `DOMContentLoaded`\n   *   - run callbacks passed to `waitFor`\n   *   - fire WCR event\n   *\n   * - Synchronous script, polyfills needed\n   *   - document.write the polyfill bundle\n   *   - wait on the `load` event of the bundle to batch Custom Element upgrades\n   *   - wait for `DOMContentLoaded`\n   *   - run callbacks passed to `waitFor`\n   *   - fire WCR event\n   *\n   * - Asynchronous script, no polyfills needed\n   *   - fire WCR event, as there could not be any callbacks passed to `waitFor`\n   *\n   * - Asynchronous script, polyfills needed\n   *   - Append the polyfill bundle script\n   *   - wait for `load` event of the bundle\n   *   - batch Custom Element Upgrades\n   *   - run callbacks pass to `waitFor`\n   *   - fire WCR event\n   */\n\n  var polyfillsLoaded = false;\n  var whenLoadedFns = [];\n  var allowUpgrades = false;\n  var flushFn;\n\n  function fireEvent() {\n    window.WebComponents.ready = true;\n    document.dispatchEvent(new CustomEvent('WebComponentsReady', { bubbles: true }));\n  }\n\n  function batchCustomElements() {\n    if (window.customElements && customElements.polyfillWrapFlushCallback) {\n      customElements.polyfillWrapFlushCallback(function (flushCallback) {\n        flushFn = flushCallback;\n        if (allowUpgrades) {\n          flushFn();\n        }\n      });\n    }\n  }\n\n  function asyncReady() {\n    batchCustomElements();\n    ready();\n  }\n\n  function ready() {\n    // bootstrap <template> elements before custom elements\n    if (window.HTMLTemplateElement && HTMLTemplateElement.bootstrap) {\n      HTMLTemplateElement.bootstrap(window.document);\n    }\n    polyfillsLoaded = true;\n    runWhenLoadedFns().then(fireEvent);\n  }\n\n  function runWhenLoadedFns() {\n    allowUpgrades = false;\n    var done = function() {\n      allowUpgrades = true;\n      whenLoadedFns.length = 0;\n      flushFn && flushFn();\n    };\n    return Promise.all(whenLoadedFns.map(function(fn) {\n      return fn instanceof Function ? fn() : fn;\n    })).then(function() {\n      done();\n    }).catch(function(err) {\n      console.error(err);\n    });\n  }\n\n  window.WebComponents = window.WebComponents || {};\n  window.WebComponents.ready = window.WebComponents.ready || false;\n  window.WebComponents.waitFor = window.WebComponents.waitFor || function(waitFn) {\n    if (!waitFn) {\n      return;\n    }\n    whenLoadedFns.push(waitFn);\n    if (polyfillsLoaded) {\n      runWhenLoadedFns();\n    }\n  };\n  window.WebComponents._batchCustomElements = batchCustomElements;\n\n  var name = 'webcomponents-loader.js';\n  // Feature detect which polyfill needs to be imported.\n  var polyfills = [];\n  if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) ||\n    (window.ShadyDOM && window.ShadyDOM.force)) {\n    polyfills.push('sd');\n  }\n  if (!window.customElements || window.customElements.forcePolyfill) {\n    polyfills.push('ce');\n  }\n\n  var needsTemplate = (function() {\n    // no real <template> because no `content` property (IE and older browsers)\n    var t = document.createElement('template');\n    if (!('content' in t)) {\n      return true;\n    }\n    // broken doc fragment (older Edge)\n    if (!(t.content.cloneNode() instanceof DocumentFragment)) {\n      return true;\n    }\n    // broken <template> cloning (Edge up to at least version 17)\n    var t2 = document.createElement('template');\n    t2.content.appendChild(document.createElement('div'));\n    t.content.appendChild(t2);\n    var clone = t.cloneNode(true);\n    return (clone.content.childNodes.length === 0 ||\n        clone.content.firstChild.content.childNodes.length === 0);\n  })();\n\n  // NOTE: any browser that does not have template or ES6 features\n  // must load the full suite of polyfills.\n  if (!window.Promise || !Array.from || !window.URL || !window.Symbol || needsTemplate) {\n    polyfills = ['sd-ce-pf'];\n  }\n\n  if (polyfills.length) {\n    var url;\n    var polyfillFile = 'bundles/webcomponents-' + polyfills.join('-') + '.js';\n\n    // Load it from the right place.\n    if (window.WebComponents.root) {\n      url = window.WebComponents.root + polyfillFile;\n    } else {\n      var script = document.querySelector('script[src*=\"' + name +'\"]');\n      // Load it from the right place.\n      url = script.src.replace(name, polyfillFile);\n    }\n\n    var newScript = document.createElement('script');\n    newScript.src = url;\n    // if readyState is 'loading', this script is synchronous\n    if (document.readyState === 'loading') {\n      // make sure custom elements are batched whenever parser gets to the injected script\n      newScript.setAttribute('onload', 'window.WebComponents._batchCustomElements()');\n      document.write(newScript.outerHTML);\n      document.addEventListener('DOMContentLoaded', ready);\n    } else {\n      newScript.addEventListener('load', function () {\n        asyncReady();\n      });\n      newScript.addEventListener('error', function () {\n        throw new Error('Could not load polyfill bundle' + url);\n      });\n      document.head.appendChild(newScript);\n    }\n  } else {\n    polyfillsLoaded = true;\n    if (document.readyState === 'complete') {\n      fireEvent()\n    } else {\n      // this script may come between DCL and load, so listen for both, and cancel load listener if DCL fires\n      window.addEventListener('load', ready);\n      window.addEventListener('DOMContentLoaded', function() {\n        window.removeEventListener('load', ready);\n        ready();\n      })\n    }\n  }\n})();\n\n\n//# sourceURL=webpack:///./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js?");

/***/ }),

/***/ "./src/sass/app.scss":
/*!***************************!*\
  !*** ./src/sass/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/sass/app.scss?");

/***/ }),

/***/ "./src/ts/app.ts":
/*!***********************!*\
  !*** ./src/ts/app.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./source/vendor/vendor */ \"./src/ts/source/vendor/vendor.ts\");\n__webpack_require__(/*! ./source/components/components.ts */ \"./src/ts/source/components/components.ts\");\n\n\n//# sourceURL=webpack:///./src/ts/app.ts?");

/***/ }),

/***/ "./src/ts/source/components/components.ts":
/*!************************************************!*\
  !*** ./src/ts/source/components/components.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./image-text-select/image-text-select-define.ts */ \"./src/ts/source/components/image-text-select/image-text-select-define.ts\");\n__webpack_require__(/*! ./image-text/image-text-define.ts */ \"./src/ts/source/components/image-text/image-text-define.ts\");\n__webpack_require__(/*! ./image-select/image-select-define.ts */ \"./src/ts/source/components/image-select/image-select-define.ts\");\n\n\n//# sourceURL=webpack:///./src/ts/source/components/components.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-select/image-select-core.ts":
/*!********************************************************************!*\
  !*** ./src/ts/source/components/image-select/image-select-core.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction setImageSelect(image) {\n}\nexports.setImageSelect = setImageSelect;\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-select/image-select-core.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-select/image-select-define.ts":
/*!**********************************************************************!*\
  !*** ./src/ts/source/components/image-select/image-select-define.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst image_select_core_1 = __webpack_require__(/*! ./image-select-core */ \"./src/ts/source/components/image-select/image-select-core.ts\");\nclass HTMLImageSelectElement extends HTMLElement {\n    constructor() {\n        super();\n        image_select_core_1.setImageSelect(this);\n    }\n}\nexports.HTMLImageSelectElement = HTMLImageSelectElement;\ncustomElements.define('image-select', HTMLImageSelectElement);\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-select/image-select-define.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-text-select/image-text-select-core.ts":
/*!******************************************************************************!*\
  !*** ./src/ts/source/components/image-text-select/image-text-select-core.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction setImage(its) {\n    // Create img element.\n    const imgEl = document.createElement('img');\n    // Set video attributes.\n    // imgEl.autoplay = its.autoplay;\n    // imgEl.controls = its.controls;\n    // imgEl.height = parseInt(its.height);\n    // imgEl.loop = its.loop;\n    // imgEl.muted = its.muted;\n    // imgEl.poster = its.poster;\n    // imgEl.preload = its.preload;\n    imgEl.src = its.source;\n    // imgEl.width = parseInt(its.width);\n    // If text has been generated, load it from database\n    // or get it from server and set it in page.\n    // If text has not been generated, add event listener to generate button.\n    // To generate:\n    // 1. send img to server\n    // 2. receive text data\n    // 3. store text data or store only the img id for further retrieval\n    // In future:\n    // Allow the user to change the text select\n    // and/or the text characteristics (placement, size, font, etc)\n    // and send that feedback to server\n    // for a better calibration of text-image.\n    its.appendChild(imgEl);\n    // Dummy load data and based on it set the img text.\n    loadJSON('./data/text.json', (itsData) => {\n        setImageText(its, itsData);\n    });\n}\nexports.setImage = setImage;\nfunction setImageText(image, itsData) {\n    const imageEl = image.getElementsByTagName('img')[0];\n    image.id = itsData.id;\n    let imageText = document.createElement('image-text');\n    itsData.imageText.map((imageTextEl) => {\n        let imageSelect = document.createElement('image-select');\n        imageSelect.innerHTML = escapeHTML(imageTextEl.textContent);\n        imageSelect.id = imageTextEl.id;\n        imageEl.addEventListener('load', () => {\n            const imgHeight = imageEl.clientHeight;\n            const imgWidth = imageEl.clientWidth;\n            const leftPos = (imageTextEl.xPercentage * imgWidth) / 100;\n            const topPos = (imageTextEl.yPercentage * imgHeight) / 100;\n            // console.log('img', imageEl.getBoundingClientRect());\n            // console.log('height', imageEl.clientHeight);\n            // console.log('width', imageEl.clientWidth);\n            imageSelect.style.fontFamily = imageTextEl.fontFamily;\n            imageSelect.style.fontSize = imageTextEl.fontSize + 'px';\n            imageSelect.style.letterSpacing = imageTextEl.letterSpacing + 'px';\n            imageSelect.style.lineHeight = imageTextEl.lineHeight + 'px';\n            imageSelect.style.wordSpacing = imageTextEl.wordSpacing + 'px';\n            imageSelect.style.left = leftPos + 'px';\n            imageSelect.style.top = topPos + 'px';\n            imageText.appendChild(imageSelect);\n        });\n    });\n    image.appendChild(imageText);\n    // Get aspect ratio of the video in a promise\n    // Get rendered width, calculate height of the video\n    // For each text in the video text select object,\n    // adjust the positioning, size, etc of the text\n    // based on the ratio between current width (height)\n    // and video resolution width (height).\n    // Set text on page\n    // Listen for page resize and repeat\n}\n/**\n * Utility function to escape HTML entities from a given string.\n *\n * @param unsafe {string}\n */\nfunction escapeHTML(unsafe) {\n    return unsafe\n        .replace(/&/g, \"&amp;\")\n        .replace(/</g, \"&lt;\")\n        .replace(/>/g, \"&gt;\")\n        .replace(/\"/g, \"&quot;\")\n        .replace(/'/g, \"&#039;\");\n}\n/**\n * Utility function to load dummy data\n * which will be received from the server.\n *\n * @param path {string}\n * @param callback {Function}\n */\nfunction loadJSON(path, callback) {\n    let xobj = new XMLHttpRequest();\n    xobj.overrideMimeType(\"application/json\");\n    xobj.open('GET', path, true);\n    xobj.onreadystatechange = () => {\n        if (xobj.readyState == 4 && xobj.status == 200) {\n            callback(JSON.parse(xobj.responseText));\n        }\n    };\n    xobj.send(null);\n}\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text-select/image-text-select-core.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-text-select/image-text-select-define.ts":
/*!********************************************************************************!*\
  !*** ./src/ts/source/components/image-text-select/image-text-select-define.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst image_text_select_core_1 = __webpack_require__(/*! ./image-text-select-core */ \"./src/ts/source/components/image-text-select/image-text-select-core.ts\");\nclass HTMLImageTextSelectElement extends HTMLElement {\n    constructor() {\n        super();\n        this._autoplay = false;\n        this._controls = true;\n        this._loop = false;\n        this._muted = false;\n        this._pregenerate = false;\n        this.autoplay = (this.getAttribute('autoplay') === 'true' ||\n            this.getAttribute('autoplay') === '') ? true : false;\n        this.controls = (this.getAttribute('controls') === 'true' ||\n            this.getAttribute('controls') === '' ||\n            this.getAttribute('controls') === null) ? true : false;\n        this.height = this.getAttribute('height');\n        this.loop = (this.getAttribute('loop') === 'true' ||\n            this.getAttribute('loop') === '') ? true : false;\n        this.muted = (this.getAttribute('muted') === 'true' ||\n            this.getAttribute('muted') === '') ? true : false;\n        this.poster = this.getAttribute('poster');\n        this.pregenerate = (this.getAttribute('pregenerate') === 'true' ||\n            this.getAttribute('pregenerate') === '') ? true : false;\n        this.preload = this.getAttribute('preload');\n        this.source = this.getAttribute('src') || this.getAttribute('source');\n        this.sources = this.getAttribute('sources') ? this.getAttribute('sources').split(' ') : undefined;\n        this.width = this.getAttribute('width');\n        image_text_select_core_1.setImage(this);\n    }\n    // --- Autoplay ---\n    get autoplay() {\n        return this._autoplay;\n    }\n    set autoplay(newAutoplay) {\n        this._autoplay = newAutoplay;\n    }\n    // --- Controls ---\n    get controls() {\n        return this._controls;\n    }\n    set controls(newControls) {\n        this._controls = newControls;\n    }\n    // --- Height ---\n    get height() {\n        return this._height;\n    }\n    set height(newHeight) {\n        this._height = newHeight;\n    }\n    // --- Loop ---\n    get loop() {\n        return this._loop;\n    }\n    set loop(newLoop) {\n        this._loop = newLoop;\n    }\n    // --- Muted ---\n    get muted() {\n        return this._muted;\n    }\n    set muted(newMuted) {\n        this._muted = newMuted;\n    }\n    // --- Poster ---\n    get poster() {\n        return this._poster;\n    }\n    set poster(newPoster) {\n        this._poster = newPoster;\n    }\n    // --- Pregenerate ---\n    get pregenerate() {\n        return this._pregenerate;\n    }\n    set pregenerate(newPregenerate) {\n        this._pregenerate = newPregenerate;\n    }\n    // --- Preload ---\n    get preload() {\n        return this._preload;\n    }\n    set preload(newPreload) {\n        this._preload = newPreload;\n    }\n    // --- Source ---\n    get source() {\n        return this._source;\n    }\n    set source(newSource) {\n        this._source = newSource;\n    }\n    // --- Sources ---\n    get sources() {\n        return this._sources;\n    }\n    set sources(newSources) {\n        this._sources = newSources;\n    }\n    // --- Width ---\n    get width() {\n        return this._width;\n    }\n    set width(newWidth) {\n        this._width = newWidth;\n    }\n}\nexports.HTMLImageTextSelectElement = HTMLImageTextSelectElement;\ncustomElements.define('image-text-select', HTMLImageTextSelectElement);\n// customElements.define('img-text-select', HTMLImageTextSelectElement);\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text-select/image-text-select-define.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-text/image-text-core.ts":
/*!****************************************************************!*\
  !*** ./src/ts/source/components/image-text/image-text-core.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction setImageText(image) {\n}\nexports.setImageText = setImageText;\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text/image-text-core.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-text/image-text-define.ts":
/*!******************************************************************!*\
  !*** ./src/ts/source/components/image-text/image-text-define.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst image_text_core_1 = __webpack_require__(/*! ./image-text-core */ \"./src/ts/source/components/image-text/image-text-core.ts\");\nclass HTMLImageTextElement extends HTMLElement {\n    constructor() {\n        super();\n        image_text_core_1.setImageText(this);\n    }\n}\nexports.HTMLImageTextElement = HTMLImageTextElement;\ncustomElements.define('image-text', HTMLImageTextElement);\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text/image-text-define.ts?");

/***/ }),

/***/ "./src/ts/source/vendor/vendor.ts":
/*!****************************************!*\
  !*** ./src/ts/source/vendor/vendor.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! @webcomponents/webcomponentsjs/custom-elements-es5-adapter.js */ \"./node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js\");\n__webpack_require__(/*! @webcomponents/webcomponentsjs/webcomponents-loader.js */ \"./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js\");\n\n\n//# sourceURL=webpack:///./src/ts/source/vendor/vendor.ts?");

/***/ })

/******/ });