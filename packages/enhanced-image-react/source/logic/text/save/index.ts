import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

// import {
//     graphql,
// } from '@plurid/plurid-functions';

// import {
//     REQUEST_ERRORS,
// } from '../../../data/constants';

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

    // try {
    //     const mutation = await graphqlClient.mutate({
    //         mutation: SAVE_TEXT_WITH_API_KEY,
    //         variables: {
    //             input,
    //         },
    //         fetchPolicy: 'no-cache',
    //     });

    //     const mutationResponse = mutation.data.enhancedImageSaveTextWithAPIKey;
    //     // console.log(mutationResponse);

    //     if (!mutationResponse.status) {
    //         if (logErrors) {
    //             console.log(mutationResponse.errors);
    //         }

    //         const response = {
    //             status: false,
    //             error: REQUEST_ERRORS.BAD_REQUEST,
    //             data: undefined,
    //         };
    //         return response;
    //     }

    //     const {
    //         data,
    //     } = mutationResponse;

    //     const response = {
    //         status: true,
    //         error: undefined,
    //         data: graphql.deleteTypenames(data),
    //     };
    //     return response;
    // } catch (error) {
    //     if (logErrors) {
    //         console.log(error);
    //     }

    //     const response = {
    //         status: false,
    //         error: REQUEST_ERRORS.BAD_REQUEST,
    //         data: undefined,
    //     };
    //     return response;
    // }
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

    // try {
    //     const mutation = await graphqlClient.mutate({
    //         mutation: SAVE_TEXT_WITH_OWNER_TOKEN,
    //         variables: {
    //             input,
    //         },
    //         fetchPolicy: 'no-cache',
    //     });

    //     const mutationReponse = mutation.data.enhancedImageSaveTextWithOwnerToken;

    //     if (!mutationReponse.status) {
    //         if (logErrors) {
    //             console.log(mutationReponse.errors);
    //         }

    //         const response = {
    //             status: false,
    //             error: REQUEST_ERRORS.BAD_REQUEST,
    //             data: undefined,
    //         };
    //         return response;
    //     }

    //     const {
    //         data,
    //     } = mutationReponse;

    //     const response = {
    //         status: true,
    //         error: undefined,
    //         data: graphql.deleteTypenames(data),
    //     };
    //     return response;
    // } catch (error) {
    //     if (logErrors) {
    //         console.log(error);
    //     }

    //     const response = {
    //         status: false,
    //         error: REQUEST_ERRORS.BAD_REQUEST,
    //         data: undefined,
    //     };
    //     return response;
    // }
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

    // try {
    //     const mutation = await graphqlClient.mutate({
    //         mutation: SAVE_TEXT_WITH_IMAGE_ID,
    //         variables: {
    //             input,
    //         },
    //         fetchPolicy: 'no-cache',
    //     });

    //     const mutationResponse = mutation.data.enhancedImageSaveTextWithImageID;

    //     if (!mutationResponse.status) {
    //         if (logErrors) {
    //             console.log(mutationResponse.errors);
    //         }

    //         const response = {
    //             status: false,
    //             error: REQUEST_ERRORS.BAD_REQUEST,
    //             data: undefined,
    //         };
    //         return response;
    //     }

    //     const {
    //         data,
    //     } = mutationResponse;

    //     const response = {
    //         status: true,
    //         error: undefined,
    //         data: graphql.deleteTypenames(data),
    //     };
    //     return response;
    // } catch (error) {
    //     if (logErrors) {
    //         console.log(error);
    //     }

    //     const response = {
    //         status: false,
    //         error: REQUEST_ERRORS.BAD_REQUEST,
    //         data: undefined,
    //     };
    //     return response;
    // }
}