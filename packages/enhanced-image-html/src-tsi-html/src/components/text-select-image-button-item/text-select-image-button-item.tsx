import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'text-select-image-button-item',
    styleUrl: 'text-select-image-button-item.css',
    shadow: true,
})
export class TextSelectImageButtonItem {
    @Prop() private atClick: (event: MouseEvent) => void;
    @Prop() private icon: string;
    @Prop() private text: string;

    public render() {
        return (
            <div class="text-select-image-button-item" onClick={this.atClick}>
                <span
                    class="text-select-image-button-icon"
                    innerHTML={this.icon}
                />
                <span>
                    {this.text}
                </span>
            </div>
        );
    }
}
