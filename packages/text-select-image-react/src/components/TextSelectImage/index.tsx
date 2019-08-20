import React, { Component } from 'react';
import Context from '../../context';
import {
    StyledTextSelectImage,
    StyledImageContainer,
} from './styled';

import {
    ITextSelectImageProps,
    ITextSelectImageState,
} from './interfaces';

import SelectImage from '../SelectImage';
import TextSelectImageSettings from '../TextSelectImageSettings';
import Spinner from '../Spinner';
import Message from '../Message';

import {
    UPDATE_DEBOUNCE,
    PLURID_API,
    CONTENT_MORE_LIMIT,
} from '../../data/constants';
import {
    emptyImageText,
    newTextImageVersion,
} from '../../data/initializers';

import { ApolloClient } from 'apollo-client';
import graphqlClient from '../../graphql/client';
import {
    GET_DEPICT_IMAGE_DATA_BY_IMAGE_ID,
    GET_DEPICT_IMAGE_DATA_BY_URL_WITH_API_KEY,
    GET_DEPICT_IMAGE_DATA_BY_URL_WITH_USER_TOKEN,
} from '../../graphql/query';
import {
    EXTRACT_DEPICT_IMAGE_TEXT_WITH_DEPICT_IMAGE_ID,
    UPLOAD_DEPICT_IMAGE_BY_URL_WITH_USER_TOKEN,
} from '../../graphql/mutate';

import uuidv4 from '../../utils/uuid';
import computeImageSha from '../../utils/computeImageSha';
import {
    deleteTypenames,
} from '../../utils/graphql';
import {
    getVersionById,
    updateVersion,
    pushNewVersion,
    duplicateTextImage,
} from '../../utils/textImage';

import themes from '@plurid/apps.utilities.themes';



class TextSelectImage extends Component<
    ITextSelectImageProps, Partial<ITextSelectImageState>
