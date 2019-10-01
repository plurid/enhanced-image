import ApolloClient from 'apollo-boost';



const client = (uri: string) => new ApolloClient({ uri });


export default client;
