import { ApolloClient, InMemoryCache } from "@apollo/client";

const IP = "10.45.11.22";
const uri = `http://${IP}:3000/graphql`;

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default client;