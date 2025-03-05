import type { Route } from "../+types/root";
import { useLoaderData } from "react-router";
export async function loader({ params }: Route.LoaderArgs) {
    return {
        slug: params.slug,
    };
}
export default function ArticlePage() {
    const { slug } = useLoaderData<typeof loader>();
    return <div>ArticlePage {slug}</div>;
}
