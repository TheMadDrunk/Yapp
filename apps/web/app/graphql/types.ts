export interface Article {
    title: string;
    slug: string;
    cover: {
        url: string;
    };
    description: string;
    updatedAt: string;
    content: string;
    tags: {
        tag: string;
    }[];
}

export interface ArticleSummary {
    title: string;
    slug: string;
    cover: {
        url: string;
    };
    description: string;
    tags: {
        tag: string;
    }[];
    updatedAt: string;
}

export interface CollectionArticles {
    articles: ArticleSummary[];
}
