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
export interface Profile {
    description: string;
    title: string;
    subTitle: string;
    skills: {
        name: string;
        id: string;
        icon: {
            url: string;
        };
    }[];
    favoriteQuote: {
        name: string;
        body: string;
    };
    name: string;
    profilePicture: {
        url: string;
    };
    socialLinks: ISocialLink[];
}

export interface ISocialLink {
    name: string;
    link: string;
    icon: {
        url: string;
    };
}

export interface ProfileInfo {
    profile: Profile;
}

