import { Component, Prop, State } from '@stencil/core';



@Component({
    tag: 'text-select-image',
    styleUrl: 'text-select-image.css',
    shadow: false
})
export class TextSelectImage {
    @Prop() src: string;
    @Prop() alt: string;
    @Prop() height: string;
    @Prop() width: string;
    @Prop() classes: string;
    @Prop() styling: string;

    @Prop() control: boolean;

    @State() styled: any;
    @State() showControl: boolean;

    componentWillLoad() {
        this.control ? this.showControl = this.control : this.showControl = false;
    }

    render() {
        return (
            <div>
                <img src={this.src} alt={this.alt || ''} />
                <select-image />
            </div>
        );
    }
}
