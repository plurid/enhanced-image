import { ApolloClient } from 'apollo-boost';

import {
    REQUEST_ERRORS,
} from '../data/constants';

import {
    EXTRACT_TEXT_WITH_API_KEY,
    EXTRACT_TEXT_WITH_USER_TOKEN,
    EXTRACT_TEXT_WITH_IMAGE_ID,
} from '../services/graphql/mutate';



export interface InputExtractTextWithApiKey {
    imageURL: string;
    apiKey: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `apiKey`.
 *
 * @param input
 * @param graphqlClient
 */
export const extractTextWithAPIKey = async (
    input: InputExtractTextWithApiKey,
    graphqlClient: ApolloClient<unknown>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: EXTRACT_TEXT_WITH_API_KEY,
            variables: {
                input,
            },
        });

        const mutationResponse = mutation.data.enhancedImageExtractTextWithAPIKey;

        if (!mutationResponse.status) {
            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            }
            return response;
        }

        const {
            data,
        } = mutationResponse;

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



export interface InputExtractTextWithUserToken {
    imageURL: string;
    userToken: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `userToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const extractTextWithUserToken = async (
    input: InputExtractTextWithUserToken,
    graphqlClient: ApolloClient<unknown>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: EXTRACT_TEXT_WITH_USER_TOKEN,
            variables: {
                input,
            },
        });

        const mutationResponse = mutation.data.enhancedImageExtractTextWithUserToken;

        if (!mutationResponse.status) {
            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            }
            return response;
        }

        const {
            data,
        } = mutationResponse;

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


export interface InputExtractTextWithImageID {
    imageURL: string;
    imageID: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `userToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const extractTextWithImageID = async (
    input: InputExtractTextWithImageID,
    graphqlClient: ApolloClient<unknown>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: EXTRACT_TEXT_WITH_IMAGE_ID,
            variables: {
                input,
            },
        });

        const mutationResponse = mutation.data.enhancedImageExtractTextWithImageID;

        if (!mutationResponse.status) {
            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            }
            return response;
        }

        const {
            data,
        } = mutationResponse;

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
