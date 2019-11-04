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
            data {
                user {
                    id
                    username
                    products {
                        ...DepictProductFragment
                    }
                }
                token
                refreshToken
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
    mutation LoginByEmail($email: String!, $password: String!) {
        loginByEmail(
            email: $email,
            password: $password
        ) {
            status
            data {
                user {
                    id
                    username
                    products {
                        ...DepictProductFragment
                    }
                }
                token
                refreshToken
            }
            errors {
                path
                message
                type
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
