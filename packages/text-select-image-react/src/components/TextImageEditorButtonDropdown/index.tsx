import React, { Component } from 'react';

import Context from '../../context';

import {
    StyledTextImageEditorButtonDropdown,
    StyledTextImageEditorButtonDropdownSelected,
    StyledTextImageEditorButtonDropdownList,
} from './styled';



class TextImageEditorButtonDropdown extends Component<any, any> {
    static contextType = Context;

    state = {
        filtered: this.props.selectables,
        selected: this.props.selected,
        toggledDropdown: false,
    }

    public render() {
        const {
            filtered,
            selected,
            toggledDropdown,
        } = this.state;

        const {
            theme
        } = this.context;

        return (
            <StyledTextImageEditorButtonDropdown
                theme={theme}
            >
                <StyledTextImageEditorButtonDropdownSelected
                    theme={theme}
                >
                    <input
                        type="text"
                        value={selected}
                        onChange={this.onInput}
                        onClick={this.toggleDropdown}
                    />
                </StyledTextImageEditorButtonDropdownSelected>

                {toggledDropdown && (
                    <StyledTextImageEditorButtonDropdownList
                        theme={theme}
                    >
                        <ul>
                            {filtered.map((select: any, index: any) => {
                                return (
                                    <li
                                        key={index}
                                        style={{ fontFamily: select }}
                                        onClick={this.clickSelect.bind(this, select)}
                                        onMouseEnter={this.select.bind(this, select)}
                                    >
                                        {select}
                                    </li>
                                );
                            })}
                        </ul>
                    </StyledTextImageEditorButtonDropdownList>
                )}
            </StyledTextImageEditorButtonDropdown>
        );
    }

    private toggleDropdown = () => {
        this.setState((prevState: any) => ({
            toggledDropdown: !prevState.toggledDropdown,
        }));
    }

    private select = (selected: string) => {
        const {
            changeSelected,
            type,
        } = this.props;

        this.setState({
            selected,
        },
            changeSelected(type, selected)
        );
    }

    private clickSelect = (selected: string) => {
        this.toggleDropdown();
        this.select(selected);
    }

    private onInput = (e: any) => {
        const value = e.target.value;
        this.select(value);
        this.filter(value);
    }

    private filter = (value: string) => {
        const {
            selectables,
        } = this.props;

        if (value) {
            const filtered = selectables.filter((selectable: any) => {
                if (selectable.toLowerCase().startsWith(value.toLowerCase())) {
                    return selectable;
                }
            });
            this.setState({
                filtered,
            });
        }

        if (value === '') {
            this.setState({
                filtered: selectables,
            });
        }
    }
}


export default TextImageEditorButtonDropdown;
