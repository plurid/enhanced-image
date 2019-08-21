import gql from 'graphql-tag';

import {
    TextSelectImage_DepictImageDataFragment,
} from './fragments';



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
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


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
                ...TextSelectImage_DepictImageDataFragment
            }
        }
    }
    ${TextSelectImage_DepictImageDataFragment}
`;


export const GET_DEPICT_IMAGE_DATA_BY_IMAGE_ID = gql`
    query GetDepictImageDataByImageID($imageID: String!) {
        getDepictImageDataByImageID(imageID: $imageID) {
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
