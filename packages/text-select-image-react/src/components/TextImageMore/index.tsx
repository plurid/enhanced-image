import React, { Component } from 'react';

import Context from '../../context';

import TextImageMoreMenu from '../TextImageMoreMenu';

import {
    StyledTextImageMore,
    StyledTextImageMoreButton,
} from './styled';

import MoreIcon from '../../assets/more-icon';



class TextImageMore extends Component<any, any> {
    static contextType = Context;

    state = {
        showMenu: false,
    };

    public render() {
        const {
            showMenu,
        } = this.state;

        const {
            content,
            toggleShow,
        } = this.props;

        return (
            <StyledTextImageMore>
                <StyledTextImageMoreButton
                    onClick={this.toggleMenu}
                >
                    {MoreIcon}
                </StyledTextImageMoreButton>

                {showMenu && (
                    <TextImageMoreMenu
                        content={content}
                        toggleMenu={this.toggleMenu}
                        toggleShow={toggleShow}
                    />
                )}
            </StyledTextImageMore>
        );
    }

    private toggleMenu = () => {
        this.setState((prevState: any) => ({
            showMenu: !prevState.showMenu,
        }));
    }
}


export default TextImageMore;
