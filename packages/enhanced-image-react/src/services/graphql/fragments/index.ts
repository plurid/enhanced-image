import gql from 'graphql-tag';



export const EnhancedImageDataFragment = gql`
    fragment EnhancedImage_EnhancedImageDataFragment on EnhancedImageData {
        imageSHA
        imageText {
            id
            currentVersionId
            versions {
                ... on DepictImageTextVersionTextline {
                    id
                    type

                    xCoordPercentage
                    yCoordPercentage

                    perspective
                    rotation
                    skew

                    viewable

                    fontWeight
                    fontStyle
                    fontFamily
                    fontSizePercentage
                    letterSpacingPercentage
                    lineHeight
                    wordSpacingPercentage

                    content

                    link
                    linkTo
                }
            }
        }
    }
`;
