/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  ITextImage,
  ITextSelectImageData,
} from './interfaces/image-text';


export namespace Components {

  interface SelectImage {
    'editable': boolean;
    'imageWidth': number;
    'selectText': ITextSelectImageData;
    'textSelectImage': any;
  }
  interface SelectImageAttributes extends StencilHTMLAttributes {
    'editable'?: boolean;
    'imageWidth'?: number;
    'selectText'?: ITextSelectImageData;
    'textSelectImage'?: any;
  }

  interface TextImageEditorButtonDropdown {
    'alterStyle': string;
    'changeSelected': (type: string, value: string) => void;
    'selectables': string[];
    'selected': string;
    'toggleEditor': () => void;
    'type': string;
  }
  interface TextImageEditorButtonDropdownAttributes extends StencilHTMLAttributes {
    'alterStyle'?: string;
    'changeSelected'?: (type: string, value: string) => void;
    'selectables'?: string[];
    'selected'?: string;
    'toggleEditor'?: () => void;
    'type'?: string;
  }

  interface TextImageEditorButtonIncrements {
    'changeValue': (type: string, value: number) => void;
    'icon': string;
    'step': number;
    'type': string;
    'unit': string;
    'value': number;
  }
  interface TextImageEditorButtonIncrementsAttributes extends StencilHTMLAttributes {
    'changeValue'?: (type: string, value: number) => void;
    'icon'?: string;
    'step'?: number;
    'type'?: string;
    'unit'?: string;
    'value'?: number;
  }

  interface TextImageEditorButtonToggle {
    'icon': string;
    'toggle': () => void;
    'toggled': boolean;
  }
  interface TextImageEditorButtonToggleAttributes extends StencilHTMLAttributes {
    'icon'?: string;
    'toggle'?: () => void;
    'toggled'?: boolean;
  }

  interface TextImageEditor {
    'changeValue': (type: string, value: number | string) => void;
    'colorValue': string;
    'draggable': boolean;
    'fontFamilyValue': string;
    'fontSizeValue': number;
    'letterSpacingValue': number;
    'selectableFonts': string[];
    'textBold': boolean;
    'textEditable': boolean;
    'textItalic': boolean;
    'toggleDraggable': () => void;
    'toggleEditor': () => void;
    'toggleElement': (element: string) => void;
    'toggleTextEditable': () => void;
    'wordSpacingValue': number;
  }
  interface TextImageEditorAttributes extends StencilHTMLAttributes {
    'changeValue'?: (type: string, value: number | string) => void;
    'colorValue'?: string;
    'draggable'?: boolean;
    'fontFamilyValue'?: string;
    'fontSizeValue'?: number;
    'letterSpacingValue'?: number;
    'selectableFonts'?: string[];
    'textBold'?: boolean;
    'textEditable'?: boolean;
    'textItalic'?: boolean;
    'toggleDraggable'?: () => void;
    'toggleEditor'?: () => void;
    'toggleElement'?: (element: string) => void;
    'toggleTextEditable'?: () => void;
    'wordSpacingValue'?: number;
  }

  interface TextImage {
    'editable': boolean;
    'imageWidth': number;
    'text': ITextImage;
    'textSelectImage': any;
  }
  interface TextImageAttributes extends StencilHTMLAttributes {
    'editable'?: boolean;
    'imageWidth'?: number;
    'text'?: ITextImage;
    'textSelectImage'?: any;
  }

  interface TextSelectImageButtonCheckmark {
    'checked': boolean;
    'text': string;
    'toggle': (event: MouseEvent) => void;
  }
  interface TextSelectImageButtonCheckmarkAttributes extends StencilHTMLAttributes {
    'checked'?: boolean;
    'text'?: string;
    'toggle'?: (event: MouseEvent) => void;
  }

  interface TextSelectImageButtonItem {
    'atClick': (event: MouseEvent) => void;
    'icon': string;
    'text': string;
  }
  interface TextSelectImageButtonItemAttributes extends StencilHTMLAttributes {
    'atClick'?: (event: MouseEvent) => void;
    'icon'?: string;
    'text'?: string;
  }

