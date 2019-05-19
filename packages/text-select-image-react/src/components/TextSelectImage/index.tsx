import React, { Component } from 'react';

import { StyledTextSelectImage } from './styled';

// import SelectImage from '../SelectImage';
import TextSelectImageSettings from '../TextSelectImageSettings';

import themes from '../../data/themes';
import { DEFAULT_THEME } from '../../data/constants';

import Context from '../../context';



interface ITextSelectImageProps {
    about?: boolean;
    alt?: string;
    controls?: boolean;
    src: string;
    theme?: string;
}

interface ITextSelectImageState {
    about: boolean;
    controls: boolean;
    theme: any;
    themeName: string;
    toggleSettings: () => void;
    toggledSettings: boolean;
}


class TextSelectImage extends Component<
    ITextSelectImageProps, Partial<ITextSelectImageState>
> {
    static contextType = Context;

    constructor(props: ITextSelectImageProps) {
        super(props);

        this.state = {
            toggleSettings: this.toggleSettings,
            toggledSettings: false,
        }
    }

    componentDidMount() {
        const {
            about,
            controls,
            theme
        } = this.props;

        const _about = about ? about : this.context.about;
        const _controls = controls ? controls : this.context.controls;
        const _theme = theme ? themes[theme] : this.context.theme;
        const _themeName = theme ? theme : this.context.themeName;

        this.setState({
            about: _about,
            controls: _controls,
            theme: _theme,
            themeName: _themeName,
        });
    }

    public render() {
        const {
            src,
            alt,
        } = this.props;
        const {
            theme
        } = this.state;

        return (
            <Context.Provider value={this.state}>
                <StyledTextSelectImage
                    theme={theme}
                >
                    <img
                        src={src}
                        alt={alt || 'Image'}
                    />

                    {/* <SelectImage

                    /> */}

                    <TextSelectImageSettings

                    />
                </StyledTextSelectImage>
            </Context.Provider>
        )
    }

    private toggleSettings = () => {
        this.setState((prevState: any) => ({
            toggledSettings: !prevState.toggledSettings,
        }));
    }
}


export default TextSelectImage;
