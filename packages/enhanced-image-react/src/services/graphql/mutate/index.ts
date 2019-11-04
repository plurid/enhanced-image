import gql from 'graphql-tag';

import {
    EnhancedImageDataFragment,
} from '../fragments';



export const EXTRACT_TEXT_WITH_API_KEY = gql`
    mutation EnhancedImageExtractTextWithAPIKey(
        $input: InputEnhancedImageExtractTextWithAPIKey!
    ) {
        enhancedImageExtractTextWithAPIKey(input: $input) {
            status
            errors {
                path
                message
                type
            }
            data {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const EXTRACT_TEXT_WITH_USER_TOKEN = gql`
    mutation EnhancedImageExtractTextWithUserKey(
        $input: InputEnhancedImageExtractTextWithUserKey!
    ) {
        enhancedImageExtractTextWithUserKey(input: $input) {
            status
            errors {
                path
                message
                type
            }
            data {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const EXTRACT_TEXT_WITH_IMAGE_ID = gql`
    mutation EnhancedImageExtractTextWithImageID(
        $input: InputEnhancedImageExtractTextWithImageID!
    ) {
        enhancedImageExtractTextWithImageID(input: $input) {
            status
            errors {
                path
                message
                type
            }
            data {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;



export const SAVE_TEXT_WITH_API_KEY = gql`
    mutation EnhancedImageSaveTextWithAPIKey(
        $input: InputEnhancedImageSaveTextWithAPIKey!
    ) {
        enhancedImageSaveTextWithAPIKey(input: $input) {
            status
            errors {
                path
                message
                type
            }
            data {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const SAVE_TEXT_WITH_USER_TOKEN = gql`
    mutation EnhancedImageSaveTextWithUserToken(
        $input: InputEnhancedImageSaveTextWithUserToken!
    ) {
        enhancedImageSaveTextWithUserToken(input: $input) {
            status
            errors {
                path
                message
                type
            }
            data {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const SAVE_TEXT_WITH_IMAGE_ID = gql`
    mutation EnhancedImageSaveTextWithImageID(
        $input: InputEnhancedImageSaveTextWithImageID!
    ) {
        enhancedImageSaveTextWithImageID(input: $input) {
            status
            errors {
                path
                message
                type
            }
            data {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;
