import React, { Component } from 'react';

import { StyledTextImageEditorButtonDropdown } from './styled';



class TextImageEditorButtonDropdown extends Component<any, any> {
    state = {
        toggledDropdown: false,

    }

    public render() {
        return (
            <StyledTextImageEditorButtonDropdown>
                {/* <span className="text-image-editor-dropdown">
                    <span className="text-image-editor-dropdown-selected">
                        <input
                            type="text"
                            value={this.selected}
                            onInput={this.onInput}
                            onClick={this.toggleDropdown}
                        />
                    </span>

                    {this.toggledDropdown && (
                        <span className="text-image-editor-dropdown-list">
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
                </span> */}
            </StyledTextImageEditorButtonDropdown>
        );
    }

    private toggleDropdown = () => {
        this.setState((prevState: any) => ({
            toggledDropdown: !prevState.toggledDropdown,
        }));
    }

    // private select = (selected: string) => {
    //     this.changeSelected(this.type, selected);
    // }

    // private clickSelect = (selected: string) => {
    //     this.toggleDropdown();
    //     this.toggleEditor();
    //     this.select(selected);
    // }

    // private onInput = (e: any) => {
    //     const value = e.target.value;
    //     this.select(value);
    //     this.filter(value);
    // }

    // private filter = (value: string) => {
    //     if (value) {
    //         const filtered = this.selectables.filter(selectable => {
    //             if (selectable.toLowerCase().startsWith(value.toLowerCase())) {
    //                 return selectable;
    //             }
    //         });
    //         this.filtered = filtered;
    //     }

    //     if (value === '') {
    //         this.filtered = this.selectables;
    //     }
    // }
}


export default TextImageEditorButtonDropdown;
