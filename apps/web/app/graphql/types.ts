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
    workExperiences?: WorkExperience[];
}

export interface WorkExperience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
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

export interface Project {
    title: string;
    description: string;
    technologies: string;
    githubLink?: string;
    demoLink?: string;
    images: {
        url: string;
    }[];
}

export interface ProjectsData {
    projects: Project[];
}

export interface Global {
    siteName: string;
    siteDescription: string;
    favicon: {
        url: string;
    };
}
