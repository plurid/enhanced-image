import { gql } from 'apollo-boost';



export const getTextSelectImage = gql`
    query TextSelectImage($sha: String!) {
        textSelectImage(sha: $sha) {
            user {
                username
            }
            imagePath
            imageHeight
            imageWidth
            imageText {
                currentVersionId
                versions {
                    id
                    createdAt
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
`
