import gql from 'graphql-tag';

import {
    EnhancedImageDataFragment,
} from '../fragments';



export const updateTextSelectImage = gql`
    mutation UpdateTextSelectImage ($input: UpdateTextSelectImageInput!) {
        updateTextSelectImage(input: $input) {
            status
            errors {
                path
                message
            }
            textSelectImage {
                user {
                    username
                }
                imagePath
                imageSource
                imageHeight
                imageWidth
                imageText {
                    currentVersionId
                    versions {
                        id
                        user {
                            username
                        }
                        xCoordPercentage
                        yCoordPercentage
                        perspective
                        rotation
                        skew
                        color
                        fontFamily
                        fontSizePercentage
                        bold
                        italic
                        letterSpacingPercentage
                        lineHeight
                        wordSpacingPercentage
                        content
                        link
                        linkTo
                        viewable
                    }
                }
            }
        }
    }
`;


export const EXTRACT_TEXT_WITH_API_KEY = gql`
    mutation EnhancedImageExtractTextWithApiKey($input: InputEnhancedImageExtractTextWithApiKey!) {
        enhancedImageExtractTextWithApiKey(input: $input) {
            status
            errors {
                path
                message
            }
            imageData {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const EXTRACT_TEXT_WITH_USER_TOKEN = gql`
    mutation EnhancedImageExtractTextWithUserKey($input: InputEnhancedImageExtractTextWithUserKey!) {
        enhancedImageExtractTextWithUserKey(input: $input) {
            status
            errors {
                path
                message
            }
            imageData {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const EXTRACT_TEXT_WITH_DEPICT_IMAGE_ID = gql`
    mutation EnhancedImageExtractTextWithDepictImageID($input: InputEnhancedImageExtractTextWithDepictImageID!) {
        enhancedImageExtractTextWithDepictImageID(input: $input) {
            status
            errors {
                path
                message
            }
            imageData {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;
