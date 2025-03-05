import { paths } from "../routes/path";

export function linkToHome() {
    return paths.home;
}

export function linkToProjects() {
    return paths.projects;
}

export function linkToArticles(slug?: string) {
    return slug ? paths.article.replace(":slug", slug) : paths.articles;
}
