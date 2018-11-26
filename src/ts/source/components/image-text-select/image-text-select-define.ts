import { setImage } from './image-text-select-core';



export class HTMLImageTextSelectElement extends HTMLElement {
    private _autoplay: boolean = false;
    private _controls: boolean = true;
    private _height: string;
    private _loop: boolean = false;
    private _muted: boolean = false;
    private _poster: string;
    private _pregenerate: boolean = false;
    private _preload: string;
    private _source: string;
    private _sources: string[];
    private _width: string;


    constructor() {
        super();

        this.autoplay = ( this.getAttribute('autoplay') === 'true' ||
                          this.getAttribute('autoplay') === ''
                        ) ? true : false;
        this.controls = ( this.getAttribute('controls') === 'true' ||
                          this.getAttribute('controls') === '' ||
                          this.getAttribute('controls') === null
                        ) ? true : false;
        this.height = this.getAttribute('height');
        this.loop = ( this.getAttribute('loop') === 'true' ||
                      this.getAttribute('loop') === ''
                    ) ? true : false;
        this.muted = ( this.getAttribute('muted') === 'true' ||
                       this.getAttribute('muted') === ''
                     ) ? true : false;
        this.poster = this.getAttribute('poster');
        this.pregenerate = ( this.getAttribute('pregenerate') === 'true' ||
                             this.getAttribute('pregenerate') === ''
                           ) ? true : false;
        this.preload = this.getAttribute('preload');
        this.source = this.getAttribute('src') || this.getAttribute('source');

        this.sources = this.getAttribute('sources') ? this.getAttribute('sources').split(' ') : undefined;

        this.width = this.getAttribute('width');

        setImage(this);
    }


    // --- Autoplay ---
    get autoplay(): boolean {
        return this._autoplay;
    }
    set autoplay(newAutoplay: boolean) {
        this._autoplay = newAutoplay;
    }


    // --- Controls ---
    get controls(): boolean {
        return this._controls;
    }
    set controls(newControls: boolean) {
        this._controls = newControls;
    }


    // --- Height ---
    get height(): string {
        return this._height;
    }
    set height(newHeight: string) {
        this._height = newHeight;
    }

    // --- Loop ---
    get loop(): boolean {
        return this._loop;
    }
    set loop(newLoop: boolean) {
        this._loop = newLoop;
    }


    // --- Muted ---
    get muted(): boolean {
        return this._muted;
    }
    set muted(newMuted: boolean) {
        this._muted = newMuted;
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
}


customElements.define('image-text-select', HTMLImageTextSelectElement);
// customElements.define('img-text-select', HTMLImageTextSelectElement);
