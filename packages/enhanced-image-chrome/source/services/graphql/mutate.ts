import gql from 'graphql-tag';

import {
    DepictProductFragment,
} from './fragments';



export const LOGIN_BY_IDENTONYM = gql`
    mutation LoginByIdentonym($input: InputLoginByIdentonym!) {
        loginByIdentonym(input: $input) {
            status
            data {
                owner {
                    id
                    identonym
                    products {
                        ...DepictProductFragment
                    }
                }
                tokens {
                    access
                    refresh
                }
            }
            errors {
                path
                message
                type
            }
        }
    }
    ${DepictProductFragment}
`;


export const LOGIN_BY_EMAIL = gql`
    mutation LoginByEmail($input: InputLoginByEmail!) {
        loginByEmail(input: $input) {
            status
            data {
                owner {
                    id
                    identonym
                    products {
                        ...DepictProductFragment
                    }
                }
                tokens {
                    access
                    refresh
                }
            }
            errors {
                path
                message
                type
            }
        }
    }
    ${DepictProductFragment}
`;


export const LOGOUT = gql`
    mutation {
        logout {
            status
        }
    }
`;
