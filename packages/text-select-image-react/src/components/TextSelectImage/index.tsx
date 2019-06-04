import React, { Component } from 'react';
import Context from '../../context';
import SelectImage from '../SelectImage';
import TextSelectImageSettings from '../TextSelectImageSettings';
import Spinner from '../Spinner';

import {
    ITextSelectImageProps,
    ITextSelectImageState,
} from './interfaces';
import { StyledTextSelectImage } from './styled';

import {
    UPDATE_DEBOUNCE,
    PLURID_API,
    CONTENT_MORE_LIMIT,
} from '../../data/constants';
import {
    emptyImageText,
    emptyTextSelectImage,
    newTextImageVersion,
} from '../../data/initializers';
import themes from '../../data/themes';

import uuidv4 from '../../utils/uuid';
import computeImageSha from '../../utils/computeImageSha';
import {
    getVersionById,
    updateVersion,
    pushNewVersion,
} from '../../utils/textImage';

import { ApolloClient } from 'apollo-client';
import graphqlClient from '../../graphql/client';
import {
    getTextSelectImage,
    extractTextSelectImage,
} from '../../graphql/query';
import {
    updateTextSelectImage,
} from '../../graphql/mutate';



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
        this.client = graphqlClient(apiEndpoint);

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
            imageText: emptyImageText,

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

            contentMoreLimit: this.props.moreLimit || CONTENT_MORE_LIMIT,
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
            // imageText,
        } = this.state;

        // console.log(imageText);

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
        const { imageText } = this.state;

        const versionId = `text-version-${uuidv4()}`;
        newTextImageVersion.id = versionId;

        const textImageId = `text-image-${uuidv4()}`;
        const newTextImage = {
            id: textImageId,
            currentVersionId: versionId,
            versions: [
                newTextImageVersion,
            ],
        };

        imageText.push(newTextImage);

        this.setState({
            imageText,
        });
    }

    private duplicateTextImage = (duplicateId: string) => {
        const { imageText } = this.state;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === duplicateId) {
                const duplicateText = { ...imgText };
                duplicateText.id = `${uuidv4()}`;
                if (duplicateText.yPercentage < 80) {
                    duplicateText.yPercentage = duplicateText.yPercentage + 12;
                } else {
                    duplicateText.yPercentage = duplicateText.yPercentage - 12;
                }
                updatedImageText.push(duplicateText);
            }
            updatedImageText.push(imgText);
        });

        this.setState({
            imageText,
        });
    }

    private updateTextImage = (imageTextId: string, version: any) => {
        const { imageText } = this.state;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === imageTextId) {
                const currentVersion = getVersionById(imgText.currentVersionId, imgText.versions);
                if (currentVersion.content === version.content) {
                    imgText = updateVersion(imgText, version);
                    updatedImageText.push(imgText);
                    return true;
                } else {
                    imgText = pushNewVersion(imgText, version);
                    updatedImageText.push(imgText);
                    return true;
                }
            }
            updatedImageText.push(imgText);
            return true;
        });

        console.log(updatedImageText);

        this.setState({
            imageText: updatedImageText,
        });
    }

    private updateTextImageField = (id: string, element: string, value: any) => {
        const { imageText } = this.state;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === id) {
                const currentVersion = getVersionById(imgText.currentVersionId, imgText.versions);
                currentVersion[element] = value;
                updatedImageText.push(updateVersion(imgText, currentVersion));
                return;
            }
            updatedImageText.push(imgText);
            return;
        });

        this.setState({
            imageText: updatedImageText,
        });
    }

    private deleteTextImage = (id: string) => {
        const { imageText } = this.state;

        const updatedImageText = imageText.filter((imgText: any) => {
            if (imgText.id === id) {
                return false;
            }
            return imgText;
        });

        this.setState({
            imageText: updatedImageText,
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
            console.log(textSelectImage);

            if (!query.loading) {
                this.setState({
                    loading: false,
                });
            }

            if (!status) {
                return emptyTextSelectImage;
            }

            // const selectText = this.processText(textSelectImage);

            return textSelectImage.imageText;
        } catch(err) {
            return [];
        }
    }

    private getAndSetText = async () => {
        const imageText = await this.getText();

        this.setState({
            imageText,
        });
    }

    private extractText = async () => {
        const {
            imageSha,
        } = this.state;

        const imageSrc = new URL(this.props.src, window.location.href).href;
        console.log(imageSrc);

        try {
            const query = await this.client
                .query({
                    query: extractTextSelectImage,
                    variables: {
                        imageSrc: imageSrc,
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
            const imageTextTest = [
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
                imageText: imageTextTest,
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

            const imageText = this.processText(textSelectImage);

            this.setState({
                imageText,
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
