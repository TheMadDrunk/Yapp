import type { Route } from "../+types/root";

export async function loader({ params }: Route.LoaderArgs) {
    return {
        slug: params.slug,
    };
}
export default function BlogPage({ loaderData }: Route.ComponentProps) {
    const { slug } = loaderData;
    return <div>BlogPage {slug}</div>;
}
