import gql from 'graphql-tag';



export const EnhancedImageDataFragment = gql`
    fragment EnhancedImage_EnhancedImageDataFragment on EnhancedImageData {
        imageSHA
        imageText {
            id
            currentVersionId
            versions {
                bold
                color
                content
                fontFamily
                fontSizePercentage
                id
                italic
                letterSpacingPercentage
                lineHeight
                link
                linkTo
                perspective
                rotation
                skew
                viewable
                wordSpacingPercentage
                xCoordPercentage
                yCoordPercentage
            }
        }
    }
`;
