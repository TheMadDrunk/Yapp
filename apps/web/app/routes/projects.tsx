import type { Route } from "./+types/projects";
import { ProjectsListing, type Project, ErrorDisplay } from "~/components";

// Mock projects data with multiple images per project
const MOCK_PROJECTS: Project[] = [
    {
        title: "GOstat",
        description: "A cutting-edge microservice-based application designed to handle HTTP request authentication and statistics with finesse. This project comprises several key microservices, each contributing to its overall functionality and prowess.",
        technologies: ["Golang", "TypeScript", "Gin", "NextJS", "PostgreSQL", "Redis"],
        githubLink: "https://github.com/username/gostat",
        imageUrls: [
            "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ]
    },
    {
        title: "Weather Tracker",
        description: "A weather application that provides current weather data and forecasts for locations worldwide. Features include geolocation, search history, and responsive design for all devices.",
        technologies: ["React", "OpenWeather API", "CSS Modules", "LocalStorage"],
        githubLink: "https://github.com/username/weather-app",
        imageUrls: [
            "https://images.unsplash.com/photo-1526743655626-e3d757b13d61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ]
    },
    {
        title: "CodeSync",
        description: "A real-time code collaboration platform for remote developers. Features include syntax highlighting, live editing, video chat, and automatic version control integration.",
        technologies: ["Socket.io", "React", "Node.js", "MongoDB", "WebRTC"],
        githubLink: "https://github.com/username/codesync",
        imageUrls: [
            "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ]
    },
    {
        title: "DevPortal",
        description: "A comprehensive developer portal with API documentation, tutorials, and interactive examples. Helps developers quickly integrate with your services through clear guidance.",
        technologies: ["Next.js", "GraphQL", "Prisma", "Auth0", "Vercel"],
        githubLink: "https://github.com/username/devportal",
        imageUrls: [
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        ]
    }
];

export async function loader() {
    try {
        // In a real implementation, this would likely fetch data from an API or CMS
        // For now, we're using mock data
        return {
            projects: MOCK_PROJECTS,
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
            <div className="mb-16 border-b border-primary/10 pb-8">
                <h1 className="text-3xl font-mono font-medium text-primary mb-2">... /Projects ...</h1>
            </div>

            <ProjectsListing projects={projects} />
        </div>
    );
} 