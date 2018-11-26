<p align="center">
    <img src="./about/identity/ITS-logo.png" height="200px">
</p>



# Image Text Select

HTML Specialized Element for displaying an image and allowing for the selection of the text the image contains.


+ [Concept](#concept)
    + [Current State](#current-state)
    + [Proposal](#proposal)
+ [Technology](#technology)
+ [Usage](#usage)
    + [Setup](#setup)
    + [HTML image-text-select Element](#html-image-text-select-element)



## Concept

### Current State

An image is displayed in the browser using the `<img>` tag. The `<img>` HTML Element has an attribute, `src`, which indicates the location of the image to be displayed.


### Proposal

The HTML Element `<image-text-select>` has a `src` attribute which indicates the location of the image, but can also have a `text` attribute which contains a machine-generated `JavaScript` object detailing the text content and the text characteristics (position, size, and more).

The text content can be obtained through machine analysis or can be provided by the user.



## Technology

The image is analysed and established if it contains text. If it does, the location of the text (x, y coordinates) is registered and over the image is placed a transparent div, cotaining exactly the text from the image. The text from the image appears like it is truly selectable.



## Usage

### Setup

Add the `image-text-select` script to the application (or install with `npm`).

    npm install image-text-select

Use the `<image-text-select>` HTML Element, passing in the `src` and `text` attributes.


### HTML image-text-select Element
