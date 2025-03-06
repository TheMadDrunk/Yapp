import type { Route } from "./+types/articles";
import { Calendar, ArrowRight } from "lucide-react";
import { Button, Timeline } from "~/components/ui";
import { Link } from "react-router"
import { linkToArticles } from "~/utils/navigation";
interface Article {
    id: number;
    title: string;
    content: string;
    slug: string;
    lastUpdated: string;
    tags: string[];
}

export async function loader() {
    return {
        articles: [
            { id: 1, slug: "blockchain-for-the-masses", title: "Blockchain for the masses", content: "Blockchain is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world.", lastUpdated: "2021-01-01", tags: ["tag1", "tag2"] },
            { id: 2, slug: "bitope", title: "Bitope", content: "Bitope is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world.", lastUpdated: "2025-02-02", tags: ["tag3", "tag4"] },
            { id: 3, slug: "article-3", title: "Article 3", content: "Bitope is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world.", lastUpdated: "2025-02-02", tags: ["tag3", "tag4"] },
            { id: 4, slug: "arti", title: "Article 4", content: "Bitope is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world.", lastUpdated: "2025-02-02", tags: ["tag3", "tag4"] },
        ],
    };
}

export default function Articles({ loaderData }: Route.ComponentProps) {
    const { articles } = loaderData;

    // Group articles by month
    const groupedArticles = articles.reduce((acc, article) => {
        const date = new Date(article.lastUpdated);
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
                                    <div key={article.id} className="p-1 hover:border-accent border-1 hover:border-solid border-dashed border-transparent transition-all duration-400">
                                        <Timeline.Title className="text-primary">{article.title}</Timeline.Title>
                                        <Timeline.Time className="text-accent text-sm">{new Date(article.lastUpdated).toLocaleDateString()}</Timeline.Time>
                                        <Timeline.Body className="text-primary">
                                            <p className="text-sm pb-2">{article.content}</p>
                                            <div className="flex gap-y-1">
                                                {article.tags.map((tag) => (
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
