import { LitElement, html } from '@polymer/lit-element';
import { setImage } from './image-text-select-core';



export class HTMLImageTextSelectElement extends LitElement {
    private _height: string;
    private _poster: string;
    private _pregenerate: boolean = false;
    private _preload: string;
    private _source: string;
    private _sources: string[];
    private _width: string;
    private _text: string;


    static get properties() {
        return {
        };
    }

    createRenderRoot() {
        return this;
    }


    constructor() {
        super();

        this.height = this.getAttribute('height');
        this.poster = this.getAttribute('poster');
        this.pregenerate = ( this.getAttribute('pregenerate') === 'true' ||
                             this.getAttribute('pregenerate') === ''
                           ) ? true : false;
        this.preload = this.getAttribute('preload');
        this.source = this.getAttribute('src') || this.getAttribute('source');

        this.sources = this.getAttribute('sources') ? this.getAttribute('sources').split(' ') : undefined;

        this.width = this.getAttribute('width');
        this.text = this.getAttribute('text');

        console.log(JSON.parse(this.text));

        // setImage(this);
    }

    render () {
        return html`
            aaa ${ this.text }
        `;
    }



    // --- Height ---
    get height(): string {
        return this._height;
    }
    set height(newHeight: string) {
        this._height = newHeight;
    }


    // --- Poster ---
    get poster(): string {
        return this._poster;
    }
    set poster(newPoster: string) {
        this._poster = newPoster;
    }


    // --- Pregenerate ---
    get pregenerate(): boolean {
        return this._pregenerate;
    }
    set pregenerate(newPregenerate: boolean) {
        this._pregenerate = newPregenerate;
    }


    // --- Preload ---
    get preload(): string {
        return this._preload;
    }
    set preload(newPreload: string) {
        this._preload = newPreload;
    }


    // --- Source ---
    get source(): string {
        return this._source;
    }
    set source(newSource: string) {
        this._source = newSource;
    }


    // --- Sources ---
    get sources(): string[] {
        return this._sources;
    }
    set sources(newSources: string[]) {
        this._sources = newSources;
    }


    // --- Width ---
    get width(): string {
        return this._width;
    }
    set width(newWidth: string) {
        this._width = newWidth;
    }

    // --- Width ---
    get text(): string {
        return this._text;
    }
    set text(newText: string) {
        this._text = newText;
    }
}


customElements.define('image-text-select', HTMLImageTextSelectElement);
// customElements.define('img-text-select', HTMLImageTextSelectElement);