  interface TextSelectImageSettingsMenu {
    'editable': boolean;
    'toggleEditable': () => void;
    'toggleMenu': () => void;
  }
  interface TextSelectImageSettingsMenuAttributes extends StencilHTMLAttributes {
    'editable'?: boolean;
    'toggleEditable'?: () => void;
    'toggleMenu'?: () => void;
  }

  interface TextSelectImageSettings {
    'editable': boolean;
    'toggleEditable': () => void;
    'toggleSettings': () => void;
    'toggledSettings': boolean;
  }
  interface TextSelectImageSettingsAttributes extends StencilHTMLAttributes {
    'editable'?: boolean;
    'toggleEditable'?: () => void;
    'toggleSettings'?: () => void;
    'toggledSettings'?: boolean;
  }

  interface TextSelectImage {
    'alt': string;
    'classes': string;
    'control': boolean;
    'height': string;
    'src': string;
    'styling': string;
    'textData': string;
    'width': string;
  }
  interface TextSelectImageAttributes extends StencilHTMLAttributes {
    'alt'?: string;
    'classes'?: string;
    'control'?: boolean;
    'height'?: string;
    'src'?: string;
    'styling'?: string;
    'textData'?: string;
    'width'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'SelectImage': Components.SelectImage;
    'TextImageEditorButtonDropdown': Components.TextImageEditorButtonDropdown;
    'TextImageEditorButtonIncrements': Components.TextImageEditorButtonIncrements;
    'TextImageEditorButtonToggle': Components.TextImageEditorButtonToggle;
    'TextImageEditor': Components.TextImageEditor;
    'TextImage': Components.TextImage;
    'TextSelectImageButtonCheckmark': Components.TextSelectImageButtonCheckmark;
    'TextSelectImageButtonItem': Components.TextSelectImageButtonItem;
    'TextSelectImageSettingsMenu': Components.TextSelectImageSettingsMenu;
    'TextSelectImageSettings': Components.TextSelectImageSettings;
    'TextSelectImage': Components.TextSelectImage;
  }

  interface StencilIntrinsicElements {
    'select-image': Components.SelectImageAttributes;
    'text-image-editor-button-dropdown': Components.TextImageEditorButtonDropdownAttributes;
    'text-image-editor-button-increments': Components.TextImageEditorButtonIncrementsAttributes;
    'text-image-editor-button-toggle': Components.TextImageEditorButtonToggleAttributes;
    'text-image-editor': Components.TextImageEditorAttributes;
    'text-image': Components.TextImageAttributes;
    'text-select-image-button-checkmark': Components.TextSelectImageButtonCheckmarkAttributes;
    'text-select-image-button-item': Components.TextSelectImageButtonItemAttributes;
    'text-select-image-settings-menu': Components.TextSelectImageSettingsMenuAttributes;
    'text-select-image-settings': Components.TextSelectImageSettingsAttributes;
    'text-select-image': Components.TextSelectImageAttributes;
  }


  interface HTMLSelectImageElement extends Components.SelectImage, HTMLStencilElement {}
  var HTMLSelectImageElement: {
    prototype: HTMLSelectImageElement;
    new (): HTMLSelectImageElement;
  };

  interface HTMLTextImageEditorButtonDropdownElement extends Components.TextImageEditorButtonDropdown, HTMLStencilElement {}
  var HTMLTextImageEditorButtonDropdownElement: {
    prototype: HTMLTextImageEditorButtonDropdownElement;
    new (): HTMLTextImageEditorButtonDropdownElement;
  };

  interface HTMLTextImageEditorButtonIncrementsElement extends Components.TextImageEditorButtonIncrements, HTMLStencilElement {}
  var HTMLTextImageEditorButtonIncrementsElement: {
    prototype: HTMLTextImageEditorButtonIncrementsElement;
    new (): HTMLTextImageEditorButtonIncrementsElement;
  };

