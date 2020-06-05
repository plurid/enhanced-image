import gql from 'graphql-tag';

import {
    DepictProductFragment,
    // DepictImageDataFragment,
} from './fragments';



export const CURRENT_OWNER = gql`
    query CurrentOwner {
        currentOwner {
            status
            data {
                identonym
                products {
                    ...DepictProductFragment
                }
            }
        }
    }
    ${DepictProductFragment}
`;
