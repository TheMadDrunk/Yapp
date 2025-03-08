import type { Route } from "./+types/articlePage";
import { GET_SINGLE_ARTICLE } from "~/graphql/queries";
import type { Article } from "~/graphql/types";
import graphqlClient from "~/graphql/client";
import { format } from "date-fns";

export async function loader({ params }: Route.LoaderArgs) {
    const { data } = await graphqlClient.query<{ articles: [Article] }>({
        query: GET_SINGLE_ARTICLE,
        variables: { slug: params.slug },
    });

    console.log("[data]", data);

    return {
        article: data.articles[0],
    };
}

export default function ArticlePage({ loaderData }: Route.ComponentProps) {
    const { article } = loaderData;
    console.log("[article]", article);
    const formattedDate = format(new Date(article.updatedAt), 'MMMM d, yyyy');

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Article Header */}
            <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    {article.title}
                </h1>
                <div className="flex items-center gap-4 text-secondary mb-6">
                    <time dateTime={article.updatedAt}>{formattedDate}</time>
                    <div className="flex gap-2">
                        {article.tags.map(({ tag }) => (
                            <span key={tag} className="text-accent">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
                {article.cover?.url && (
                    <div className="aspect-video w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                        <img
                            src={article.cover.url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <p className="text-lg text-primary/80 font-medium">
                    {article.description}
                </p>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none">
                <div
                    className="text-primary prose-headings:text-primary prose-a:text-secondary hover:prose-a:text-accent prose-strong:text-primary prose-blockquote:text-primary/80 prose-blockquote:border-l-accent"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </article>
        </div>
    );
}
