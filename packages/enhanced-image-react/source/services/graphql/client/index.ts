import fetch from 'cross-fetch';

import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';



const client = (
    uri: string,
) => {
    const cache = new InMemoryCache();
    const link = createHttpLink({
        uri,
        credentials: 'include',
        fetch,
    });

    const client = new ApolloClient({
        link,
        cache,
    });

    return client;
}


export default client;
