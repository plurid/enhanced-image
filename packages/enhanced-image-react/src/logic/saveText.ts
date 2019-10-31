import { ApolloClient } from 'apollo-boost';

import {
    REQUEST_ERRORS,
} from '../data/constants';

import {
    SAVE_TEXT_WITH_API_KEY,
    SAVE_TEXT_WITH_USER_TOKEN,
    SAVE_TEXT_WITH_IMAGE_ID,
} from '../services/graphql/mutate';



export interface InputSaveTextWithAPIKey {
    imageURL: string;
    imageID: string;
    apiKey: string;
    imageText: any;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `apiKey`.
 *
 * @param input
 * @param graphqlClient
 */
export const saveTextWithAPIKey = async (
    input: InputSaveTextWithAPIKey,
    graphqlClient: ApolloClient<any>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: SAVE_TEXT_WITH_API_KEY,
            variables: {
                input,
            },
        });

        const mutationResponse = mutation.data.enhancedImageSaveTextWithAPIKey;

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


export interface InputSaveTextWithUserToken {
    imageURL: string;
    imageID: string;
    userToken: string;
    imageText: any;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `userToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const saveTextWithUserToken = async (
    input: InputSaveTextWithUserToken,
    graphqlClient: ApolloClient<any>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: SAVE_TEXT_WITH_USER_TOKEN,
            variables: {
                input,
            },
        });

        const mutationReponse = mutation.data.enhancedImageSaveTextWithUserToken;

        if (!mutationReponse.status) {
            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            }
            return response;
        }

        const {
            data,
        } = mutationReponse;

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




export interface InputSaveTextWithImageID {
    imageURL: string;
    imageID: string;
    imageText: any;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `userToken`.
 *
 * @param input
 * @param graphqlClient
 */
export const saveTextWithImageID = async (
    input: InputSaveTextWithImageID,
    graphqlClient: ApolloClient<any>,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: SAVE_TEXT_WITH_IMAGE_ID,
            variables: {
                input,
            },
        });

        const mutationResponse = mutation.data.enhancedImageSaveTextWithImageID;

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
