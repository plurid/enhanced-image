import gql from 'graphql-tag';



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
            }
            errors {
                path
                message
            }
        }
    }
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
