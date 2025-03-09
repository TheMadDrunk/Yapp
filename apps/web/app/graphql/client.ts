import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import env from "~/config/env";

const graphqlClient = new ApolloClient({
    uri: env.STRAPI_URL + "/graphql",
    cache: new InMemoryCache(),
    ssrMode: true,
    headers: {
        Authorization: `Bearer ${env.STRAPI_TOKEN}`,
    },
});

export default graphqlClient;