> {
    static contextType = Context;

    client: ApolloClient<any>;

    private extractInterval: any;

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
            imageURL: '',
            imageSha: '',
            imageHeight: 0,
            imageWidth: 0,
            imageNaturalHeight: 0,
            imageNaturalWidth: 0,
            imageText: emptyImageText,
            message: '',

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
            updateTextImageBatch: this.updateTextImageBatch,
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
            theme,
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
            textFunctions: this.props.textFunctions,
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
            message,
            imageText,
        } = this.state;

        console.log(imageText);
        return (
            <Context.Provider value={this.state}>
                <StyledTextSelectImage
                    theme={theme}
                    toggledEditable={toggledEditable}
                    imageWidth={imageWidth}
                    onMouseEnter={this.toggleSettingsButton}
                    onMouseLeave={this.toggleSettingsButton}
                >
                    <StyledImageContainer>
                        <img
                            src={src}
                            alt={alt || 'Image'}
                            onLoad={this.handleLoadedImage}
                            style={{...imageStyle}}
                            data-depict={true}
                        />

                        {imageLoaded && (
                            <SelectImage />
                        )}
                    </StyledImageContainer>

                    {toggledSettingsButton && controls && (
                        <TextSelectImageSettings />
                    )}

                    {loading && (
                        <Spinner />
                    )}

                    {message && (
                        <Message
                            text={message}
                        />
                    )}
                </StyledTextSelectImage>
            </Context.Provider>
        );
    }

    private createTextImage = () => {
        const { imageText } = this.state;

        const versionId = `tsi-version-${uuidv4()}`;
        const newVersion = { ...newTextImageVersion };
        newVersion.id = versionId;

        const textImageId = `tsi-text-${uuidv4()}`;
        const newTextImage = {
            id: textImageId,
            currentVersionId: versionId,
            versions: [
                newVersion,
            ],
        };

        const updatedImageText = [...imageText];
        updatedImageText.push(newTextImage);

        this.setState({
            imageText: updatedImageText,
        });
    }

    private duplicateTextImage = (duplicateId: string) => {
        const { imageText } = this.state;

        const updatedImageText: any[] = duplicateTextImage(duplicateId, imageText);

        this.setState({
            imageText: updatedImageText,
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

    private updateTextImageField = (textId: string, element: string, value: any) => {
        const { imageText } = this.state;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === textId) {
                const version = getVersionById(imgText.currentVersionId, imgText.versions);
                const currentVersion = {...version};
                currentVersion[element] = value;
                updatedImageText.push(updateVersion({...imgText}, currentVersion));
                return;
            }

            updatedImageText.push({...imgText});
            return;
        });

        this.setState({
            imageText: updatedImageText,
        });
    }

    private updateTextImageBatch = (textId: string, elements: any) => {
        const { imageText } = this.state;

        const updatedImageText: any[] = [];
        imageText.map((imgText: any) => {
            if (imgText.id === textId) {
                const version = getVersionById(imgText.currentVersionId, imgText.versions);
                const currentVersion = {...version};
                for (let element of elements) {
                    currentVersion[element.type] = element.value;
                }
                updatedImageText.push(updateVersion({...imgText}, currentVersion));
                return;
            }

            updatedImageText.push({...imgText});
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


    private getImageSha = async () => {
        const query = await this.client.query({
            query: '',
        });
    }

    private computeImageSha = async () => {
        const { src } = this.props;
        const imageSha = await computeImageSha(src);
        this.setState({
            imageSha,
        },
            async () => {
                const {
                    getTextOnLoad,
                } = this.props;

                if (getTextOnLoad) {
                    await this.getAndSetText();
                }
            }
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

    private setMessage = (message: string, time?: number) => {
        if (!time) {
            this.setState({
                message,
            });
            return;
        }

        this.setState({
            message,
        },
            () => {
                setTimeout(() => {
                    this.setState({
                        message: '',
                    });
                }, time)
            }
        );
        return;
    }

    private getTextWithApiKey = async () => {
        try {
            this.setState({
                loading: true,
            });

            const {
                imageURL,
            } = this.state;

            const {
                apiKey,
            } = this.props;

            const query = await this.client
                .query({
                    query: GET_DEPICT_IMAGE_DATA_BY_URL_WITH_API_KEY,
                    variables: {
                        imageURL,
                        apiKey,
                    },
                    fetchPolicy: 'no-cache',
                });

            console.log(query);

            const { status, depictImageData } = query.data.getDepictImageDataByURLWithApiKey;

            if (!query.loading) {
                this.setState({
                    loading: false,
                });
            }

            if (!status) {
                return [];
            }

            return depictImageData.imageText;
        } catch (error) {
            return [];
        }
    }

    private getTextWithUserToken = async () => {
        try {
            this.setState({
                loading: true,
            });

            const {
                userToken,
            } = this.props;

            const {
                imageURL,
            } = this.state;

            const query = await this.client
                .query({
                    query: GET_DEPICT_IMAGE_DATA_BY_URL_WITH_USER_TOKEN,
                    variables: {
                        imageURL,
                        userToken,
                    },
                    fetchPolicy: 'no-cache',
                });

            console.log(query);

            const { status, depictImageData } = query.data.getDepictImageDataByURLWithUserToken;

            if (!query.loading) {
                this.setState({
                    loading: false,
                });
            }

            if (!status) {
                return [];
            }

            return depictImageData.imageText;
        } catch(err) {
            return [];
        }
    }

    private getTextWithDepictImageID = async () => {
        try {
            this.setState({
                loading: true,
            });

            const {
                depictImageID,
            } = this.props;

            const query = await this.client
                .query({
                    query: GET_DEPICT_IMAGE_DATA_BY_IMAGE_ID,
                    variables: {
                        imageID: depictImageID,
                    },
                    fetchPolicy: 'no-cache',
                });

            // console.log(query);
            const { status, depictImageData } = query.data.getDepictImageDataByImageID;

            if (!query.loading) {
                this.setState({
                    loading: false,
                });
            }

            if (!status) {
                return [];
            }

            return depictImageData.imageText;
        } catch (error) {
            return [];
        }
    }

    /**
     * Graphql query to the apiEndpoint (with apiKey if it exists)
     * to get the data based on the imageSha of the image.
     */
    private getText = async () => {
        const {
            apiKey,
            userToken,
            depictImageID,
        } = this.props;

        if (apiKey) {
            const imageText = await this.getTextWithApiKey();
            return imageText;
        }

        if (userToken) {
            const imageText = await this.getTextWithUserToken();
            return imageText;
        }

        if (depictImageID) {
            const imageText = await this.getTextWithDepictImageID();
            return imageText;
        }

        return [];
    }

    private getAndSetText = async () => {
        this.setMessage('Obtaining Text. Please Wait.');

        const imageText: any[] = await this.getText();
        console.log('imageText', imageText);

        if (imageText.length > 0) {
            this.setState({
                imageText: deleteTypenames(imageText),
                loading: false,
            },
                () => {
                    this.setMessage('Rendered Text.', 2500);
                }
            );
        } else {
            this.setState({
                imageText,
                loading: false,
            },
                () => {
                    this.setMessage('No Text Stored. Add or Extract Text.', 2500);
                }
            );
        }
    }


    private extractTextWithApiKey = async () => {
        try {
            return {};
        } catch (error) {
            return {};
        }
    }

    private extractTextWithUserToken = async () => {
        try {
            const {
                userToken
            } = this.props;

            const {
                imageURL,
            } = this.state;

            const mutation = await this.client
                .mutate({
                    mutation: UPLOAD_DEPICT_IMAGE_BY_URL_WITH_USER_TOKEN,
                    variables: {
                        imageURL,
                        userToken,
                    },
                    fetchPolicy: 'no-cache',
                });

            console.log(mutation);

            if (!mutation.loading) {
                this.setState({
                    loading: false,
                });
            }

            const { status, errors } = mutation.data.uploadDepictImageByURLWithUserToken;

            if (!status) {
                const [error] = errors;

                if (error.path === 'exists/TextSelectImage') {
                    this.setMessage('Text Extracted Already.', 3000);
                }

                return {};
            }

            if (status) {
                let intervalIterations = 0;

                this.setMessage('Extracting Text. Please Wait.');

                this.setState({
                    loading: true,
                });

                this.extractInterval = setInterval(async () => {
                    try {
                        intervalIterations += 1;
                        const imageText = await this.getText();
                        if (imageText.length > 0) {
                            this.setMessage('Rendered Text.', 2500);
                            this.setState({
                                imageText,
                                loading: false,
                            },
                                () => {
                                    clearInterval(this.extractInterval);
                                }
                            );
                        }

                        if (intervalIterations > 5) {
                            this.setMessage('Could Not Extract Text.', 4000);
                            this.setState({
                                imageText,
                                loading: false,
                            },
                                () => {
                                    clearInterval(this.extractInterval);
                                }
                            );
                        }
                    } catch(err) {
                        console.log(err);
                    }
                }, 3000);
            }
            return {};
        } catch (error) {
            return {};
        }
    }

    private extractTextWithUserDepictImageID = async () => {
        try {
            this.setState({
                loading: true,
            });

            const {
                depictImageID,
            } = this.props;

            const mutation = await this.client
                .mutate({
                    mutation: EXTRACT_DEPICT_IMAGE_TEXT_WITH_DEPICT_IMAGE_ID,
                    variables: {
                        input: {
                            imageID: depictImageID,
                        },
                    },
                    fetchPolicy: 'no-cache',
                });

            console.log(mutation);

            const { status, depictImageData } = mutation
                .data
                .extractDepictImageTextWithDepictImageID;

            if (!mutation.loading) {
                this.setState({
                    loading: false,
                });
            }

            if (!status) {
                return [];
            }

            return depictImageData.imageText;
        } catch (error) {
            return {};
        }
    }

    /**
     * Graphql query to the apiEndpoint (with apiKey if it exists)
     * to extract the data from the image on the imageSha.
     */
    private extractText = async () => {
        try {
            this.setState({
                loading: true,
            });

            const {
                apiKey,
                userToken,
                depictImageID,
            } = this.props;

            if (apiKey) {
                const imageText = await this.extractTextWithApiKey();
                return imageText;
            }

            if (userToken) {
                const imageText = await this.extractTextWithUserToken();
                return imageText;
            }

            if (depictImageID) {
                const imageText = await this.extractTextWithUserDepictImageID();
                return imageText;
            }

            return {};
        } catch(err) {
            return {};
        }
    }

    private processImageText = (imageText: any) => {
        const updatedImageText: any[] = [];

        for (const imageTextItem of imageText) {
            const item: any = {};
            item.currentVersionId = imageTextItem.currentVersionId;
            item.id = imageTextItem.id;
            const versions: any[] = [];
            for (const version of imageTextItem.versions) {
                const newVersion = { ...version };
                delete newVersion.__typename;
                delete newVersion.createdAt;
                delete newVersion.createdBy;
                delete newVersion.generatedBy;
                versions.push(newVersion);
            }
            item.versions = versions;
            updatedImageText.push(item);
        }

        return updatedImageText;
    }

    /**
     * Graphql mutation to the apiEndpoint (with apiKey if it exists)
     * to mutate the data of the image based on the imageSha.
     */
    private saveImageText = async () => {
        try {
            const {
                imageSha,
                imageText,
            } = this.state;

            const updateImageText = this.processImageText(imageText);

            const input = {
                imageSha,
                imageText: updateImageText,
            };

            // console.log(imageSha);
            // console.log(imageText);

            this.setState({
                loading: true,
            });

            this.setMessage('Saving Image Text.');

            const mutation = await this.client
                .mutate({
                    mutation: '',
                    variables: {
                        input,
                    },
                });

            if (!mutation.loading) {
                this.setState({
                    loading: false,
                });
            }

            // console.log(mutation);
            const { status, textSelectImage } = mutation.data.updateTextSelectImage;

            // // if the image does not exist, it should create it based on the sha and save the data
            if (!status) {
                this.setMessage('Could Not Save.', 2500);

                return false;
            }

            // this.setState({
            //     imageText: textSelectImage.imageText,
            // });
            this.setMessage('Saved Image Text.', 2500);
            return true;
        } catch(err) {
            // console.log(err);
            this.setMessage('Could Not Save.', 2500);
            return false;
        }
    }

    private updateText = () => {
        // to debounce the update to database every updateDebounce seconds

        const { updateDebounce } = this.state;
    }
}


export default TextSelectImage;
