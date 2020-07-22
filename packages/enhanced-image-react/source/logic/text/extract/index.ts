import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import baseRequest from '../../base';

import {
    EXTRACT_TEXT_WITH_API_KEY,
    EXTRACT_TEXT_WITH_OWNER_TOKEN,
    EXTRACT_TEXT_WITH_IMAGE_ID,
} from '../../../services/graphql/mutate';




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
 * @param logErrors
 */
export const withAPIKey = async (
    input: InputExtractTextWithApiKey,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const request = await baseRequest(
        input,
        EXTRACT_TEXT_WITH_API_KEY,
        'enhancedImageExtractTextWithAPIKey',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
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
 * @param logErrors
 */
export const withOwnerToken = async (
    input: InputExtractTextWithOwnerToken,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const request = await baseRequest(
        input,
        EXTRACT_TEXT_WITH_OWNER_TOKEN,
        'enhancedImageExtractTextWithOwnerToken',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
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
 * @param logErrors
 */
export const withImageID = async (
    input: InputExtractTextWithImageID,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const request = await baseRequest(
        input,
        EXTRACT_TEXT_WITH_IMAGE_ID,
        'enhancedImageExtractTextWithImageID',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
}
