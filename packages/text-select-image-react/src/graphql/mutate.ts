import gql from 'graphql-tag';

import {
    DepictImageDataFragment,
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
                ...DepictImageDataFragment
            }
        }
    }
    ${DepictImageDataFragment}
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
