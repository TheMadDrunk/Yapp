import type { Route } from "./+types/articlePage";

export async function loader({ params }: Route.LoaderArgs) {
    return {
        slug: params.slug,
    };
}
export default function ArticlePage({ loaderData }: Route.ComponentProps) {
    const { slug } = loaderData;
    return <div>ArticlePage {slug}</div>;
}
