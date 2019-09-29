import React, { Component } from 'react';

import {
    StyledTextImageEditorButtonInput,
    StyledTextImageEditorButtonInputContainer,
    StyledTextImageEditorButtonInputGotoLink,
} from './styled';

import TextImageEditorButtonToggle from '../TextImageEditorButtonToggle';

import GoToLinkIcon from '../../assets/gotolink-icon';



class TextImageEditorButtonInput extends Component<any, any> {
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
            <StyledTextImageEditorButtonInput
                theme={theme}
                onMouseEnter={this.showInput}
                onMouseLeave={this.showInput}
            >
                <TextImageEditorButtonToggle
                    theme={theme}
                    toggle={toggle}
                    toggled={toggled}
                    icon={icon}
                />

                {show && (
                    <StyledTextImageEditorButtonInputContainer
                        theme={theme}
                    >
                        <input
                            type="text"
                            value={value}
                            onChange={this.handleInput}
                        />
                        <a href={value} target="_blank">
                            <StyledTextImageEditorButtonInputGotoLink
                                theme={theme}
                            >
                                {GoToLinkIcon}
                            </StyledTextImageEditorButtonInputGotoLink>
                        </a>
                    </StyledTextImageEditorButtonInputContainer>
                )}
            </StyledTextImageEditorButtonInput>
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


export default TextImageEditorButtonInput;
