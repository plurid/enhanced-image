import gql from 'graphql-tag';



export const DepictProductAccessFragment = gql`
    fragment DepictProductAccessFragment on DepictProductAccess {
        role
        imageTransformations {
            free
            paid
            subscription
        }
        ingress {
            active
            start
            end
        }
        subscription {
            active
            start
            end
            plan
        }
        trial {
            active
            start
            end
        }
    }
`;


export const DepictProductProfileFragment = gql`
    fragment DepictProductProfileFragment on DepictProductProfile {
        active
        name
    }
`;


export const DepictProductUIFragment = gql`
    fragment DepictProductUIFragment on DepictProductUI {
        themes {
            generalTheme
            interactionTheme
        }
        images {
            alwaysShowImageMetadata
        }
        toolbars {
            toolbarLocation
            alwaysShowToolbar
            showToolbarNameHover
            scaleToolbarHover
        }
        stateShare {
            compactButtons
        }
        shortcuts {
            key
            type
            modifier
        }
    }
`;


export const DepictProductPersonalizationFragment = gql`
    fragment DepictProductPersonalizationFragment on DepictProductPersonalization {
        world
    }
`;


export const DepictProductSittingsFragment = gql`
    fragment DepictProductSittingsFragment on DepictProductSitting {
        id
    }
`;


export const DepictProductFragment = gql`
    fragment DepictProductFragment on Products {
        depict {
            access {
                ...DepictProductAccessFragment
            }
            # profile {
            #     ...DepictProductProfileFragment
            # }
            # ui {
            #     ...DepictProductUIFragment
            # }
            # personalization {
            #     ...DepictProductPersonalizationFragment
            # }
            # sittings {
            #     ...DepictProductSittingsFragment
            # }
        }
    }
    ${DepictProductAccessFragment}
`;
    // ${DepictProductProfileFragment}
    // ${DepictProductUIFragment}
    // ${DepictProductPersonalizationFragment}
    // ${DepictProductSittingsFragment}


export const DepictImageDataFragment = gql`
    fragment DepictImageDataFragment on DepictImageData {
        imageSHA
        imageShortSHA
        imageFilename
        publicImage
        uploadedBy
        user {
            username
        }
        createdAt
        metadata {
            title
            description
            topics {
                id
                name
            }
            album {
                id
                text
            }
            date {
                timestamp
                text
            }
            event {
                detimeEventId
                text
            }
            location {
                coordinates {
                    latitude
                    longitude
                }
                text
            }
            technical {
                channels
                chromaSubsampling
                density
                format
                hasAlpha
                height
                size
                space
                width
            }
        }
    }
`;
