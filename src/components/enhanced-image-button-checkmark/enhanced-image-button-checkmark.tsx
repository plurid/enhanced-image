import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'enhanced-image-button-checkmark',
    styleUrl: 'enhanced-image-button-checkmark.css',
    shadow: true
})
export class EnhancedImageButtonCheckmark {
    @Prop() onClick: (event: MouseEvent) => void;
    @Prop() text: string;
    @Prop() checked: boolean;

    render() {
        return (
            <div class="enhanced-image-settings-list-button" onClick={this.onClick}>
                {this.text}
                <span class="slider-value">
                    <span class={ this.checked
                                    ? 'checkbox checkbox-fill'
                                    : 'checkbox' }
                    >
                    </span>
                </span>
            </div>
        );
    }
}
