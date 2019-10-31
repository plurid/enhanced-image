import { ApolloClient } from 'apollo-boost';

import {
    REQUEST_ERRORS,
} from '../data/constants';

import {
    GET_TEXT_WITH_API_KEY,
    GET_TEXT_WITH_USER_TOKEN,
    GET_TEXT_WITH_IMAGE_ID,
} from '../services/graphql/query';



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
 */
export const getTextWithAPIKey = async (
    input: InputGetTextWithAPIKey,
    graphqlClient: ApolloClient<any>,
) => {
    try {
        const query = await graphqlClient.query({
            query: GET_TEXT_WITH_API_KEY,
            variables: {
                input,
            },
        });

        const queryResponse = query.data.enhancedImageGetTextWithAPIKey;

        if (!queryResponse.status) {
            const error = queryResponse.errors[0];
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
            data,
        };
        return response;
    } catch (error) {
        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        }
        return response;
    }
}


export interface InputGetTextWithUserToken {
    imageURL: string;
    userToken: string;
}

/**
 * Query `graphqlClient` with the `input` variable
 * based on the `userToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const getTextWithUserToken = async (
    input: InputGetTextWithUserToken,
    graphqlClient: ApolloClient<any>,
) => {
    try {
        const query = await graphqlClient.query({
            query: GET_TEXT_WITH_USER_TOKEN,
            variables: {
                input,
            },
        });

        const queryResponse = query.data.enhancedImageGetTextWithUserToken;

        if (!queryResponse.status) {
            const error = queryResponse.errors[0];
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
            data,
        };
        return response;
    } catch (error) {
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
 */
export const getTextWithImageID = async (
    input: InputGetTextWithImageID,
    graphqlClient: ApolloClient<any>,
) => {
    try {
        const query = await graphqlClient.query({
            query: GET_TEXT_WITH_IMAGE_ID,
            variables: {
                input,
            },
        });

        const queryResponse = query.data.enhancedImageGetTextWithImageID;

        if (!queryResponse.status) {
            const error = queryResponse.errors[0];
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
            data,
        };
        return response;
    } catch (error) {
        const response = {
            status: false,
            error: REQUEST_ERRORS.BAD_REQUEST,
            data: undefined,
        }
        return response;
    }
}
