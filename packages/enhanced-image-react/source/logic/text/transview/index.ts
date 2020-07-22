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
    TRANSVIEW_TEXT_WITH_API_KEY,
    TRANSVIEW_TEXT_WITH_OWNER_TOKEN,
    TRANSVIEW_TEXT_WITH_IMAGE_ID,
} from '../../../services/graphql/mutate';



export interface InputTransviewTextWithAPIKey {
    imageURL: string;
    imageID: string;
    apiKey: string;
    source: string;
    target: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `apiKey`.
 *
 * @param input
 * @param graphqlClient
 * @param logErrors
 */
export const withAPIKey = async (
    input: InputTransviewTextWithAPIKey,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: TRANSVIEW_TEXT_WITH_API_KEY,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const mutationResponse = mutation.data.enhancedImageTransviewTextWithAPIKey;
        // console.log(mutationResponse);

        if (!mutationResponse.status) {
            if (logErrors) {
                console.log(mutationResponse.errors);
            }

            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            };
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



export interface InputTransviewTextWithOwnerToken {
    imageURL: string;
    imageID: string;
    ownerToken: string;
    source: string;
    target: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `ownerToken`.
 *
 * @param input
 * @param graphqlClient
 * @param logErrors
 */
export const withOwnerToken = async (
    input: InputTransviewTextWithOwnerToken,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: TRANSVIEW_TEXT_WITH_OWNER_TOKEN,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const mutationReponse = mutation.data.enhancedImageTransviewTextWithOwnerToken;

        if (!mutationReponse.status) {
            if (logErrors) {
                console.log(mutationReponse.errors);
            }

            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            };
            return response;
        }

        const {
            data,
        } = mutationReponse;

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



export interface InputTransviewTextWithImageID {
    imageURL: string;
    imageID: string;
    source: string;
    target: string;
}

/**
 * Mutate `graphqlClient` with the `input` variable
 * based on the `ownerToken`.
 *
 * @param input
 * @param graphqlClient
 * @param logErrors
 */
export const withImageID = async (
    input: InputTransviewTextWithImageID,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    try {
        const mutation = await graphqlClient.mutate({
            mutation: TRANSVIEW_TEXT_WITH_IMAGE_ID,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const mutationResponse = mutation.data.enhancedImageTransviewTextWithImageID;

        if (!mutationResponse.status) {
            if (logErrors) {
                console.log(mutationResponse.errors);
            }

            const response = {
                status: false,
                error: REQUEST_ERRORS.BAD_REQUEST,
                data: undefined,
            };
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
