import {
    ApolloClient,
    NormalizedCacheObject,
} from '@apollo/client';

import {
    DocumentNode,
} from 'graphql';

import {
    graphql,
} from '@plurid/plurid-functions';

import {
    REQUEST_ERRORS,
} from '../../data/constants';



/**
 *
 * @param input
 * @param node
 * @param type
 * @param requestKind
 * @param graphqlClient
 * @param logErrors
 */
const baseRequest = async <T>(
    input: T,
    node: DocumentNode,
    type: string,
    requestKind: 'query' | 'mutate',
    graphqlClient: ApolloClient<NormalizedCacheObject>,
    logErrors?: boolean,
) => {
    const badRequestResponse = {
        status: false,
        error: REQUEST_ERRORS.BAD_REQUEST,
        data: undefined,
    };

    try {
        let request: any;

        switch (requestKind) {
            case 'query':
                request = await graphqlClient.query({
                    query: node,
                    variables: {
                        input,
                    },
                    fetchPolicy: 'no-cache',
                });
                break;
            case 'mutate':
                request = await graphqlClient.mutate({
                    mutation: node,
                    variables: {
                        input,
                    },
                });
                break;
        }

        if (!request) {
            return badRequestResponse;
        }

        const responseData = request.data[type];

        if (!responseData.status) {
            const error = responseData.errors[0];

            if (logErrors) {
                console.log(error);
            }

            const response = {
                status: false,
                error: error.type,
                data: undefined,
            };
            return response;
        }

        const {
            data,
        } = responseData;

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

        return badRequestResponse;
    }
}


export default baseRequest;
