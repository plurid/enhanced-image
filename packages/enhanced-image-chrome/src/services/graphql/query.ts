import gql from 'graphql-tag';

import {
    DepictProductFragment,
    // DepictImageDataFragment,
} from './fragments';



export const CURRENT_USER = gql`
    query CurrentUser {
        currentUser {
            status
            data {
                username
                products {
                    ...DepictProductFragment
                }
            }
        }
    }
    ${DepictProductFragment}
`;
