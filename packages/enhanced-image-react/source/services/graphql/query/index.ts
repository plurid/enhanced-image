import gql from 'graphql-tag';

import {
    EnhancedImageResponseFragment,
} from '../fragments';



export const GET_TEXT_WITH_API_KEY = gql`
    query EnhancedImageGetTextWithAPIKey(
        $input: InputEnhancedImageGetTextWithAPIKey!
    ) {
        enhancedImageGetTextWithAPIKey(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const GET_TEXT_WITH_OWNER_TOKEN = gql`
    query EnhancedImageGetTextWithOwnerToken(
        $input: InputEnhancedImageGetTextWithOwnerToken!
    ) {
        enhancedImageGetTextWithOwnerToken(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const GET_TEXT_WITH_IMAGE_ID = gql`
    query EnhancedImageGetTextWithImageID(
        $input: InputEnhancedImageGetTextWithImageID!
    ) {
        enhancedImageGetTextWithImageID(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;
