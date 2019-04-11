import { Component, Prop } from '@stencil/core';



@Component({
    tag: 'text-select-image-button-checkmark',
    styleUrl: 'text-select-image-button-checkmark.css',
    shadow: true
})
export class TextSelectImageButtonCheckmark {
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
