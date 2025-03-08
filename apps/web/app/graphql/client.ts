import { ApolloClient, InMemoryCache } from "@apollo/client/core";

c

if (!token || !url) {
    throw new Error("STRAPI_TOKEN and STRAPI_URL must be set");
}

const graphqlClient = new ApolloClient({
    uri: url + "/graphql",
    cache: new InMemoryCache(),
    ssrMode: true,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default graphqlClient;