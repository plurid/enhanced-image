import React, { Component } from 'react';

import Context from '../../context';

import {
    StyledTextImageEditorButtonDropdown,
    StyledTextImageEditorButtonDropdownSelected,
    StyledTextImageEditorButtonDropdownList,
    StyledTextImageEditorButtonDropdownListItem,
} from './styled';



class TextImageEditorButtonDropdown extends Component<any, any> {
    static contextType = Context;

    dropdown: any;

    constructor(props: any) {
        super(props);

        this.state = {
            cursor: this.props.selectables.indexOf(this.props.selected),
            filtered: this.props.selectables,
            selected: this.props.selected,
            toggledDropdown: false,
        };

        this.dropdown = React.createRef();
    }

    public render() {
        const {
            cursor,
            filtered,
            selected,
            toggledDropdown,
        } = this.state;

        const {
            theme,
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
                        onChange={this.handleChange}
                        onClick={this.toggleDropdown}
                        onKeyDown={this.handleKeyDown}
                    />
                </StyledTextImageEditorButtonDropdownSelected>

                {toggledDropdown && (
                    <StyledTextImageEditorButtonDropdownList
                        theme={theme}
                        ref={this.dropdown}
                    >
                        <ul>
                            {filtered.map((select: any, index: any) => {
                                return (
                                    <StyledTextImageEditorButtonDropdownListItem
                                        key={index}
                                        onClick={this.clickSelect.bind(this, select)}
                                        onMouseEnter={this.select.bind(this, select)}

                                        theme={theme}
                                        index={index}
                                        fontFamily={select}
                                        cursor={cursor}
                                        selected={selected}
                                        filtered={filtered}
                                    >
                                        {select}
                                    </StyledTextImageEditorButtonDropdownListItem>
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
        }),
            this.scrollToCurent
        );
    }

    private scrollToCurent = () => {
        const { cursor, toggledDropdown } = this.state;

        if (toggledDropdown) {
            this.dropdown.current.scrollTo(0, (cursor - 4) * 20);
        }
    }

    private select = (selected: string) => {
        const {
            filtered,
        } = this.state;

        const {
            changeSelected,
            type,
        } = this.props;

        let cursor = filtered.indexOf(selected);
        if (cursor < 0) {
            cursor = 0;
        }
        if (cursor > filtered.length - 1) {
            cursor = filtered.length - 1;
        }

        this.setState({
            cursor,
            selected,
        },
            changeSelected(type, selected)
        );
    }

    private clickSelect = (selected: string) => {
        this.toggleDropdown();
        this.select(selected);
    }

    private handleChange = (e: any) => {
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
            },
                () => { this.select(value); }
            );
        }

        if (value === '') {
            this.setState({
                filtered: selectables,
            });
        }
    }

    private handleKeyDown = (event: any) => {
        const {
            cursor,
            filtered,
        } = this.state;

        const { key } = event;

        if (cursor < 1 && key === 'ArrowUp') {
            this.dropdown.current.scrollTo(0, (cursor - 4) * 20);
            this.setState({
                cursor,
            },
                () => { this.select(filtered[0]) }
            );

            return;
        }

        if (cursor > filtered.length - 2 && key === 'ArrowDown') {
            this.dropdown.current.scrollTo(0, (cursor - 4) * 20);
            this.setState({
                cursor,
            },
                () => { this.select(filtered[filtered.length - 1]) }
            );

            return;
        }

        let newCursor = 0;
        switch(key) {
            case 'ArrowUp':
                newCursor = cursor - 1;
                this.dropdown.current.scrollTo(0, (newCursor - 4) * 20);
                this.setState({
                    cursor: newCursor,
                },
                    () => { this.select(filtered[newCursor]) }
                );
                break;
            case 'ArrowDown':
                newCursor = cursor + 1;
                this.dropdown.current.scrollTo(0, (newCursor - 4) * 20);
                this.setState({
                    cursor: newCursor,
                },
                    () => { this.select(filtered[newCursor]) }
                );
                break;
            case 'Enter':
                this.toggleDropdown();
                break;
        }
    }
}


export default TextImageEditorButtonDropdown;
