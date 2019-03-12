import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'enhanced-image-button-item',
    styleUrl: 'enhanced-image-button-item.css',
    shadow: true
})
export class EnhancedImageButtonItem {
    @Prop() atClick: (event: MouseEvent) => void;
    @Prop() icon: string;
    @Prop() text: string;

    render() {
        return (
            <div class="enhanced-image-button-item" onClick={this.atClick}>
                <span
                    class="enhanced-image-button-icon"
                    innerHTML={this.icon}
                />
                <span>
                    {this.text}
                </span>
            </div>
        );
    }
}
