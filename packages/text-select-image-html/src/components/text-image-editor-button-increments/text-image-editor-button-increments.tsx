import { Component, Prop, State } from '@stencil/core';



const STEP = 1;
const UP_ARROW = (<span>&#x25b2;</span>);
const DOWN_ARROW = (<span>&#x25bc;</span>);


@Component({
    tag: 'text-image-editor-button-increments',
    styleUrl: 'text-image-editor-button-increments.css',
    shadow: true,
})
export class TextImageEditorButtonIncrements {
    @Prop() private type: string;
    @Prop() private changeValue: (type: string, value: number) => void;
    @Prop() private value: number;
    @Prop() private icon: string;
    @Prop() private unit: string;
    @Prop() private step: number;

    @State() private stepValue: number;

    public componentWillLoad() {
        this.stepValue = this.step || STEP;
    }

    public render() {
        return (
            <span class="text-image-editor-button">
                <span
                    class="text-image-editor-button-icon"
                    innerHTML={this.icon}
                />
                <span class="text-image-editor-button-increments">
                    <span
                        class="text-image-editor-button-increment-button text-image-editor-button-increment-up"
                        onClick={this.changeValue.bind(this, this.type, this.round(this.value + this.stepValue))}
                    >
                        {UP_ARROW}
                    </span>
                    <span
                        class="text-image-editor-button-increment-button text-image-editor-button-increment-down"
                        onClick={this.changeValue.bind(this, this.type, this.round(this.value - this.stepValue))}
                    >
                        {DOWN_ARROW}
                    </span>
                </span>

                <input
                    type="number"
                    value={this.value}
                    step={this.stepValue}
                    onInput={this.inputChange}
                />

                <span class="text-image-editor-button-increments-unit">
                    {this.unit || 'px'}
                </span>
            </span>

        );
    }


    private inputChange = (e: any) => {
        const value = e.target.value;
        this.changeValue(this.type, value);
    }

    private round = (val: number) => {
        return Math.round(val * 100) / 100;
    }
}
