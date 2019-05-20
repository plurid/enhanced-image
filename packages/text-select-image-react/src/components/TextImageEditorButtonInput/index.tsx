import React, { Component } from 'react';

import {
    StyledTextImageEditorButtonInput,
    StyledTextImageEditorButtonInputContainer,
    StyledTextImageEditorButtonInputGotoLink,
} from './styled';

import TextImageEditorButtonToggle from '../TextImageEditorButtonToggle';

import GoToLinkIcon from '../../assets/gotolink-icon';



class TextImageEditorButtonInput extends Component<any, any> {
    public render() {
        const {
            icon,
            toggle,
            // toggled,
            value,
            theme,
        } = this.props;
        const toggled = true;

        return (
            <StyledTextImageEditorButtonInput
                theme={theme}
            >
                <span className="text-image-editor-button-input">
                    <TextImageEditorButtonToggle
                        theme={theme}
                        toggle={toggle}
                        toggled={toggled}
                        icon={icon}
                    />

                    {toggled && (
                        <StyledTextImageEditorButtonInputContainer
                            theme={theme}
                        >
                            <input
                                type="text"
                                value={value}
                                onInput={this.handleInput}
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
                </span>
            </StyledTextImageEditorButtonInput>
        );
    }

    private handleInput = (event: any) => {
        // this.changeValue(this.valueType, event.target.value);
    }
}


export default TextImageEditorButtonInput;
