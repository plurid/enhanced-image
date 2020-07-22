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
                    font {
                        weight
                        style
                        family
                        size
                        letterSpacing
                        wordSpacing
                        lineHeight
                    }
                    color
                    content
                    transview {
                        active
                        data {
                            backgrounded
                            language
                            content
                        }
                    }
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



export const EnhancedImageResponseFragment = gql`
    fragment EnhancedImage_EnhancedImageResponseFragment on EnhancedImageResponse {
        status
        errors {
            path
            message
            type
        }
        data {
            ...EnhancedImage_EnhancedImageDataFragment
        }
    }
    ${EnhancedImageDataFragment}
`;
