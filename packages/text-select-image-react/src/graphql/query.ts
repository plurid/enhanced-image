import gql from 'graphql-tag';

import {
    DepictImageDataFragment,
} from './fragments';



export const GET_DEPICT_IMAGE_DATA_BY_URL_WITH_USER_TOKEN = gql`
    query GetDepictImageDataByURLWithUserToken($imageURL: String!, $userToken: String!) {
        getDepictImageDataByURLWithUserToken(imageURL: $imageURL, userToken: $userToken) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...DepictImageDataFragment
            }
        }
    }
    ${DepictImageDataFragment}
`;


export const GET_DEPICT_IMAGE_DATA_BY_URL_WITH_API_KEY = gql`
    query GetDepictImageDataByURLWithApiKey($imageURL: String!, $apiKey: String!) {
        getDepictImageDataByURLWithApiKey(imageURL: $imageURL, apiKey: $apiKey) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...DepictImageDataFragment
            }
        }
    }
    ${DepictImageDataFragment}
`;


export const GET_DEPICT_IMAGE_DATA_WITH_DEPICT_IMAGE_ID = gql`
    query GetDepictImageDataWithDepictImageID($depictImageID: String!) {
        getDepictImageDataWithDepictImageID(depictImageID: $depictImageID) {
            status
            errors {
                path
                message
                type
            }
            depictImageData {
                ...DepictImageDataFragment
            }
        }
    }
    ${DepictImageDataFragment}
`;


export const getTextSelectImage = gql`
    query TextSelectImage($imageSha: String!) {
        textSelectImage(imageSha: $imageSha) {
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
                    id
                    currentVersionId
                    versions {
                        id
                        createdBy
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
`


export const extractTextSelectImage = gql`
    query ExtractTextSelectImage($imageSrc: String!, $imageSha: String!) {
        extractTextSelectImage(imageSrc: $imageSrc, imageSha: $imageSha) {
            status
            errors {
                path
                message
            }
        }
    }
`;
