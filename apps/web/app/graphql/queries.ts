import { gql } from "@apollo/client/core";

export const GET_COLLECTION_ARTICLES = gql`
    query GetArticles {
        articles {
            title
            slug
            cover {
                url
            }
            description
            tags {
                tag
            }
            updatedAt
        }
    }
`;

export const GET_SINGLE_ARTICLE = gql`
    query GetArticle($slug: String!) {
    articles(filters: {
        slug: {eq: $slug}
    }) {
        title
        slug
            cover {
            url
        }
        description
        updatedAt
        content
            tags {
            tag
        }
    }
}
`;