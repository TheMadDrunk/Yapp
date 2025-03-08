import type { Route } from "./+types/articlePage";
import { GET_SINGLE_ARTICLE } from "~/graphql/queries";
import type { Article } from "~/graphql/types";
import graphqlClient from "~/graphql/client";
import { format } from "date-fns";
import { url } from "~/utils/constants";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import dracula from "react-syntax-highlighter/dist/esm/styles/prism/darcula";

export async function loader({ params }: Route.LoaderArgs) {
    const { data } = await graphqlClient.query<{ articles: [Article] }>({
        query: GET_SINGLE_ARTICLE,
        variables: { slug: params.slug },
    });

    return {
        article: data.articles[0],
    };
}

export default function ArticlePage({ loaderData }: Route.ComponentProps) {
    const { article } = loaderData;
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
                    <div className="aspect-video w-full mb-8 overflow-hidden">
                        <img
                            src={url + article.cover.url}
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
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");

                            return !inline && match ? (
                                <SyntaxHighlighter
                                    style={dracula}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                    {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            ) : (
                                <code className={className} {...props}>
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