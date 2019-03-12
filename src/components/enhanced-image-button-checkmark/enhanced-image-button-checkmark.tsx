import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'enhanced-image-button-checkmark',
    styleUrl: 'enhanced-image-button-checkmark.css',
    shadow: true
})
export class EnhancedImageButtonCheckmark {
    @Prop() toggle: (event: MouseEvent) => void;
    @Prop() text: string;
    @Prop() checked: boolean;

    render() {
        return (
            <div class="enhanced-image-button-checkmark" onClick={this.toggle}>
                <span>
                    {this.text}
                </span>
                <span class={
                    this.checked
                        ? 'enhanced-image-button-checkbox enhanced-image-button-checkbox-fill'
                        : 'enhanced-image-button-checkbox'
                    }
                >
                </span>
            </div>
        );
    }
}
