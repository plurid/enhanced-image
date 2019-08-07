import gql from 'graphql-tag';

import {
    DepictProductFragment,
} from './fragments';



export const LOGIN_BY_USERNAME = gql`
    mutation LoginByUsername($username: String!, $password: String!) {
        loginByUsername(
            username: $username,
            password: $password
        ) {
            status
            user {
                id
                username
                products {
                    ...DepictProductFragment
                }
            }
            errors {
                path
                message
            }
        }
    }
    ${DepictProductFragment}
`;


export const LOGIN_BY_EMAIL = gql`
    mutation LoginByEmail($email: String!, $password: String!) {
        loginByEmail(
            email: $email,
            password: $password
        ) {
            status
            user {
                id
                username
                products {
                    ...DepictProductFragment
                }
            }
            errors {
                path
                message
            }
        }
    }
`;


export const LOGOUT = gql`
    mutation {
        logout {
            status
        }
    }
`;


export const INITIALIZE_DEPICT_USER = gql`
    mutation InitializeDepictUser {
        initializeDepictUser {
            status
            errors {
                path
                message
                type
            }
        }
    }
`;
