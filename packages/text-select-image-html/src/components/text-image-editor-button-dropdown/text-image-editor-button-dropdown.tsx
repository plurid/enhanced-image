import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'text-image-editor-button-dropdown',
    styleUrl: 'text-image-editor-button-dropdown.css',
    shadow: true,
})
export class TextImageEditorButtonDropdown {
    @Prop() private type: string;
    @Prop() private alterStyle: string;
    @Prop() private selectables: string[];
    @Prop() private selected: string;
    @Prop() private changeSelected: (type: string, value: string) => void;

    @Prop() private toggleEditor: () => void;

    @State() private toggledDropdown: boolean = false;
    @State() private filtered: string[];

    public componentWillLoad() {
        this.filtered = this.selectables;
    }

    public render() {
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
                            {this.filtered.map((select, index) => {
                                return (
                                    <li
                                        key={index}
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


    private toggleDropdown = () => {
        this.toggledDropdown = !this.toggledDropdown;
    }

    private select = (selected: string) => {
        this.changeSelected(this.type, selected);
    }

    private clickSelect = (selected: string) => {
        this.toggleDropdown();
        this.toggleEditor();
        this.select(selected);
    }

    private onInput = (e: any) => {
        const value = e.target.value;
        this.select(value);
        this.filter(value);
    }

    private filter = (value: string) => {
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
}
