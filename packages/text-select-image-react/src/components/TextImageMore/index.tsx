import React, { Component } from 'react';

import Context from '../../context';

import TextImageMoreMenu from '../TextImageMoreMenu';

import { StyledTextImageMore } from './styled';

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
        } = this.props;

        return (
            <StyledTextImageMore>
                <div
                    onClick={this.toggleMenu}
                >
                    {MoreIcon}
                </div>

                {showMenu && (
                    <TextImageMoreMenu
                        content={content}
                        toggleMenu={this.toggleMenu}
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
