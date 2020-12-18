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



The Enhanced Image file format has the file extension `.emg` and is a wrapper around the known image formats (`.png`, `.jpeg`, `.webp`, etc.).

The Enhanced Image file format is comprised of the `header` and the `image` data.

The `header` starts on the first line with

```
--- emg.format
```

and ends with

```
emg.format ---
```

The format can be `.deon` or `.json`.

Within the header start and end is the header `data` which implements the recursive partial interface `Header`

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

An `.emg` hex dump example of a `.png` enhanced image (full header and six lines of the `.png` data):

``` emg
00000000: 2d2d 2d20 656d 672e 6465 6f6e 0a7b 0a74  --- emg.deon.{.t
00000010: 7970 6520 706e 670a 7465 7874 205b 0a7b  ype png.text [.{
00000020: 0a69 6420 310a 706f 7369 7469 6f6e 207b  .id 1.position {
00000030: 0a78 2031 300a 7920 3130 0a7d 0a64 6174  .x 10.y 10.}.dat
00000040: 6120 7b0a 7479 7065 2054 4558 544c 494e  a {.type TEXTLIN
00000050: 450a 636f 6e74 656e 7420 2753 6f6d 6520  E.content 'Some
00000060: 7465 7874 270a 7d0a 7d0a 7b0a 6964 2032  text'.}.}.{.id 2
00000070: 0a70 6f73 6974 696f 6e20 7b0a 7820 3135  .position {.x 15
00000080: 0a79 2031 350a 7d0a 6461 7461 207b 0a74  .y 15.}.data {.t
00000090: 7970 6520 5445 5854 4c49 4e45 0a63 6f6e  ype TEXTLINE.con
000000a0: 7465 6e74 2027 536f 6d65 206f 7468 6572  tent 'Some other
000000b0: 2074 6578 7427 0a7d 0a7d 0a5d 0a7d 0a65   text'.}.}.].}.e
000000c0: 6d67 2e64 656f 6e20 2d2d 2d0a 8950 4e47  mg.deon ---..PNG
000000d0: 0d0a 1a0a 0000 000d 4948 4452 0000 0c20  ........IHDR...
000000e0: 0000 07e8 0806 0000 0041 7c4a 6400 000c  .........A|Jd...
000000f0: 6569 4343 5049 4343 2050 726f 6669 6c65  eiCCPICC Profile
00000100: 0000 4889 9597 075c 9347 1bc0 ef1d 9924  ..H....\.G.....$
00000110: ac40 1832 c25e a2c8 0c20 2384 1541 4036  .@.2.^... #..A@6
```

The header is condensed and has the value

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
