import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'text-image-editor-button-dropdown',
    styleUrl: 'text-image-editor-button-dropdown.css',
    shadow: true
})
export class TextImageEditorButtonDropdown {
    @Prop() type: string;
    @Prop() alterStyle: string;
    @Prop() selectables: string[];
    @Prop() selected: string;
    @Prop() changeSelected: (type: string, value: string) => void;

    @Prop() toggleEditor: () => void;

    @State() toggledDropdown: boolean = false;
    @State() filtered: string[];

    componentWillLoad() {
        this.filtered = this.selectables;
    }

    toggleDropdown = () => {
        this.toggledDropdown = !this.toggledDropdown;
    }

    select = (selected: string) => {
        this.changeSelected(this.type, selected);
    }

    clickSelect = (selected: string) => {
        this.toggleDropdown();
        this.toggleEditor();
        this.select(selected);
    }

    onInput = (e: any) => {
        const value = e.target.value;
        this.select(value);
        this.filter(value);
    }

    filter = (value: string) => {
        if (value) {
            const filtered = this.selectables.filter(selectable => {
                if (selectable.toLowerCase().startsWith(value.toLowerCase())) {
                    return selectable;
                }
            });
            this.filtered = filtered;
        }

        if (value === '') {
            this.filtered = this.selectables;
        }
    }

    render() {
        return (
            <span class="text-image-editor-dropdown">
                <span class="text-image-editor-dropdown-selected">
                    <input
                        type="text"
                        value={this.selected}
                        onInput={this.onInput}
                        onClick={this.toggleDropdown}
                    />
                </span>

                {this.toggledDropdown && (
                    <span class="text-image-editor-dropdown-list">
                        <ul>
                            {this.filtered.map(select => {
                                return (
                                    <li
                                        style={{ [this.alterStyle]: select }}
                                        onClick={this.clickSelect.bind(this, select)}
                                        onMouseEnter={this.select.bind(this, select)}
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
