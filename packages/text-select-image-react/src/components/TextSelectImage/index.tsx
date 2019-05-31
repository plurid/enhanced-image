import React, { Component } from 'react';

import { StyledTextSelectImage } from './styled';

import Context from '../../context';

import SelectImage from '../SelectImage';
import TextSelectImageSettings from '../TextSelectImageSettings';
import Spinner from '../Spinner';

import {
    UPDATE_DEBOUNCE,
    PLURID_API,
} from '../../data/constants';

import themes from '../../data/themes';

import computeImageSha from '../../utils/computeImageSha';
import uuidv4 from '../../utils/uuid';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import {
    getTextSelectImage,
    extractTextSelectImage,
} from '../../graphql/query';
import {
    updateTextSelectImage,
} from '../../graphql/mutate';



const emptyTextSelectImage = {
    createdBy: '',
    imageSha: '',
    imagePath: '',
    imageSource: '',
    imageHeight: 0,
    imageWidth: 0,
    imageText: [],
};

const apolloClient = (uri: string) => {
    const client = new ApolloClient({
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                    );
                if (networkError) console.log(`[Network error]: ${networkError}`);
            }),
            new HttpLink({
                uri,
            })
        ]),
        cache: new InMemoryCache(),
    });

    return client;
};


interface ITextSelectImageProps {
    about?: boolean;
    alt?: string;
    controls?: boolean;
    src: string;
    theme?: string;
    // imageText?: any;
    imageStyle?: any;
    atLoad?: any;

    // To be specified when using another API than https://api.plurid.com
    // GraphlQL-based
    apiEndpoint?: string;
    // The apiKey contains the domain allowed to make requests
    // To be specified when using as a service provider
    // apiKey obtained from https://depict.plurid.com/api
    apiKey?: string;
    updateDebounce?: number;
}

interface ITextSelectImageState {
    apiEndpoint: string;
    updateDebounce: number;

    theme: any;
    themeName: string;
    about: boolean;
    controls: boolean;

    loading: boolean;
    imageLoaded: boolean;
    imageSha: string;
    imageHeight: number;
    imageWidth: number;
    imageNaturalHeight: number;
    imageNaturalWidth: number;

    toggleSettingsButton: () => void;
    toggledSettingsButton: boolean;
    toggleSettings: () => void;
    toggledSettings: boolean;
    toggleEditable: () => void;
    toggledEditable: boolean;
    selectText: any;

    editorWidth: number;
    setEditorWidth: (value: number) => any;

    createTextImage: () => any;
    duplicateTextImage: (duplicateId: string) => any;
    updateTextImage: (text: any) => any;
    updateTextImageField: (id: string, element: string, value: any) => any;
    deleteTextImage: (id: string) => any;

    getText: () => any;
    getAndSetText: () => any;
    extractText: () => any;
    saveImageText: () => any;
}


class TextSelectImage extends Component<
    ITextSelectImageProps, Partial<ITextSelectImageState>
