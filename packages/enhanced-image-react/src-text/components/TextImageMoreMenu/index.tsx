import React, { Component } from 'react';

import Context from '../../context';

import { StyledTextImageMoreMenu } from './styled';

import TextSelectImageButtonItem from '../TextSelectImageButtonItem';
import CopyIcon from '../../assets/copy-icon';
// import TranslateIcon from '../../assets/translate-icon';

import copyToClipboard from '../../utils/clipboard';



class TextImageMoreMenu extends Component<any, any> {
    static contextType = Context;

    state = {
    };

    public render() {
        const {
            theme
        } = this.context;

        return (
            <StyledTextImageMoreMenu
                theme={theme}
            >
                <ul>
                    <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.copyText}
                            icon={CopyIcon}
                            text="Copy"
                        />
                    </li>
                    {/* <li>
                        <TextSelectImageButtonItem
                            theme={theme}
                            atClick={this.translate}
                            icon={TranslateIcon}
                            text="Translate"
                        />
                    </li> */}
                </ul>
            </StyledTextImageMoreMenu>
        );
    }

    private copyText = () => {
        const {
            content,
            toggleMenu,
            toggleShow,
        } = this.props;

        copyToClipboard(content);
        toggleMenu();
        toggleShow();
    }

    // private translate = () => { }
}


export default TextImageMoreMenu;
