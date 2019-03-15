import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'text-image-editor-button-dropdown',
    styleUrl: 'text-image-editor-button-dropdown.css',
    shadow: true
})
export class TextImageEditor {
    @Prop() type: string;
    @Prop() alterStyle: string;
    @Prop() selectable: string[];
    @Prop() selected: string;
    @Prop() changeSelected: (type: string, value: string) => void;

    @State() toggledDropdown: boolean = false;

    toggleDropdown = () => {
        this.toggledDropdown = !this.toggledDropdown;
    }

    select = (selected: string) => {
        this.changeSelected(this.type, selected);
    }

    onInput = (e: any) => {
        this.select(e.target.value);
    }

    render() {
        return (
            <span class="text-image-editor-dropdown"
            >
                <span class="text-image-editor-dropdown-selected">
                    <input
                        type="text"
                        value={this.selected}
                        onInput={this.onInput}
                        onFocus={this.toggleDropdown}
                    />
                </span>

                {this.toggledDropdown && (
                    <span class="text-image-editor-dropdown-list">
                        <ul>
                            {this.selectable.map(select => {
                                return (
                                    <li
                                        style={{ [this.alterStyle]: select }}
                                        onClick={this.select.bind(this, select)}
                                    >
                                        {select}
                                    </li>
                                );
                            })}
                        </ul>
                    </span>
                )}
            </span>
        );
    }
}
