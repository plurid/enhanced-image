import gql from 'graphql-tag';

import {
    EnhancedImageResponseFragment,
} from '../fragments';



export const EXTRACT_TEXT_WITH_API_KEY = gql`
    mutation EnhancedImageExtractTextWithAPIKey(
        $input: InputEnhancedImageExtractTextWithAPIKey!
    ) {
        enhancedImageExtractTextWithAPIKey(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const EXTRACT_TEXT_WITH_OWNER_TOKEN = gql`
    mutation EnhancedImageExtractTextWithOwnerToken(
        $input: InputEnhancedImageExtractTextWithOwnerToken!
    ) {
        enhancedImageExtractTextWithOwnerToken(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const EXTRACT_TEXT_WITH_IMAGE_ID = gql`
    mutation EnhancedImageExtractTextWithImageID(
        $input: InputEnhancedImageExtractTextWithImageID!
    ) {
        enhancedImageExtractTextWithImageID(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;



export const SAVE_TEXT_WITH_API_KEY = gql`
    mutation EnhancedImageSaveTextWithAPIKey(
        $input: InputEnhancedImageSaveTextWithAPIKey!
    ) {
        enhancedImageSaveTextWithAPIKey(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const SAVE_TEXT_WITH_OWNER_TOKEN = gql`
    mutation EnhancedImageSaveTextWithOwnerToken(
        $input: InputEnhancedImageSaveTextWithOwnerToken!
    ) {
        enhancedImageSaveTextWithOwnerToken(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const SAVE_TEXT_WITH_IMAGE_ID = gql`
    mutation EnhancedImageSaveTextWithImageID(
        $input: InputEnhancedImageSaveTextWithImageID!
    ) {
        enhancedImageSaveTextWithImageID(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;



export const TRANSVIEW_TEXT_WITH_API_KEY = gql`
    mutation EnhancedImageTransviewTextWithAPIKey(
        $input: InputEnhancedImageTransviewTextWithAPIKey!
    ) {
        enhancedImageTransviewTextWithAPIKey(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const TRANSVIEW_TEXT_WITH_OWNER_TOKEN = gql`
    mutation EnhancedImageTransviewTextWithOwnerToken(
        $input: InputEnhancedImageTransviewTextWithOwnerToken!
    ) {
        enhancedImageTransviewTextWithOwnerToken(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;


export const TRANSVIEW_TEXT_WITH_IMAGE_ID = gql`
    mutation EnhancedImageTransviewTextWithImageID(
        $input: InputEnhancedImageTransviewTextWithImageID!
    ) {
        enhancedImageTransviewTextWithImageID(input: $input) {
            ...EnhancedImage_EnhancedImageResponseFragment
        }
    }
    ${EnhancedImageResponseFragment}
`;
