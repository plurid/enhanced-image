import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import {
    API_URI,
} from '../../data/constants';



const client = new ApolloClient({
    link: createHttpLink({
        uri: API_URI,
        credentials: 'include',
    }),
    cache: new InMemoryCache(),
});


export default client;
