import React, { Component } from 'react';

import {
    StyledTextVideoEditorButtonInput,
    StyledTextVideoEditorButtonInputContainer,
    StyledTextVideoEditorButtonInputGotoLink,
} from './styled';

import TextVideoEditorButtonToggle from '../ButtonToggle';

import GoToLinkIcon from '../../../../../../../../assets/gotolink-icon';



class TextVideoEditorButtonInput extends Component<any, any> {
    state = {
        show: false,
    };

    public render() {
        const {
            icon,
            value,
            theme,
            toggle,
            toggled,
        } = this.props;

        const {
            show,
        } = this.state;

        return (
            <StyledTextVideoEditorButtonInput
                theme={theme}
                onMouseEnter={this.showInput}
                onMouseLeave={this.showInput}
            >
                <TextVideoEditorButtonToggle
                    theme={theme}
                    toggle={toggle}
                    toggled={toggled}
                    icon={icon}
                />

                {show && (
                    <StyledTextVideoEditorButtonInputContainer
                        theme={theme}
                    >
                        <input
                            type="text"
                            value={value}
                            onChange={this.handleInput}
                        />
                        <a href={value} target="_blank">
                            <StyledTextVideoEditorButtonInputGotoLink
                                theme={theme}
                            >
                                {GoToLinkIcon}
                            </StyledTextVideoEditorButtonInputGotoLink>
                        </a>
                    </StyledTextVideoEditorButtonInputContainer>
                )}
            </StyledTextVideoEditorButtonInput>
        );
    }

    private showInput = () => {
        this.setState((prevState: any) => ({
            show: !prevState.show,
        }));
    }

    private handleInput = (event: any) => {
        const {
            valueType,
            changeValue,
        } = this.props;

        changeValue(valueType, event.target.value);
    }
}


export default TextVideoEditorButtonInput;
