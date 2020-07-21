import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';

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
