import gql from 'graphql-tag';



export const DepictProductAccessFragment = gql`
    fragment DepictProductAccessFragment on DepictProductAccess {
        role
        imageEnhances {
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
    }
`;


export const DepictProductFragment = gql`
    fragment DepictProductFragment on OwnerProducts {
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
        owner {
            identonym
        }
    }
`;
