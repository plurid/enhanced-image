<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/text-select-image/master/about/identity/TSI-logo.png" height="250px">
    <br />
    <a target="_blank" href="https://github.com/plurid/text-select-image/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>


<h1 align="center">
    Text Select Image
</h1>


HTML Specialized Element for displaying an image and allowing for the selection of the text the image contains.


+ [Concept](#concept)
    + [Current State](#current-state)
    + [Proposal](#proposal)
+ [Demo](#demo)
+ [Technology](#technology)
+ [Usage](#usage)
    + [Setup](#setup)
    + [HTML image-text-select Element](#html-image-text-select-element)



## Concept

### Current State

An image is displayed in the browser using the `<img>` tag. The `<img>` HTML Element has an attribute, `src`, which indicates the location of the image to be displayed.


### Proposal

The HTML Element `<text-select-image>` has a `src` attribute which indicates the location of the image, but can also have a `text` attribute which contains a machine-generated `JavaScript` object detailing the text content and the text characteristics (position, size, and more).

The text content can be obtained through machine analysis or can be provided by the user through the interface.


## [Demo](https://caveljan.com/text-select-image/)

Select the text from the image.

![Text Select from Image][text-select]

[text-select]: https://raw.githubusercontent.com/plurid/text-select-image/master/about/demo/text-select.png

Edit the text as admin.

![Edit][edit]

[edit]: https://raw.githubusercontent.com/plurid/text-select-image/master/about/demo/edit.png

![Text Editor][hover]

[hover]: https://raw.githubusercontent.com/plurid/text-select-image/master/about/demo/hover.png



## Technology

The image is analysed and established if it contains text. If it does, the location of the text (x, y coordinates) is registered and over the image is placed a transparent div, containing exactly the text from the image. The text from the image appears like it is truly selectable.
