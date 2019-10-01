import gql from 'graphql-tag';



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


export const GET_TEXT_WITH_API_KEY = gql`

`;


export const GET_TEXT_WITH_USER_TOKEN = gql`

`;


export const GET_TEXT_WITH_DEPICT_IMAGE_ID = gql`

`;
