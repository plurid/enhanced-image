import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import {
    graphql,
} from '@plurid/plurid-functions';

import {
    REQUEST_ERRORS,
} from '../../../data/constants';

import {
    GET_TEXT_WITH_API_KEY,
    GET_TEXT_WITH_OWNER_TOKEN,
    GET_TEXT_WITH_IMAGE_ID,
} from '../../../services/graphql/query';



export interface InputGetTextWithAPIKey {
    imageURL: string;
    apiKey: string;
}

/**
 * Query `graphqlClient` with the `input` variable
 * based on the `apiKey`.
 *
 * @param input
 * @param graphqlClient
 * @param logErrors
 */
export const withAPIKey = async (
    input: InputGetTextWithAPIKey,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    try {
        const query = await graphqlClient.query({
            query: GET_TEXT_WITH_API_KEY,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const queryResponse = query.data.enhancedImageGetTextWithAPIKey;

        if (!queryResponse.status) {
            const error = queryResponse.errors[0];

            if (logErrors) {
                console.log(error);
            }

            const response = {
                status: false,
                error: error.type,
                data: undefined,
            };
            return response;
        }

        const {
            data,
        } = queryResponse;

        const response = {
            status: true,
            error: undefined,
            data: graphql.deleteTypenames(data),
        };
        return response;
    } catch (error) {
        if (logErrors) {
            console.log(error);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        };
        return response;
    }
}



export interface InputGetTextWithOwnerToken {
    imageURL: string;
    ownerToken: string;
}

/**
 * Query `graphqlClient` with the `input` variable
 * based on the `ownerToken`.
 *
 * @param input
 * @param graphqlClient
 * @param logErrors
 */
export const withOwnerToken = async (
    input: InputGetTextWithOwnerToken,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    try {
        const query = await graphqlClient.query({
            query: GET_TEXT_WITH_OWNER_TOKEN,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const queryResponse = query.data.enhancedImageGetTextWithOwnerToken;

        if (!queryResponse.status) {
            const error = queryResponse.errors[0];

            if (logErrors) {
                console.log(error);
            }

            const response = {
                status: false,
                error: error.type,
                data: undefined,
            };
            return response;
        }

        const {
            data,
        } = queryResponse;

        const response = {
            status: true,
            error: undefined,
            data: graphql.deleteTypenames(data),
        };
        return response;
    } catch (error) {
        if (logErrors) {
            console.log(error);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        }
        return response;
    }
}



export interface InputGetTextWithImageID {
    imageURL: string;
    imageID: string;
}

/**
 * Query `graphqlClient` with the `input` variable
 * based on the `imageID`.
 *
 * @param input
 * @param graphqlClient
 * @param logErrors
 */
export const withImageID = async (
    input: InputGetTextWithImageID,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    try {
        const query = await graphqlClient.query({
            query: GET_TEXT_WITH_IMAGE_ID,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const queryResponse = query.data.enhancedImageGetTextWithImageID;

        if (!queryResponse.status) {
            const error = queryResponse.errors[0];

            if (logErrors) {
                console.log(error);
            }

            const response = {
                status: false,
                error: error.type,
                data: undefined,
            };
            return response;
        }

        const {
            data,
        } = queryResponse;

        const response = {
            status: true,
            error: undefined,
            data: graphql.deleteTypenames(data),
        };
        return response;
    } catch (error) {
        if (logErrors) {
            console.log(error);
        }

        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        }
        return response;
    }
}
