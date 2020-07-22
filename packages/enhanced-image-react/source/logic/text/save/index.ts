import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import baseRequest from '../../base';

import {
    SAVE_TEXT_WITH_API_KEY,
    SAVE_TEXT_WITH_OWNER_TOKEN,
    SAVE_TEXT_WITH_IMAGE_ID,
} from '../../../services/graphql/mutate';



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
 * @param logErrors
 */
export const withAPIKey = async (
    input: InputSaveTextWithAPIKey,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const request = await baseRequest(
        input,
        SAVE_TEXT_WITH_API_KEY,
        'enhancedImageSaveTextWithAPIKey',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
}



export interface InputSaveTextWithOwnerToken {
    imageURL: string;
    imageID: string;
    ownerToken: string;
    imageText: any;
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
    input: InputSaveTextWithOwnerToken,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const request = await baseRequest(
        input,
        SAVE_TEXT_WITH_OWNER_TOKEN,
        'enhancedImageSaveTextWithOwnerToken',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
}



export interface InputSaveTextWithImageID {
    imageURL: string;
    imageID: string;
    imageText: any;
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
    input: InputSaveTextWithImageID,
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const request = await baseRequest(
        input,
        SAVE_TEXT_WITH_IMAGE_ID,
        'enhancedImageSaveTextWithImageID',
        'mutate',
        graphqlClient,
        logErrors,
    );

    return request;
}
