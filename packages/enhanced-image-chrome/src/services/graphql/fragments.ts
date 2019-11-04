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


export const DepictProductFragment = gql`
    fragment DepictProductFragment on Products {
        depict {
            access {
                ...DepictProductAccessFragment
            }
        }
    }
    ${DepictProductAccessFragment}
`;


export const DepictImageDataFragment = gql`
    fragment DepictImageDataFragment on DepictImageData {
        imageSHA
        imageShortSHA
        imageFilename
        publicImage
        user {
            username
        }
    }
`;
