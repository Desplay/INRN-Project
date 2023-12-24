import { ApolloClient, InMemoryCache } from "@apollo/client";

const IP = "172.17.31.45";

export const uri = `https://inrn-project-services.adaptable.app/graphql`;

const client = new ApolloClient({
  uri,  
  cache: new InMemoryCache(),
});

export default client;
