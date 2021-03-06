<p align="center">
    <img
        src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/identity/enhanced-image-logo.png"
        height="250px"
    >
    <br />
    <a
        target="_blank"
        href="https://www.npmjs.com/package/@plurid/enhanced-image-html"
    >
        <img
            src="https://img.shields.io/npm/v/@plurid/enhanced-image-html.svg?logo=npm&colorB=1380C3&style=for-the-badge"
            alt="Version"
        >
    </a>
    <a
        target="_blank"
        href="https://github.com/plurid/enhanced-image/blob/master/LICENSE"
    >
        <img
            src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge"
            alt="License: MIT"
        >
    </a>
</p>



<h1 align="center">
    Enhanced Image <i>for</i> HTML Custom Elements
</h1>

HTML Image Element with Enhanced Abilities


## Usage

Install from NPM

``` bash
npm install enhanced-image-html
```

or

``` bash
yarn add enhanced-image-html
```



<!-- then use in your HTML instead of the regular `<img>` tag

``` html
<enhanced-image src="/path/to/image.ext"><enhanced-image>
```

The image can be enhanced in `HTML`

``` js
<enhanced-image
    invert="1" // 0 or 1
    contrast="152" // values between 0 and 200
    hue="-47" // values between -180 and 180
    saturation="76" // values between 0 and 200
    lightness="123" // values between 0 and 200
    src="/path/to/image.ext">
<enhanced-image>
```

or programmatically in `JS`

``` js
let enhancedImage = document.querySelector('#enhanced-image-id');
enhancedImage.invert = "1"; // 0 or 1
enhancedImage.contrast = "152" // values between 0 and 200
enhancedImage.hue = "-47" // values between -180 and 180
enhancedImage.saturation = "76" // values between 0 and 200
enhancedImage.lightness = "123" // values between 0 and 200
``` -->


<!-- ## [Demo](https://caveljan.com/enhanced-image/)

Each image will have on hover an `Enhanced Image` settings button in the corner.

![alt text][on-hover]

[on-hover]: https://raw.githubusercontent.com/plurid/enhanced-image-html/master/about/demo/on-hover.png "Enhanced Image on Hover"

Clicking/tapping the button will reveal the controls.

![alt text][on-toggle]

[on-toggle]: https://raw.githubusercontent.com/plurid/enhanced-image-html/master/about/demo/on-toggle.png "Enhanced Image on Toggle"

Moving the sliders alters the image accordingly.

![alt text][on-edit]

[on-edit]: https://raw.githubusercontent.com/plurid/enhanced-image-html/master/about/demo/on-edit.png "Enhanced Image on Edit" -->
