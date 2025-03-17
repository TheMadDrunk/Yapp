import type { Route } from "./+types/articles";
import { Calendar, ArrowRight } from "lucide-react";
import { Button, Timeline } from "~/components/ui";
import { Link } from "react-router"
import { linkToArticles } from "~/utils/navigation";
import { GET_COLLECTION_ARTICLES } from "~/graphql/queries";
import graphqlClient from "~/graphql/client";
import type { Article } from "~/graphql/types";
import { ErrorDisplay } from "~/components";

export async function loader() {
    try {
        const { data } = await graphqlClient.query<{ articles: [Article] }>({
            query: GET_COLLECTION_ARTICLES,
        });

        if (data.articles[0] === null) {
            return {
                articles: [],
                error: null
            };
        }

        return {
            articles: data.articles,
            error: null
        };
    } catch (error) {
        console.error("Error fetching articles:", error);
        return {
            articles: [],
            error: error instanceof Error ? error.message : "An unknown error occurred"
        };
    }
}

export default function Articles({ loaderData }: Route.ComponentProps) {
    const { articles, error } = loaderData;

    // If there's an error, display the error component
    if (error) {
        return <ErrorDisplay message={error} title="Error Loading Articles" />;
    }

    if (articles.length === 0) {
        return <div className="w-fit mx-auto px-4 py-8">
            <Timeline>
                <Timeline.Item>
                    <Timeline.Content className="text-primary container max-w-2xl ml-4 font-bold">No articles found, come back later!</Timeline.Content>
                </Timeline.Item>
            </Timeline>
        </div>;
    }
    // Group articles by month
    const groupedArticles = articles.reduce((acc, article) => {
        const date = new Date(article.updatedAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        if (!acc[monthKey]) {
            acc[monthKey] = {
                monthName,
                articles: []
            };
        }

        acc[monthKey].articles.push(article);
        return acc;
    }, {} as Record<string, { monthName: string, articles: Article[] }>);

    // Sort months in descending order
    const sortedMonths = Object.entries(groupedArticles).sort((a, b) => b[0].localeCompare(a[0]));
    return (
        <div className="w-fit mx-auto px-4 py-8">
            <Timeline>
                {sortedMonths.map(([monthKey, { monthName, articles }]) => (
                    <Timeline.Item key={monthKey}>
                        <Timeline.Point icon={Calendar} className="bg-accent" />
                        <Timeline.Content className="text-primary container max-w-2xl ml-4">
                            <Timeline.Time className="text-accent font-bold text-lg">{monthName}</Timeline.Time>
                            <div className="space-y-4">
                                {articles.map((article) => (
                                    <div key={article.slug} className="p-1 hover:border-accent border-1 hover:border-solid border-dashed border-transparent transition-all duration-400">
                                        <Timeline.Title className="text-primary">{article.title}</Timeline.Title>
                                        <Timeline.Time className="text-accent text-sm">{new Date(article.updatedAt).toLocaleDateString()}</Timeline.Time>
                                        <Timeline.Body className="text-primary">
                                            <p className="text-sm pb-2">{article.description}</p>
                                            <div className="flex gap-1">
                                                {article.tags.map(({ tag }) => (
                                                    <span
                                                        key={tag}
                                                        className="text-secondary text-sm font-bold"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex justify-end">
                                                <Button variant="link">
                                                    <Link className="flex items-center" to={linkToArticles(article.slug)}>Read More <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </Timeline.Body>
                                    </div>
                                ))}
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
}
