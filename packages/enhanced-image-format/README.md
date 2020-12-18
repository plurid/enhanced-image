<p align="center">
    <img
        src="https://raw.githubusercontent.com/plurid/enhanced-image/master/about/assets/identity/enhanced-image-logo.png"
        height="250px"
    >
    <br />
    <a
        target="_blank"
        href="https://github.com/plurid/enhanced-image/blob/master/LICENSE"
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

<p
    align="center"
>
    Image with Enhanced Abilities
</p>



The Enhanced Image file format has the file extension `.emg` and is a wrapper around the known image formats.

The Enhanced Image file format is comprised of the `header` and the `image` data.

The `header` starts on the first line with

```
--- header.format
```

and ends with

```
header.format ---
```

The format can be `.deon` or `.json`.

Within the header start and end is the header `data` which follows the interface

``` typescript
interface HeaderData {
    type: string; // 'png', 'jpeg', 'webp', etc.
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
}
```

On the next line after the header end the image data starts based on it's type.

An `.emg` hex dump example of a `.png` enhanced image (full header and four lines of the `.png` data):

``` emg
00000000: 2d2d 2d20 6865 6164 6572 2e64 656f 6e0a  --- header.deon.
00000010: 7b0a 7479 7065 2070 6e67 0a74 6578 7420  {.type png.text
00000020: 5b0a 7b0a 6964 2031 0a76 616c 7565 2027  [.{.id 1.value '
00000030: 536f 6d65 2074 6578 7427 0a70 6f73 6974  Some text'.posit
00000040: 696f 6e20 7b0a 7820 3130 0a79 2031 300a  ion {.x 10.y 10.
00000050: 7d0a 7d0a 7b0a 6964 2032 0a76 616c 7565  }.}.{.id 2.value
00000060: 2027 536f 6d65 206f 7468 6572 2074 6578   'Some other tex
00000070: 7427 0a70 6f73 6974 696f 6e20 7b0a 7820  t'.position {.x
00000080: 3135 0a79 2031 350a 7d0a 7d0a 5d0a 7d0a  15.y 15.}.}.].}.
00000090: 6865 6164 6572 2e64 656f 6e20 2d2d 2d0a  header.deon ---.
000000a0: 8950 4e47 0d0a 1a0a 0000 000d 4948 4452  .PNG........IHDR
000000b0: 0000 0c20 0000 07e8 0806 0000 0041 7c4a  ... .........A|J
000000c0: 6400 000c 6569 4343 5049 4343 2050 726f  d...eiCCPICC Pro
000000d0: 6669 6c65 0000 4889 9597 075c 9347 1bc0  file..H....\.G..
```

The header is condensed and has the value

``` deon
{
    type png
    text [
        {
            id 1
            value 'Some text'
            position {
                x 10
                y 10
            }
        }
        {
            id 2
            value 'Some other text'
            position {
                x 15
                y 15
            }
        }
    ]
}
```
