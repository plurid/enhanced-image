import gql from 'graphql-tag';

import {
    EnhancedImageDataFragment,
} from '../fragments';



export const GET_TEXT_WITH_API_KEY = gql`
    query EnhancedImageGetTextWithApiKey(
        $input: InputEnhancedImageGetTextWithApiKey!
    ) {
        enhancedImageGetTextWithApiKey(input: $input) {
            status
            errors {
                path
                message
                type
            }
            imageData {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const GET_TEXT_WITH_USER_TOKEN = gql`
    query EnhancedImageGetTextWithUserToken(
        $input: InputEnhancedImageGetTextWithUserToken!
    ) {
        enhancedImageGetTextWithUserToken(input: $input) {
            status
            errors {
                path
                message
                type
            }
            imageData {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;


export const GET_TEXT_WITH_IMAGE_ID = gql`
    query EnhancedImageGetTextWithImageID(
        $input: InputEnhancedImageGetTextWithImageID!
    ) {
        enhancedImageGetTextWithImageID(input: $input) {
            status
            errors {
                path
                message
                type
            }
            imageData {
                ...EnhancedImage_EnhancedImageDataFragment
            }
        }
    }
    ${EnhancedImageDataFragment}
`;
