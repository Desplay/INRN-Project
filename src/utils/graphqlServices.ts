import { ApolloClient, InMemoryCache } from "@apollo/client";

const IP = "10.0.20.22";
const uri = `http://${IP}:3000/graphql`;

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

export default client;
