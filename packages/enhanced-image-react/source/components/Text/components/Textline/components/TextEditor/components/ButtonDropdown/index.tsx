import React, { Component } from 'react';

import {
    StyledButtonDropdown,
    StyledButtonDropdownSelected,
    StyledButtonDropdownList,
    StyledButtonDropdownListItem,
} from './styled';



class ButtonDropdown extends Component<any, any> {
    dropdown: any;
    button: any;

    constructor(props: any) {
        super(props);

        this.state = {
            cursor: this.props.selectables.indexOf(this.props.selected),
            filtered: this.props.selectables,
            selected: this.props.selected,
            toggledDropdown: false,
        };

        this.button = React.createRef();
        this.dropdown = React.createRef();
    }

    public render() {
        const {
            selected,
        } = this.state;

        const {
            theme,
            transparentUI,
        } = this.props;

        return (
            <StyledButtonDropdown
                theme={theme}
                ref={this.button}
            >
                <StyledButtonDropdownSelected
                    theme={theme}
                    transparentUI={transparentUI}
                >
                    <input
                        type="text"
                        value={selected}
                        onChange={this.handleChange}
                        onClick={this.toggleDropdown}
                        onKeyDown={this.handleKeyDown}
                    />
                </StyledButtonDropdownSelected>
            </StyledButtonDropdown>
        );
    }

    private toggleDropdown = () => {
        const {
            textDraggable,
            toggleTextDraggable,
        } = this.props;

        if (textDraggable) {
            toggleTextDraggable();
        }

        this.setState((prevState: any) => ({
            toggledDropdown: !prevState.toggledDropdown,
        }),
            this.renderDropdown,
        );
    }

    private renderDropdown = () => {
        const {
            theme,
            transparentUI,

            renderOutside,
        } = this.props;

        const {
            cursor,
            filtered,
            selected,
            toggledDropdown,
        } = this.state;

        if (!toggledDropdown) {
            const dropdownRender = (<></>);
            renderOutside(dropdownRender);
            return;
        }

        const dropdownRender = (
            <StyledButtonDropdownList
                theme={theme}
                transparentUI={transparentUI}
                ref={this.dropdown}
            >
                <ul>
                    {filtered && filtered.map((select: any, index: any) => {
                        return (
                            <StyledButtonDropdownListItem
                                key={index}
                                onClick={this.clickSelect.bind(this, select)}
                                onMouseEnter={this.select.bind(this, select)}

                                theme={theme}
                                index={index}
                                fontFamily={select}
                                cursor={cursor}
                                selected={selected}
                                filtered={filtered}
                                transparentUI={transparentUI}
                            >
                                {select}
                            </StyledButtonDropdownListItem>
                        );
                    })}
                </ul>
            </StyledButtonDropdownList>
        );

        const left = this.button.current
            ? this.button.current.offsetLeft
            : 0;

        renderOutside(dropdownRender, left);

        this.scrollToCurent();
    }

    private scrollToCurent = () => {
        const { cursor, toggledDropdown } = this.state;

        if (toggledDropdown) {
            if (this.dropdown.current) {
                this.dropdown.current.scrollTo(0, (cursor - 4) * 20);
            }
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
        const {
            toggleEditor,
            toggleTextSelected,
        } = this.props;

        toggleTextSelected();
        toggleEditor();
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
            toggledDropdown,
        } = this.state;

        if (!toggledDropdown) {
            return;
        }

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


export default ButtonDropdown;
