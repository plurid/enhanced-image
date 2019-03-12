<p align="center">
    <img src="https://raw.githubusercontent.com/plurid/text-select-image-html/master/about/identity/TSI-logo.png" height="250px">
    <br />
    <a target="_blank" href="https://www.npmjs.com/package/text-select-image-html">
        <img src="https://img.shields.io/npm/v/text-select-image-html.svg?logo=npm&colorB=1380C3&style=for-the-badge" alt="Version">
    </a>
    <a target="_blank" href="https://travis-ci.org/plurid/text-select-image-html">
        <img src="https://img.shields.io/travis/plurid/text-select-image-html.svg?logo=travis&colorB=1380C3&style=for-the-badge" alt="Build Status">
    </a>
    <a target="_blank" href="https://github.com/plurid/text-select-image-html/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-blue.svg?colorB=1380C3&style=for-the-badge" alt="License: MIT">
    </a>
</p>


<h1 align="center">
    Text Select Image <i>for</i> HTML Custom Elements
</h1>


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

The HTML Element `<text-select-image>` has a `src` attribute which indicates the location of the image, but can also have a `text` attribute which contains a machine-generated `JavaScript` object detailing the text content and the text characteristics (position, size, and more).

The text content can be obtained through machine analysis or can be provided by the user.



## Technology

The image is analysed and established if it contains text. If it does, the location of the text (x, y coordinates) is registered and over the image is placed a transparent div, cotaining exactly the text from the image. The text from the image appears like it is truly selectable.



## Usage

### Setup

Add the `image-text-select` script to the application (or install with `npm`).

    npm install text-select-image-html

Use the `<image-text-select>` HTML Element, passing in the `src` and `text` attributes.


### HTML text-select-image Element
