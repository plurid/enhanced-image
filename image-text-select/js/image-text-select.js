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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./source/components/components.ts */ \"./src/ts/source/components/components.ts\");\n\n\n//# sourceURL=webpack:///./src/ts/app.ts?");

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
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    }\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar image_select_core_1 = __webpack_require__(/*! ./image-select-core */ \"./src/ts/source/components/image-select/image-select-core.ts\");\nvar HTMLImageSelectElement = /** @class */ (function (_super) {\n    __extends(HTMLImageSelectElement, _super);\n    function HTMLImageSelectElement() {\n        var _this = _super.call(this) || this;\n        image_select_core_1.setImageSelect(_this);\n        return _this;\n    }\n    return HTMLImageSelectElement;\n}(HTMLElement));\nexports.HTMLImageSelectElement = HTMLImageSelectElement;\ncustomElements.define('image-select', HTMLImageSelectElement);\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-select/image-select-define.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-text-select/image-text-select-core.ts":
/*!******************************************************************************!*\
  !*** ./src/ts/source/components/image-text-select/image-text-select-core.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction setImage(its) {\n    // Create img element.\n    var imgEl = document.createElement('img');\n    // Set video attributes.\n    // imgEl.autoplay = its.autoplay;\n    // imgEl.controls = its.controls;\n    // imgEl.height = parseInt(its.height);\n    // imgEl.loop = its.loop;\n    // imgEl.muted = its.muted;\n    // imgEl.poster = its.poster;\n    // imgEl.preload = its.preload;\n    imgEl.src = its.source;\n    // imgEl.width = parseInt(its.width);\n    // If text has been generated, load it from database\n    // or get it from server and set it in page.\n    // If text has not been generated, add event listener to generate button.\n    // To generate:\n    // 1. send img to server\n    // 2. receive text data\n    // 3. store text data or store only the img id for further retrieval\n    // In future:\n    // Allow the user to change the text select\n    // and/or the text characteristics (placement, size, font, etc)\n    // and send that feedback to server\n    // for a better calibration of text-image.\n    its.appendChild(imgEl);\n    // Dummy load data and based on it set the img text.\n    loadJSON('./data/text.json', function (itsData) {\n        setImageText(its, itsData);\n    });\n}\nexports.setImage = setImage;\nfunction setImageText(image, itsData) {\n    var imageEl = image.getElementsByTagName('img')[0];\n    image.id = itsData.id;\n    var imageText = document.createElement('image-text');\n    itsData.imageText.map(function (imageTextEl) {\n        var imageSelect = document.createElement('image-select');\n        imageSelect.innerHTML = escapeHTML(imageTextEl.textContent);\n        imageSelect.id = imageTextEl.id;\n        imageEl.addEventListener('load', function () {\n            var imgHeight = imageEl.clientHeight;\n            var imgWidth = imageEl.clientWidth;\n            var leftPos = (imageTextEl.xPercentage * imgWidth) / 100;\n            var topPos = (imageTextEl.yPercentage * imgHeight) / 100;\n            // console.log('img', imageEl.getBoundingClientRect());\n            // console.log('height', imageEl.clientHeight);\n            // console.log('width', imageEl.clientWidth);\n            imageSelect.style.fontFamily = imageTextEl.fontFamily;\n            imageSelect.style.fontSize = imageTextEl.fontSize + 'px';\n            imageSelect.style.letterSpacing = imageTextEl.letterSpacing + 'px';\n            imageSelect.style.lineHeight = imageTextEl.lineHeight + 'px';\n            imageSelect.style.wordSpacing = imageTextEl.wordSpacing + 'px';\n            imageSelect.style.left = leftPos + 'px';\n            imageSelect.style.top = topPos + 'px';\n            imageText.appendChild(imageSelect);\n        });\n    });\n    image.appendChild(imageText);\n    // Get aspect ratio of the video in a promise\n    // Get rendered width, calculate height of the video\n    // For each text in the video text select object,\n    // adjust the positioning, size, etc of the text\n    // based on the ratio between current width (height)\n    // and video resolution width (height).\n    // Set text on page\n    // Listen for page resize and repeat\n}\n/**\n * Utility function to escape HTML entities from a given string.\n *\n * @param unsafe {string}\n */\nfunction escapeHTML(unsafe) {\n    return unsafe\n        .replace(/&/g, \"&amp;\")\n        .replace(/</g, \"&lt;\")\n        .replace(/>/g, \"&gt;\")\n        .replace(/\"/g, \"&quot;\")\n        .replace(/'/g, \"&#039;\");\n}\n/**\n * Utility function to load dummy data\n * which will be received from the server.\n *\n * @param path {string}\n * @param callback {Function}\n */\nfunction loadJSON(path, callback) {\n    var xobj = new XMLHttpRequest();\n    xobj.overrideMimeType(\"application/json\");\n    xobj.open('GET', path, true);\n    xobj.onreadystatechange = function () {\n        if (xobj.readyState == 4 && xobj.status == 200) {\n            callback(JSON.parse(xobj.responseText));\n        }\n    };\n    xobj.send(null);\n}\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text-select/image-text-select-core.ts?");

/***/ }),

