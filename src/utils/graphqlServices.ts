import { ApolloClient, InMemoryCache } from "@apollo/client";

export const uri = `https://inrn-project-services.adaptable.app/graphql`;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
