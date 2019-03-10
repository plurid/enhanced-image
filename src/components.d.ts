/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface EnhancedImage {
    /**
    * The source of the image
    */
    'src': string;
  }
  interface EnhancedImageAttributes extends StencilHTMLAttributes {
    /**
    * The source of the image
    */
    'src'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'EnhancedImage': Components.EnhancedImage;
  }

  interface StencilIntrinsicElements {
    'enhanced-image': Components.EnhancedImageAttributes;
  }


  interface HTMLEnhancedImageElement extends Components.EnhancedImage, HTMLStencilElement {}
  var HTMLEnhancedImageElement: {
    prototype: HTMLEnhancedImageElement;
    new (): HTMLEnhancedImageElement;
  };

  interface HTMLElementTagNameMap {
    'enhanced-image': HTMLEnhancedImageElement
  }

  interface ElementTagNameMap {
    'enhanced-image': HTMLEnhancedImageElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
