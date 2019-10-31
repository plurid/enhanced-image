import ApolloClient from 'apollo-boost';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';



const client = (uri: string) => new ApolloClient({
    uri,
    credentials: 'include',
});

// const client = (uri: string) => {
//     const cache = new InMemoryCache();
//     const link = new HttpLink({
//         uri,
//         credentials: 'include',
//     });

//     const client = new ApolloClient({
//         cache,
//         link,
//     });

//     return client;
// }


export default client;
