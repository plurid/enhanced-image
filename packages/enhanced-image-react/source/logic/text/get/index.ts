import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import baseRequest from '../../base';

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
    const request = await baseRequest(
        input,
        GET_TEXT_WITH_API_KEY,
        'enhancedImageGetTextWithAPIKey',
        'query',
        graphqlClient,
        logErrors,
    );

    return request;
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
    const request = await baseRequest(
        input,
        GET_TEXT_WITH_OWNER_TOKEN,
        'enhancedImageGetTextWithOwnerToken',
        'query',
        graphqlClient,
        logErrors,
    );

    return request;
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
    const request = await baseRequest(
        input,
        GET_TEXT_WITH_IMAGE_ID,
        'enhancedImageGetTextWithImageID',
        'query',
        graphqlClient,
        logErrors,
    );

    return request;
}
