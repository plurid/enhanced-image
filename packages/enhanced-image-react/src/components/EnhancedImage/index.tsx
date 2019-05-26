import React, { Component } from 'react';

// import { StyledEnhancedImage } from './styled';

// import Context from '../../context';

// import SelectImage from '../SelectImage';
// import TextSelectImageSettings from '../TextSelectImageSettings';
// import Spinner from '../Spinner';

// import {
//     UPDATE_DEBOUNCE,
//     PLURID_API,
// } from '../../data/constants';

// import themes from '../../data/themes';

// import computeContentId from '../../utils/contentId';
// import uuidv4 from '../../utils/uuid';

// import ApolloClient from 'apollo-boost';

// import { getTextSelectImage } from '../../graphql/query';
// import { updateTextSelectImage } from '../../graphql/mutation';



// const apolloClient = (uri: string) => {
//     return new ApolloClient({
//         uri,
//     });
// }


// interface ITextSelectImageProps {
//     about?: boolean;
//     alt?: string;
//     controls?: boolean;
//     src: string;
//     theme?: string;
//     imageText?: any;

//     // To be specified when using another API than https://api.plurid.com
//     // GraphlQL-based
//     apiEndpoint?: string;

//     // The apiKey contains the domain allowed to make requests
//     // To be specified when using as a service provider
//     // apiKey obtained from https://depict.plurid.com/api
//     apiKey?: string;

//     updateDebounce?: number;
// }

// interface ITextSelectImageState {
//     apiEndpoint: string;
//     updateDebounce: number;

//     theme: any;
//     themeName: string;
//     about: boolean;
//     controls: boolean;
//     editorWidth: number;
//     loading: boolean;

//     imageLoaded: boolean;
//     imageHeight: number;
//     imageWidth: number;
//     imageNaturalHeight: number;
//     imageNaturalWidth: number;

//     toggleSettingsButton: () => void;
//     toggledSettingsButton: boolean;
//     toggleSettings: () => void;
//     toggledSettings: boolean;
//     toggleEditable: () => void;
//     toggledEditable: boolean;
//     selectText: any;

//     createTextImage: () => any;
//     duplicateTextImage: (duplicateId: string) => any;
//     updateTextImage: (text: any) => any;
//     updateTextImageField: (id: string, element: string, value: any) => any;
//     deleteTextImage: (id: string) => any;
//     setEditorWidth: (value: number) => any;
// }


class EnhancedImage extends Component<
    any, any
    // ITextSelectImageProps, Partial<ITextSelectImageState>
> {
    // static contextType = Context;

    constructor(props: any) {
        super(props);

        // const apiEndpoint = this.props.apiEndpoint || PLURID_API;
        // this.client = apolloClient(apiEndpoint);

        // this.state = {
        //     apiEndpoint,
        //     updateDebounce: this.props.updateDebounce || UPDATE_DEBOUNCE,

        //     loading: false,
        //     editorWidth: 0,

        //     imageLoaded: false,
        //     imageHeight: 0,
        //     imageWidth: 0,
        //     imageNaturalHeight: 0,
        //     imageNaturalWidth: 0,

        //     toggleSettingsButton: this.toggleSettingsButton,
        //     toggledSettingsButton: false,
        //     toggleSettings: this.toggleSettings,
        //     toggledSettings: false,
        //     toggleEditable: this.toggleEditable,
        //     toggledEditable: false,

        //     createTextImage: this.createTextImage,
        //     duplicateTextImage: this.duplicateTextImage,
        //     updateTextImage: this.updateTextImage,
        //     updateTextImageField: this.updateTextImageField,
        //     deleteTextImage: this.deleteTextImage,
        //     setEditorWidth: this.setEditorWidth,
        // }
    }

    async componentDidMount() {
        // const {
        //     about,
        //     controls,
        //     theme
        // } = this.props;

        // const _about = about === undefined ? this.context.about : about;
        // const _controls = controls === undefined ? this.context.controls : controls;
        // const _theme = theme === undefined ? this.context.theme : themes[theme];
        // const _themeName = theme === undefined ? this.context.themeName : theme;

        // const selectText = await this.getText();

        // this.setState({
        //     about: _about,
        //     controls: _controls,
        //     theme: _theme,
        //     themeName: _themeName,
        //     selectText,
        // });
    }

    public render() {
        // const {
        //     src,
        //     alt,
        // } = this.props;
        // const {
        //     controls,
        //     theme,
        //     imageLoaded,
        //     loading,
        //     imageWidth,
        //     toggledEditable,
        //     toggledSettingsButton,
        //     selectText,
        // } = this.state;


        return (
            <div>
                Enhanced Image
            </div>
            // <Context.Provider value={this.state}>
            //     <StyledTextSelectImage
            //         theme={theme}
            //         toggledEditable={toggledEditable}
            //         imageWidth={imageWidth}
            //         onMouseEnter={this.toggleSettingsButton}
            //         onMouseLeave={this.toggleSettingsButton}
            //     >
            //         <img
            //             src={src}
            //             alt={alt || 'Image'}
            //             onLoad={this.handleLoadedImage}
            //         />

            //         {imageLoaded && (
            //             <SelectImage />
            //         )}

            //         {toggledSettingsButton && controls && (
            //             <TextSelectImageSettings />
            //         )}

            //         {loading && (
            //             <Spinner />
            //         )}
            //     </StyledTextSelectImage>
            // </Context.Provider>
        );
    }
}


export default EnhancedImage;
