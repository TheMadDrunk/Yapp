import type { Route } from "./+types/projects";
import { ProjectsListing, ErrorDisplay } from "~/components";
import { GET_PROJECTS } from "~/graphql/queries";
import graphqlClient from "~/graphql/client";
import type { ProjectsData, Project } from "~/graphql/types";

export async function loader() {
    try {
        // Fetch projects data from the GraphQL API
        const { data } = await graphqlClient.query<ProjectsData>({
            query: GET_PROJECTS,
        });

        // Transform the API response to match the ProjectsListing component props
        const projects = data.projects.map((project: Project) => ({
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            githubLink: project.githubLink,
            images: project.images
        }));

        return {
            projects,
            error: null
        };
    } catch (error) {
        console.error("Error fetching projects:", error);
        return {
            projects: [],
            error: error instanceof Error ? error.message : "An unknown error occurred"
        };
    }
}

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: "Projects | Portfolio" },
        { name: "description", content: "View my projects and see what I've been working on" },
    ];
}

export default function Projects({ loaderData }: Route.ComponentProps) {
    const { projects, error } = loaderData;

    // If there's an error, display the error component
    if (error) {
        return <ErrorDisplay message={error} title="Error Loading Projects" />;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-16">
                <h1 className="text-3xl font-mono font-medium text-primary mb-2">... /Projects ...</h1>
            </div>

            <ProjectsListing projects={projects} />
        </div>
    );
} 