  interface HTMLTextImageEditorButtonToggleElement extends Components.TextImageEditorButtonToggle, HTMLStencilElement {}
  var HTMLTextImageEditorButtonToggleElement: {
    prototype: HTMLTextImageEditorButtonToggleElement;
    new (): HTMLTextImageEditorButtonToggleElement;
  };

  interface HTMLTextImageEditorElement extends Components.TextImageEditor, HTMLStencilElement {}
  var HTMLTextImageEditorElement: {
    prototype: HTMLTextImageEditorElement;
    new (): HTMLTextImageEditorElement;
  };

  interface HTMLTextImageElement extends Components.TextImage, HTMLStencilElement {}
  var HTMLTextImageElement: {
    prototype: HTMLTextImageElement;
    new (): HTMLTextImageElement;
  };

  interface HTMLTextSelectImageButtonCheckmarkElement extends Components.TextSelectImageButtonCheckmark, HTMLStencilElement {}
  var HTMLTextSelectImageButtonCheckmarkElement: {
    prototype: HTMLTextSelectImageButtonCheckmarkElement;
    new (): HTMLTextSelectImageButtonCheckmarkElement;
  };

  interface HTMLTextSelectImageButtonItemElement extends Components.TextSelectImageButtonItem, HTMLStencilElement {}
  var HTMLTextSelectImageButtonItemElement: {
    prototype: HTMLTextSelectImageButtonItemElement;
    new (): HTMLTextSelectImageButtonItemElement;
  };

  interface HTMLTextSelectImageSettingsMenuElement extends Components.TextSelectImageSettingsMenu, HTMLStencilElement {}
  var HTMLTextSelectImageSettingsMenuElement: {
    prototype: HTMLTextSelectImageSettingsMenuElement;
    new (): HTMLTextSelectImageSettingsMenuElement;
  };

  interface HTMLTextSelectImageSettingsElement extends Components.TextSelectImageSettings, HTMLStencilElement {}
  var HTMLTextSelectImageSettingsElement: {
    prototype: HTMLTextSelectImageSettingsElement;
    new (): HTMLTextSelectImageSettingsElement;
  };

  interface HTMLTextSelectImageElement extends Components.TextSelectImage, HTMLStencilElement {}
  var HTMLTextSelectImageElement: {
    prototype: HTMLTextSelectImageElement;
    new (): HTMLTextSelectImageElement;
  };

  interface HTMLElementTagNameMap {
    'select-image': HTMLSelectImageElement
    'text-image-editor-button-dropdown': HTMLTextImageEditorButtonDropdownElement
    'text-image-editor-button-increments': HTMLTextImageEditorButtonIncrementsElement
    'text-image-editor-button-toggle': HTMLTextImageEditorButtonToggleElement
    'text-image-editor': HTMLTextImageEditorElement
    'text-image': HTMLTextImageElement
    'text-select-image-button-checkmark': HTMLTextSelectImageButtonCheckmarkElement
    'text-select-image-button-item': HTMLTextSelectImageButtonItemElement
    'text-select-image-settings-menu': HTMLTextSelectImageSettingsMenuElement
    'text-select-image-settings': HTMLTextSelectImageSettingsElement
    'text-select-image': HTMLTextSelectImageElement
  }

  interface ElementTagNameMap {
    'select-image': HTMLSelectImageElement;
    'text-image-editor-button-dropdown': HTMLTextImageEditorButtonDropdownElement;
    'text-image-editor-button-increments': HTMLTextImageEditorButtonIncrementsElement;
    'text-image-editor-button-toggle': HTMLTextImageEditorButtonToggleElement;
    'text-image-editor': HTMLTextImageEditorElement;
    'text-image': HTMLTextImageElement;
    'text-select-image-button-checkmark': HTMLTextSelectImageButtonCheckmarkElement;
    'text-select-image-button-item': HTMLTextSelectImageButtonItemElement;
    'text-select-image-settings-menu': HTMLTextSelectImageSettingsMenuElement;
    'text-select-image-settings': HTMLTextSelectImageSettingsElement;
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
