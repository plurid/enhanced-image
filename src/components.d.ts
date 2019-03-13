/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface SelectImage {}
  interface SelectImageAttributes extends StencilHTMLAttributes {}

  interface TextImage {}
  interface TextImageAttributes extends StencilHTMLAttributes {}

  interface TextSelectImage {
    'alt': string;
    'classes': string;
    'control': boolean;
    'height': string;
    'src': string;
    'styling': string;
    'width': string;
  }
  interface TextSelectImageAttributes extends StencilHTMLAttributes {
    'alt'?: string;
    'classes'?: string;
    'control'?: boolean;
    'height'?: string;
    'src'?: string;
    'styling'?: string;
    'width'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'SelectImage': Components.SelectImage;
    'TextImage': Components.TextImage;
    'TextSelectImage': Components.TextSelectImage;
  }

  interface StencilIntrinsicElements {
    'select-image': Components.SelectImageAttributes;
    'text-image': Components.TextImageAttributes;
    'text-select-image': Components.TextSelectImageAttributes;
  }


  interface HTMLSelectImageElement extends Components.SelectImage, HTMLStencilElement {}
  var HTMLSelectImageElement: {
    prototype: HTMLSelectImageElement;
    new (): HTMLSelectImageElement;
  };

  interface HTMLTextImageElement extends Components.TextImage, HTMLStencilElement {}
  var HTMLTextImageElement: {
    prototype: HTMLTextImageElement;
    new (): HTMLTextImageElement;
  };

  interface HTMLTextSelectImageElement extends Components.TextSelectImage, HTMLStencilElement {}
  var HTMLTextSelectImageElement: {
    prototype: HTMLTextSelectImageElement;
    new (): HTMLTextSelectImageElement;
  };

  interface HTMLElementTagNameMap {
    'select-image': HTMLSelectImageElement
    'text-image': HTMLTextImageElement
    'text-select-image': HTMLTextSelectImageElement
  }

  interface ElementTagNameMap {
    'select-image': HTMLSelectImageElement;
    'text-image': HTMLTextImageElement;
    'text-select-image': HTMLTextSelectImageElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
