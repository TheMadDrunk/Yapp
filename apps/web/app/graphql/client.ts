import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import type { NormalizedCacheObject } from "@apollo/client/core";
import env from "~/config/env";

const isDevelopment = process.env.NODE_ENV === "dev";

const graphqlClient = new ApolloClient<NormalizedCacheObject>({
    uri: env.STRAPI_URL + "/graphql",
    cache: isDevelopment
        ? new InMemoryCache({
            // In development mode, disable caching completely
            typePolicies: {
                Query: {
                    fields: {
                        __typename: {
                            merge: false,
                        },
                    },
                },
            },
        })
        : new InMemoryCache(),
    ssrMode: true,
    headers: {
        Authorization: `Bearer ${env.STRAPI_TOKEN}`,
    },
    // In development mode, make sure we're not using any cached data
    defaultOptions: isDevelopment ? {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
        query: {
            fetchPolicy: 'network-only',
        },
    } : undefined,
});

export default graphqlClient;