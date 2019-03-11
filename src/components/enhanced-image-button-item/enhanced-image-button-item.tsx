import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'enhanced-image-button-item',
    styleUrl: 'enhanced-image-button-item.css',
    shadow: true
})
export class EnhancedImageButtonItem {
    @Prop() onClick: (event: MouseEvent) => void;
    @Prop() text: string;

    render() {
        return (
            <div class="enhanced-image-settings-list-button" onClick={this.onClick}>
                {this.text}
            </div>
        );
    }
}
