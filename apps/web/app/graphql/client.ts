import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { token, url } from "~/utils/constants";

const graphqlClient = new ApolloClient({
    uri: url + "/graphql",
    cache: new InMemoryCache(),
    ssrMode: true,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default graphqlClient;