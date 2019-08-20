import gql from 'graphql-tag';

import {
    TextSelectImage_DepictImageDataFragment,
} from './fragments';



export const UPLOAD_DEPICT_WEB_IMAGE = gql`
    mutation UploadDepictWebImage ($URL: String!) {
        uploadDepictWebImage(url: $URL) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


export const UPLOAD_DEPICT_IMAGE_BY_URL_WITH_USER_TOKEN = gql`
    mutation UploadDepictImageByURLWithUserToken($imageURL: String!, $userToken: String!) {
        uploadDepictImageByURLWithUserToken(imageURL: $imageURL, userToken: $userToken) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


// uploads image if does not exist, extracts the text
export const EXTRACT_DEPICT_IMAGE_TEXT_BY_URL_WITH_USER_TOKEN = gql`
    mutation ExtractDepictImageTextByURLWithUserToken($input: InputExtractDepictImageTextByURLWithUserToken!) {
        extractDepictImageTextByURLWithUserToken(input: $input) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


// uploads image if does not exist, extracts the text
export const EXTRACT_DEPICT_IMAGE_TEXT_BY_URL_WITH_API_KEY = gql`
    mutation ExtractDepictImageTextByURLWithApiKey($input: InputExtractDepictImageTextByURLWithApiKey) {
        extractDepictImageTextByURLWithApiKey(input: $input) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


// image is already uploaded on depict servers, extracts the text
export const EXTRACT_DEPICT_IMAGE_TEXT_WITH_DEPICT_IMAGE_ID = gql`
    mutation ExtractDepictImageTextWithDepictImageID($input: InputExtractDepictImageTextWithDepictImageID!) {
        extractDepictImageTextWithDepictImageID(input: $input) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


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
