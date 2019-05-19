import React, { Component } from 'react';

import { StyledTextImageEditorButtonInput } from './styled';

import TextImageEditorButtonToggle from '../TextImageEditorButtonToggle';

import GoToLinkIcon from '../../assets/gotolink-icon';



class TextImageEditorButtonInput extends Component<any, any> {
    public render() {
        const {
            icon,
            toggle,
            toggled,
            value,
            theme,
        } = this.props;

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
                        <span className="text-image-editor-button-input-container">
                            <input
                                type="text"
                                value={value}
                                onInput={this.handleInput}
                            />
                            <a href={value} target="_blank">
                                <span className="text-image-editor-button-input-gotolink">
                                    {GoToLinkIcon}
                                </span>
                            </a>
                        </span>
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
