import type { Route } from "./+types/articlePage";
import { GET_SINGLE_ARTICLE } from "~/graphql/queries";
import type { Article } from "~/graphql/types";
import graphqlClient from "~/graphql/client";
import { format } from "date-fns";
import env from "~/config/env";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";
import { useLoaderData } from "react-router";
import { ErrorDisplay } from "~/components";
// Skeleton component for loading state
function ArticleSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
            {/* Skeleton Header */}
            <header className="mb-8">
                <div className="h-12 bg-secondary/30 rounded-md w-3/4 mb-4"></div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-5 bg-secondary/30 rounded-md w-32"></div>
                    <div className="flex gap-2">
                        <div className="h-5 bg-secondary/30 rounded-md w-16"></div>
                        <div className="h-5 bg-secondary/30 rounded-md w-16"></div>
                    </div>
                </div>
                <div className="aspect-video w-full mb-8 bg-secondary/30 rounded-md"></div>
                <div className="h-6 bg-secondary/30 rounded-md w-full"></div>
            </header>

            {/* Skeleton Article Content */}
            <div className="space-y-4">
                <div className="h-5 bg-secondary/30 rounded-md w-full"></div>
                <div className="h-5 bg-secondary/30 rounded-md w-11/12"></div>
                <div className="h-5 bg-secondary/30 rounded-md w-4/5"></div>
                <div className="h-5 bg-secondary/30 rounded-md w-full"></div>
                <div className="h-5 bg-secondary/30 rounded-md w-3/4"></div>

                <div className="h-32 bg-secondary/20 rounded-md w-full my-8"></div>

                <div className="h-5 bg-secondary/30 rounded-md w-full"></div>
                <div className="h-5 bg-secondary/30 rounded-md w-5/6"></div>
                <div className="h-5 bg-secondary/30 rounded-md w-full"></div>
            </div>
        </div>
    );
}

export async function loader({ params }: Route.LoaderArgs) {
    const { data, loading, error } = await graphqlClient.query<{ articles: [Article] }>({
        query: GET_SINGLE_ARTICLE,
        variables: { slug: params.slug },
    });

    return {
        article: data.articles[0],
        loading,
        error,
    };
}

export default function ArticlePage({ loaderData }: Route.ComponentProps) {
    const { article, loading, error } = loaderData;

    if (loading) {
        return <ArticleSkeleton />;
    }

    if (error) {
        return <ErrorDisplay message={error.message} title="Error Loading Article" />;
    }

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
                            <span
                                key={tag}
                                className="text-secondary text-sm font-bold"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
                {article.cover?.url && (
                    <div className="aspect-video w-full mb-8 overflow-hidden">
                        <img
                            src={env.STRAPI_URL + article.cover.url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <p className="text-lg text-primary/80 font-medium">
                    {article.description}
                </p>
            </header>
            <article className="prose prose-orange prose-zinc prose-headings:text-primary prose-pre:p-0 prose-headings:font-mono prose-lg max-w-none ">
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code(props) {
                            const { className, children, ...rest } = props;
                            const match = /language-(\w+)/.exec(className || "");

                            return match ? (
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...rest}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {article.content}
                </Markdown>
            </article>
        </div>
    );
}