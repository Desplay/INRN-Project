import { ApolloClient, InMemoryCache } from "@apollo/client";

const IP = "172.17.29.248";
export const uri = `http://${IP}:3000/graphql`;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export default client;
