<p align="center">
    <img
        src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/identity/enhanced-image-logo.png"
        height="250px"
    >
    <br />
    <br />
    <a
        target="_blank"
        href="https://github.com/plurid/enhanced-image/blob/master/packages/enhanced-image-io/javascript/LICENSE"
    >
        <img
            src="https://img.shields.io/badge/license-DEL-blue.svg?colorB=1380C3&style=for-the-badge"
            alt="License: DEL"
        >
    </a>
</p>



<h1
    align="center"
>
    Enhanced Image Input/Output
</h1>



<h3
    align="center"
>
    Image with Enhanced Abilities
</h3>



<br />



The `enhaced image input/output` package provides utility for the enhanced image format [`.eimg`](https://github.com/plurid/enhanced-image/tree/master/packages/enhanced-image-format).


### Contents

+ [Install](#install)
+ [Usage](#usage)
+ [Features](#features)
+ [Viewing](#viewing)
+ [Depict](#depict)
+ [Packages](#Packages)



## Install

To install the `enhaced image input/output` package run

```
npm install @plurid/enhanced-image-io
```

or

```
yarn add @plurid/enhanced-image-io
```



## Usage

Import `Reader` and `Writer` and use accordingly.

``` typescript
import {
    promises as fs,
} from 'fs';

import {
    // Objects.
    Reader,
    Writer,

    // Interface.
    PartialHeader,
} from '@plurid/enhanced-image-io`;


// Local paths to images.
const jpgImage = '/path/to/jpg/image';
const eimgImage = '/path/to/eimg/image';


const main = async () => {
    // Reading an .eimg and writing the image it enhances to a separate file.
    {
        const reader = new Reader(eimgImage);
        const data = await reader.read();

        // use the header data
        console.log('eimg header', data.header);

        const jpgPath = 'eimg.jpg';

        await fs.writeFile(
            jpgPath,
            data.image,
        );
    }

    // Writing an .eimg from a .jpg with a custom header.
    {
        const customHeader: PartialHeader = {
            // ...
            // header data
            // ...
        };

        const image = await fs.readFile(jpgImage);

        const writer = new Writer(
            customHeader,
            image,
        );

        const eimgPath = 'jpg.eimg';
        const result = await writer.write(
            eimgPath,
        );

        if (result) {
            console.log('Enhanced Image written succesfully.');
        } else {
            console.log('Enhanced Image written unsuccesfully.');
        }
    }
}


main();
```



## Features

<p
    align="center"
>
    change the colors of the image
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/screenshots/ss-1-bless.png" height="500px">
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/screenshots/ss-2-bless.png" height="500px">
</p>


<p
    align="center"
>
    extract and select the image text
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/screenshots/ss-3-bless.png" height="500px">
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/screenshots/ss-4-bless.png" height="500px">
</p>



## Viewing

Enhanced Images can be viewed natively using the [viewer](https://github.com/plurid/viewer) application.

Enhanced Images can be viewed in browser using the browser extension:

+ [Chrome Extension][chrome] • [source][enhanced-image-chrome]

[chrome]: https://chrome.google.com/webstore/detail/enhanced-image/pdcicakelecpcnchbbnkonjpmhagcbnm

[enhanced-image-chrome]: https://github.com/plurid/enhanced-image/tree/master/packages/enhanced-image-chrome



## Depict

Enhanced Image uses plurid's [depict][depict] services for text extraction. A custom API endpoint can be used, provided it uses GraphQL and implements the schema.

[depict]: https://plurid.com/depict



## Packages

<a target="_blank" href="https://www.npmjs.com/package/@plurid/enhanced-image-react">
    <img src="https://img.shields.io/npm/v/@plurid/enhanced-image-react.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/enhanced-image-react][enhanced-image-react] • implementation for `React`

[enhanced-image-react]: https://github.com/plurid/enhanced-image/tree/master/packages/enhanced-image-react



<a target="_blank" href="https://www.npmjs.com/package/@plurid/enhanced-image-io">
    <img src="https://img.shields.io/npm/v/@plurid/enhanced-image-io.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
</a>

[@plurid/enhanced-image-io][enhanced-image-io] • input/output operations

[enhanced-image-io]: https://github.com/plurid/enhanced-image/tree/master/packages/enhanced-image-io
