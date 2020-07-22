import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import baseRequest from '../../base';

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
    const request = await baseRequest(
        input,
        TRANSVIEW_TEXT_WITH_API_KEY,
        'enhancedImageTransviewTextWithAPIKey',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
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
    const request = await baseRequest(
        input,
        TRANSVIEW_TEXT_WITH_OWNER_TOKEN,
        'enhancedImageTransviewTextWithOwnerToken',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
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
    const request = await baseRequest(
        input,
        TRANSVIEW_TEXT_WITH_IMAGE_ID,
        'enhancedImageTransviewTextWithImageID',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
}