/***/ "./src/ts/source/components/image-text-select/image-text-select-define.ts":
/*!********************************************************************************!*\
  !*** ./src/ts/source/components/image-text-select/image-text-select-define.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    }\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar image_text_select_core_1 = __webpack_require__(/*! ./image-text-select-core */ \"./src/ts/source/components/image-text-select/image-text-select-core.ts\");\nvar HTMLImageTextSelectElement = /** @class */ (function (_super) {\n    __extends(HTMLImageTextSelectElement, _super);\n    function HTMLImageTextSelectElement() {\n        var _this = _super.call(this) || this;\n        _this._autoplay = false;\n        _this._controls = true;\n        _this._loop = false;\n        _this._muted = false;\n        _this._pregenerate = false;\n        _this.autoplay = (_this.getAttribute('autoplay') === 'true' ||\n            _this.getAttribute('autoplay') === '') ? true : false;\n        _this.controls = (_this.getAttribute('controls') === 'true' ||\n            _this.getAttribute('controls') === '' ||\n            _this.getAttribute('controls') === null) ? true : false;\n        _this.height = _this.getAttribute('height');\n        _this.loop = (_this.getAttribute('loop') === 'true' ||\n            _this.getAttribute('loop') === '') ? true : false;\n        _this.muted = (_this.getAttribute('muted') === 'true' ||\n            _this.getAttribute('muted') === '') ? true : false;\n        _this.poster = _this.getAttribute('poster');\n        _this.pregenerate = (_this.getAttribute('pregenerate') === 'true' ||\n            _this.getAttribute('pregenerate') === '') ? true : false;\n        _this.preload = _this.getAttribute('preload');\n        _this.source = _this.getAttribute('src') || _this.getAttribute('source');\n        _this.sources = _this.getAttribute('sources') ? _this.getAttribute('sources').split(' ') : undefined;\n        _this.width = _this.getAttribute('width');\n        image_text_select_core_1.setImage(_this);\n        return _this;\n    }\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"autoplay\", {\n        // --- Autoplay ---\n        get: function () {\n            return this._autoplay;\n        },\n        set: function (newAutoplay) {\n            this._autoplay = newAutoplay;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"controls\", {\n        // --- Controls ---\n        get: function () {\n            return this._controls;\n        },\n        set: function (newControls) {\n            this._controls = newControls;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"height\", {\n        // --- Height ---\n        get: function () {\n            return this._height;\n        },\n        set: function (newHeight) {\n            this._height = newHeight;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"loop\", {\n        // --- Loop ---\n        get: function () {\n            return this._loop;\n        },\n        set: function (newLoop) {\n            this._loop = newLoop;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"muted\", {\n        // --- Muted ---\n        get: function () {\n            return this._muted;\n        },\n        set: function (newMuted) {\n            this._muted = newMuted;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"poster\", {\n        // --- Poster ---\n        get: function () {\n            return this._poster;\n        },\n        set: function (newPoster) {\n            this._poster = newPoster;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"pregenerate\", {\n        // --- Pregenerate ---\n        get: function () {\n            return this._pregenerate;\n        },\n        set: function (newPregenerate) {\n            this._pregenerate = newPregenerate;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"preload\", {\n        // --- Preload ---\n        get: function () {\n            return this._preload;\n        },\n        set: function (newPreload) {\n            this._preload = newPreload;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"source\", {\n        // --- Source ---\n        get: function () {\n            return this._source;\n        },\n        set: function (newSource) {\n            this._source = newSource;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"sources\", {\n        // --- Sources ---\n        get: function () {\n            return this._sources;\n        },\n        set: function (newSources) {\n            this._sources = newSources;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(HTMLImageTextSelectElement.prototype, \"width\", {\n        // --- Width ---\n        get: function () {\n            return this._width;\n        },\n        set: function (newWidth) {\n            this._width = newWidth;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return HTMLImageTextSelectElement;\n}(HTMLElement));\nexports.HTMLImageTextSelectElement = HTMLImageTextSelectElement;\ncustomElements.define('image-text-select', HTMLImageTextSelectElement);\ncustomElements.define('img-text-select', HTMLImageTextSelectElement);\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text-select/image-text-select-define.ts?");

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
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    }\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar image_text_core_1 = __webpack_require__(/*! ./image-text-core */ \"./src/ts/source/components/image-text/image-text-core.ts\");\nvar HTMLImageTextElement = /** @class */ (function (_super) {\n    __extends(HTMLImageTextElement, _super);\n    function HTMLImageTextElement() {\n        var _this = _super.call(this) || this;\n        image_text_core_1.setImageText(_this);\n        return _this;\n    }\n    return HTMLImageTextElement;\n}(HTMLElement));\nexports.HTMLImageTextElement = HTMLImageTextElement;\ncustomElements.define('image-text', HTMLImageTextElement);\n\n\n//# sourceURL=webpack:///./src/ts/source/components/image-text/image-text-define.ts?");

/***/ })

/******/ });