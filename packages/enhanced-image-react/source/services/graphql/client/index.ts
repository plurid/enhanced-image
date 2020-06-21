import fetch from 'cross-fetch';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';



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
