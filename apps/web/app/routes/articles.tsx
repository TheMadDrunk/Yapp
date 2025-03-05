import { type Route } from "./+types/articles";
import { Timeline } from "../components/ui/Timeline";
import { Calendar } from "lucide-react";

interface Article {
    id: number;
    title: string;
    content: string;
    lastUpdated: string;
    tags: string[];
}

export async function loader() {
    return {
        articles: [
            { id: 1, title: "Blockchain for the masses", content: "Blockchain is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world.", lastUpdated: "2021-01-01", tags: ["tag1", "tag2"] },
            { id: 2, title: "Bitope", content: "Bitope is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world. It is a technology that is changing the world.", lastUpdated: "2021-01-02", tags: ["tag3", "tag4"] },
        ],
    };
}

export default function Articles({ loaderData }: Route.ComponentProps) {
    const { articles } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Articles</h1>
            <Timeline>
                {articles.map((article) => (
                    <Timeline.Item key={article.id}>
                        <Timeline.Point icon={Calendar} />
                        <Timeline.Content>
                            <Timeline.Time>{article.lastUpdated}</Timeline.Time>
                            <Timeline.Title className="text-primary">{article.title}</Timeline.Title>
                            <Timeline.Body className="text-primary">{article.content}</Timeline.Body>
                            <div className="flex gap-2">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className=" text-primary text-sm font-medium px-2.5 py-0.5 rounded-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    );
}
