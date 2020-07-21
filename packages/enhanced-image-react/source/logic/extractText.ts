import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import {
    graphql,
} from '@plurid/plurid-functions';

import {
    REQUEST_ERRORS,
} from '../data/constants';

import {
    EXTRACT_TEXT_WITH_API_KEY,
    EXTRACT_TEXT_WITH_OWNER_TOKEN,
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
    graphqlClient: ApolloClient<NormalizedCacheObject>,
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
            const error = mutationResponse.errors[0];
            const response = {
                status: false,
                error: error.type,
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
            data: graphql.deleteTypenames(data),
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



export interface InputExtractTextWithOwnerToken {
    imageURL: string;
    ownerToken: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `ownerToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const extractTextWithOwnerToken = async (
    input: InputExtractTextWithOwnerToken,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: EXTRACT_TEXT_WITH_OWNER_TOKEN,
            variables: {
                input,
            },
        });

        const mutationResponse = mutation.data.enhancedImageExtractTextWithOwnerToken;

        if (!mutationResponse.status) {
            const error = mutationResponse.errors[0];
            const response = {
                status: false,
                error: error.type,
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
            data: graphql.deleteTypenames(data),
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
 * based on the `ownerToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const extractTextWithImageID = async (
    input: InputExtractTextWithImageID,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
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
            const error = mutationResponse.errors[0];
            const response = {
                status: false,
                error: error.type,
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
            data: graphql.deleteTypenames(data),
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
