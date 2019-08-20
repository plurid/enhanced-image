import gql from 'graphql-tag';



export const TextSelectImage_DepictImageDataFragment = gql`
    fragment TextSelectImage_DepictImageDataFragment on DepictImageData {
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
