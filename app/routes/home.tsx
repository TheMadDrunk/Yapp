import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { SocialLinkList } from "~/components/SocialLinkList";
import { BlogCardList, type BlogPost } from "~/components/BlogCardList";
import { useLoaderData } from "react-router";
import type { SocialLinkProps } from "~/components/SocialLink/SocialLink";

export async function loader() {
  const socialLinks: SocialLinkProps[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
      name: "GitHub",
      href: "https://github.com/YOUR_USERNAME",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
      name: "LinkedIn",
      href: "https://linkedin.com/in/YOUR_USERNAME",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
      name: "WhatsApp",
      href: "https://wa.me/YOUR_PHONE_NUMBER",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
      name: "Instagram",
      href: "https://instagram.com/YOUR_USERNAME",
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
      name: "Email",
      href: "mailto:YOUR_EMAIL",
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      title: "The simplest example is kafka + golang",
      description:
        "This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.",
      href: "/blog/kafka-golang",
      imageUrl: "https://picsum.photos/300/300",
    },
    {
      title: "The simplest example is kafka + golang",
      description:
        "This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.",
      href: "/blog/kafka-golang",
      imageUrl: "https://picsum.photos/300/300",
    },
    {
      title: "The simplest example is kafka + golang",
      description:
        "This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.",
      href: "/blog/kafka-golang",
      imageUrl: "https://picsum.photos/300/300",
    },
    {
      title: "The simplest example is kafka + golang",
      description:
        "This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.",
      href: "/blog/kafka-golang",
      imageUrl: "https://picsum.photos/300/300",
    },
    {
      title: "The simplest example is kafka + golang",
      description:
        "This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker.",
      href: "/blog/kafka-golang",
      imageUrl: "https://picsum.photos/300/300",
    },
  ];

  return { socialLinks, blogPosts };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Software Engineer" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { socialLinks, blogPosts } = useLoaderData<typeof loader>();
  console.log("[socialLinks]", socialLinks);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-2 sm:py-16">
        <div className="py-5 w-fit md:w-[650px] mx-auto font-semibold ">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-primary">
            Software{" "}
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-primary ml-30 md:text-right">
            Engineer
          </h1>
        </div>
        <h2 className="sm:text-sm md:text-md lg:text-xl text-primary max-w-2xl mt-6 md:text-center sm:mx-auto text-left w-[80%]">
          I'm a software engineer with a passion for building products that help
          people live better lives.
        </h2>
      </div>

      <div className="flex flex-row justify-end w-full">
        <Button variant="outline">Projects</Button>
      </div>

      <SocialLinkList links={socialLinks} />
      <BlogCardList posts={blogPosts} />
    </div>
  );
}