> {
    static contextType = Context;

    client: ApolloClient<any>;

    constructor(props: ITextSelectImageProps) {
        super(props);

        // console.log('CONSTRUCTOR');

        const apiEndpoint = this.props.apiEndpoint || PLURID_API;
        const updateDebounce = this.props.updateDebounce || UPDATE_DEBOUNCE;
        this.client = apolloClient(apiEndpoint);

        this.state = {
            apiEndpoint,
            updateDebounce,

            loading: false,

            imageLoaded: false,
            imageSha: '',
            imageHeight: 0,
            imageWidth: 0,
            imageNaturalHeight: 0,
            imageNaturalWidth: 0,

            toggleSettingsButton: this.toggleSettingsButton,
            toggledSettingsButton: false,
            toggleSettings: this.toggleSettings,
            toggledSettings: false,
            toggleEditable: this.toggleEditable,
            toggledEditable: false,

            createTextImage: this.createTextImage,
            duplicateTextImage: this.duplicateTextImage,
            updateTextImage: this.updateTextImage,
            updateTextImageField: this.updateTextImageField,
            deleteTextImage: this.deleteTextImage,

            editorWidth: 0,
            setEditorWidth: this.setEditorWidth,

            getText: this.getText,
            getAndSetText: this.getAndSetText,
            extractText: this.extractText,
            saveImageText: this.saveImageText,

            selectText: emptyTextSelectImage,
        };
    }

    async componentDidMount() {
        // console.log('MOUNT');

        const {
            about,
            controls,
            theme
        } = this.props;

        const _about = about === undefined ? this.context.about : about;
        const _controls = controls === undefined ? this.context.controls : controls;
        const _theme = theme === undefined ? this.context.theme : themes[theme];
        const _themeName = theme === undefined ? this.context.themeName : theme;

        this.setState({
            about: _about,
            controls: _controls,
            theme: _theme,
            themeName: _themeName,
        });
    }

    public render() {
        // console.log('RENDER');

        const {
            src,
            alt,
            imageStyle,
        } = this.props;

        const {
            controls,
            theme,
            imageLoaded,
            loading,
            imageWidth,
            toggledEditable,
            toggledSettingsButton,
            selectText,
        } = this.state;

        console.log(selectText);
        // if (selectText) {
            // console.log(selectText.imageText[1].fontSizePercentage);
            // console.log(selectText.imageText[1].content);
        // }
        // console.log(this.state.imageSha);

        return (
            <Context.Provider value={this.state}>
                <StyledTextSelectImage
                    theme={theme}
                    toggledEditable={toggledEditable}
                    imageWidth={imageWidth}
                    onMouseEnter={this.toggleSettingsButton}
                    onMouseLeave={this.toggleSettingsButton}
                >
                    <img
                        src={src}
                        alt={alt || 'Image'}
                        onLoad={this.handleLoadedImage}
                        style={{...imageStyle}}
                    />

                    {imageLoaded && (
                        <SelectImage />
                    )}

                    {toggledSettingsButton && controls && (
                        <TextSelectImageSettings />
                    )}

                    {loading && (
                        <Spinner />
                    )}
                </StyledTextSelectImage>
            </Context.Provider>
        );
    }


    private createTextImage = () => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const newTextImage = {
            id: `tsi-text-${uuidv4()}`,
            xCoordPercentage: 5,
            yCoordPercentage: 5,
            perspective: '',
            rotation: '',
            skew: '',
            color: 'red',
            fontFamily: 'Arial',
            fontSizePercentage: 7,
            bold: false,
            italic: false,
            letterSpacingPercentage: 0,
            lineHeight: 'auto',
            wordSpacingPercentage: 0,
            content: 'New Text',
            link: false,
            linkTo: '',
            viewable: false,
        };

        imageText.push(newTextImage);
        selectText.imageText = imageText;

        this.setState({
            selectText,
        });
    }

    private duplicateTextImage = (duplicateId: string) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === duplicateId) {
                const duplicateText = { ...imgText };
                duplicateText.id = `tsi-text-${uuidv4()}`;
                if (duplicateText.yPercentage < 80) {
                    duplicateText.yPercentage = duplicateText.yPercentage + 12;
                } else {
                    duplicateText.yPercentage = duplicateText.yPercentage - 12;
                }
                updatedImageText.push(duplicateText);
            }
            updatedImageText.push(imgText);
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private updateTextImage = (text: any) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText = imageText.map((imgText: any) => {
            if (imgText.id === text.id) {
                console.log(text);
                return text;
            }
            return imgText;
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private updateTextImageField = (id: string, element: string, value: any) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText = imageText.map((imgText: any) => {
            if (imgText.id === id) {
                imgText[element] = value;
                return imgText;
            }
            return imgText;
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private deleteTextImage = (id: string) => {
        const { selectText } = this.state;
        const { imageText } = selectText;

        const updatedImageText = imageText.filter((imgText: any) => {
            if (imgText.id === id) {
                return false;
            }
            return imgText;
        });
        selectText.imageText = updatedImageText;

        this.setState({
            selectText,
        });
    }

    private toggleSettings = () => {
        this.setState((prevState: any) => ({
            toggledSettings: !prevState.toggledSettings,
        }));
    }

    private toggleSettingsButton = () => {
        this.setState((prevState: any) => ({
            toggledSettingsButton: !prevState.toggledSettingsButton,
        }));
    }

    private toggleEditable = () => {
        this.setState((prevState: any) => ({
            toggledEditable: !prevState.toggledEditable,
        }));
    }

    private setEditorWidth = (editorWidth: number) => {
        this.setState({
            editorWidth,
        });
    }

    private computeImageSha = async () => {
        const { src } = this.props;
        const imageSha = await computeImageSha(src);
        this.setState({ imageSha },
            // to be used in production (?)
            // this.getAndSetText
        );
    }

    private handleLoadedImage = async (image: any) => {
        const {
            atLoad,
        } = this.props;

        const {
            offsetHeight,
            offsetWidth,
            naturalHeight,
            naturalWidth,
        } = image.target;

        if (atLoad) {
            await atLoad(image);
        }

        this.setState({
            imageLoaded: true,
            imageWidth: offsetWidth,
            imageHeight: offsetHeight,
            imageNaturalHeight: naturalHeight,
            imageNaturalWidth: naturalWidth,
        },
            await this.computeImageSha
        );
    }


    private processText = (data: any) => {
        const {
            imageText,
            imageHeight,
            imageWidth,
        } = data;

        const imgText: any[] = [];

        for (let text of imageText) {
            let txt = {};
            const { currentVersionId, versions } = text;
            for (let version of versions) {
                if (version.id === currentVersionId) {
                    txt = { ...version };
                }
            }
            imgText.push(txt);
        }

        const selectText = {
            imageHeight,
            imageWidth,
            imageText: imgText,
        };

        return selectText;
    }

    /**
     * Graphql query to the apiEndpoint (with apiKey if it exists)
     * to get the data based on the contentId of the image.
     */
    private getText = async () => {
        // const { apiKey } = this.props;

        const {
            imageSha,
        } = this.state;

        try {
            this.setState({
                loading: true,
            });

            const query = await this.client
                .query({
                    query: getTextSelectImage,
                    variables: {
                        imageSha,
                    },
                    fetchPolicy: 'no-cache',
                });

            const { status, textSelectImage } = query.data.textSelectImage;
            console.log(query);

            if (!query.loading) {
                this.setState({
                    loading: false,
                });
            }

            if (!status) {
                return emptyTextSelectImage;
            }

            const selectText = this.processText(textSelectImage);

            return selectText;
        } catch(err) {
            return emptyTextSelectImage;
        }
    }

    private getAndSetText = async () => {
        const selectText = await this.getText();

        this.setState({
            selectText,
        });
    }

    private extractText = async () => {
        const {
            imageSha,
        } = this.state;

        try {
            const query = await this.client
                .query({
                    query: extractTextSelectImage,
                    variables: {
                        imageSrc: this.props.src,
                        imageSha,
                    },
                    fetchPolicy: 'no-cache',
                });

            const { status, textSelectImage } = query.data.extractTextSelectImage;
            console.log(query);
            console.log(textSelectImage);

            if (!status) {
                return {};
            }

            return {};
        } catch(err) {
            return {};
        }
    }

    private saveImageText = async () => {
        // graphql mutation to save the text to the database
        console.log('saving the text');

        const {
            imageSha,
        } = this.state;

        try {
            const imageText = [
                {
                    "id": "99aee8df70494cc99b32d4b1612f02f2",
                    "currentVersionId": "tsi-text-ab9c018963ca46719b5e78b7ddb612b3",
                    "versions": [
                        {
                        "createdBy": "9275a194b1464ab1a76730271a3aad75",
                        "id": "tsi-text-ab9c018963ca46719b5e78b7ddb612b3",
                        "xCoordPercentage": 25.3750,
                        "yCoordPercentage": 36.0690,
                        "perspective": "",
                        "rotation": "",
                        "skew": "",
                        "color": "red",
                        "fontFamily": "Arial",
                        "fontSizePercentage": 7.4467,
                        "bold": true,
                        "italic": false,
                        "letterSpacingPercentage": 0.1750,
                        "lineHeight": "auto",
                        "wordSpacingPercentage": 0,
                        "content": "eat.yourvegetables.com",
                        "link": true,
                        "linkTo": "https://github.com/plurid/text-select-image",
                        "viewable": false
                        }
                    ]
                },
                {
                    "id": "d820f6fb53564c9aa690be800737f19f",
                    "currentVersionId": "tsi-text-cfef2e114e6540fe980a7136046a9fb0",
                    "versions": [
                        {
                            "createdBy": "9275a194b1464ab1a76730271a3aad75",
                            "id": "tsi-text-cfef2e114e6540fe980a7136046a9fb0",
                            "xCoordPercentage": 28.75,
                            "yCoordPercentage": 62.3661,
                            "perspective": "",
                            "rotation": "",
                            "skew": "",
                            "color": "black",
                            "fontFamily": "Arial",
                            "fontSizePercentage": 8.1448,
                            "bold": true,
                            "italic": false,
                            "letterSpacingPercentage": -0.0625,
                            "lineHeight": "auto",
                            "wordSpacingPercentage": 0.35,
                            "content": "aaaEat your vegetables!",
                            "link": false,
                            "linkTo": "",
                            "viewable": false
                        }
                    ]
                }
            ];

            const input = {
                imageSha,
                imageText,
            };

            this.setState({
                loading: true,
            });

            const mutation = await this.client
                .mutate({
                    mutation: updateTextSelectImage,
                    variables: {
                        input,
                    },
                });

            if (!mutation.loading) {
                this.setState({
                    loading: false,
                });
            }

            console.log(mutation);
            const { status, textSelectImage } = mutation.data.updateTextSelectImage;

            if (!status) {
                return false;
            }

            const selectText = this.processText(textSelectImage);

            this.setState({
                selectText,
            });

            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    private updateText = () => {
        // to debounce the update to database every updateDebounce seconds

        const { updateDebounce } = this.state;
    }
}


export default TextSelectImage;
