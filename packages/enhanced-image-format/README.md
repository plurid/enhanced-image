<p align="center">
    <img
        src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/identity/enhanced-image-logo.png"
        height="250px"
    >
    <br />
    <br />
    <a
        target="_blank"
        href="https://github.com/plurid/enhanced-image/blob/master/packages/enhanced-image-format/LICENSE"
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
    Enhanced Image Format
</h1>



<h3
    align="center"
>
    Image with Enhanced Abilities
</h3>



<br />



### Contents

+ [About](#about)
+ [Exampe](#example)



## About

An `Enhanced Image` file format has the file extension `.eimg` and is a decorating wrapper around the known image formats (`.png`, `.jpeg`, `.webp`, etc.).

The Enhanced Image file format is comprised of the `header` and the `image` data.

The `header` starts on the first line with

```
--- eimg.format
```

and ends with

```
eimg.format ---
```

The format can be `.deon` or `.json`.

Within the start and end of the header is the header `data` which implements the recursive partial interface `Header`

``` typescript
interface Header {
    type: string; // `png`, `jpeg`, `webp`, etc.
    height: number; // the natural `height` of the image
    width: number; // the natural `width` of the image
    defaults: {
        font: TextlineFont;
        color: string;
        transform: {
            // ...
        };
    };
    text: Text[];
}

interface Text {
    id: string;

    position: {
        x: number; // x position percent
        y: number; // y position percent
    };

    transform: {
        perspective: number;
        rx: number; // x rotation
        ry: number; // y rotation
        rz: number; // z rotation
        sx: number; // x skew
        sy: number; // y skew
    };

    viewable: boolean;

    data: {
        type: 'TEXTLINE';

        font: TextlineFont;
        color: string;
        content: string;
        transview: TextlineTransview;
        link: TextlineLink;
        action: TextlineAction;
    } | {
        type: 'TEXTAREA';
        content: string;
        [key: string]: any;
    };
}
```

On the next line after the header end the image data starts based on it's type.



## Example

An `.emg` hex dump example of a `.png` enhanced image (full header and six lines of the `.png` data) \[`./example/enhanced-image-from-png.eimg`\]:

``` emg
00000000: 2d2d 2d20 6569 6d67 2e64 656f 6e0a 7b0a  --- eimg.deon.{.
00000010: 7479 7065 2070 6e67 0a74 6578 7420 5b0a  type png.text [.
00000020: 7b0a 6964 2031 0a70 6f73 6974 696f 6e20  {.id 1.position
00000030: 7b0a 7820 3130 0a79 2031 300a 7d0a 6461  {.x 10.y 10.}.da
00000040: 7461 207b 0a74 7970 6520 5445 5854 4c49  ta {.type TEXTLI
00000050: 4e45 0a63 6f6e 7465 6e74 2027 536f 6d65  NE.content 'Some
00000060: 2074 6578 7427 0a7d 0a7d 0a7b 0a69 6420   text'.}.}.{.id
00000070: 320a 706f 7369 7469 6f6e 207b 0a78 2031  2.position {.x 1
00000080: 350a 7920 3135 0a7d 0a64 6174 6120 7b0a  5.y 15.}.data {.
00000090: 7479 7065 2054 4558 544c 494e 450a 636f  type TEXTLINE.co
000000a0: 6e74 656e 7420 2753 6f6d 6520 6f74 6865  ntent 'Some othe
000000b0: 7220 7465 7874 270a 7d0a 7d0a 5d0a 7d0a  r text'.}.}.].}.
000000c0: 6569 6d67 2e64 656f 6e20 2d2d 2d0a 8950  eimg.deon ---..P
000000d0: 4e47 0d0a 1a0a 0000 000d 4948 4452 0000  NG........IHDR..
000000e0: 049c 0000 049c 0806 0000 00ce 2e95 dc00  ................
000000f0: 0001 2669 4343 5041 7070 6c65 2052 4742  ..&iCCPApple RGB
00000100: 0000 28cf ad91 bd4a c350 1886 9fd3 8a82  ..(....J.P......
00000110: 4310 096e c2c1 415c c49f ad63 d296 2238  C..n..A\...c.."8
```

The header is `condensed` and has the value

``` deon
{
    type png
    text [
        {
            id 1
            position {
                x 10
                y 10
            }
            data {
                type TEXTLINE
                content 'Some text'
            }
        }
        {
            id 2
            position {
                x 15
                y 15
            }
            data {
                type TEXTLINE
                content 'Some other text'
            }
        }
    ]
}
```
