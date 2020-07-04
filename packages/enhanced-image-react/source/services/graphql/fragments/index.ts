import gql from 'graphql-tag';



export const EnhancedImageDataFragment = gql`
    fragment EnhancedImage_EnhancedImageDataFragment on EnhancedImageData {
        imageID
        imageText {
            id
            currentVersionId
            versions {
                ... on DepictImageTextVersionTextline {
                    id
                    type
                    position {
                        x
                        y
                    }
                    transform {
                        perspective
                        rx
                        ry
                        rz
                        sx
                        sy
                    }
                    viewable
                    color
                    font {
                        weight
                        style
                        family
                        size
                        letterSpacing
                        wordSpacing
                        lineHeight
                    }
                    content
                    link {
                        active
                        to
                    }
                    action {
                        active
                        type
                    }
                }
            }
        }
    }
`;
