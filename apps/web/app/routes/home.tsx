import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { SocialLinkList } from "~/components/SocialLinkList";
import { ArticlesCardListing, type ArticleCardProps, ErrorDisplay, SkillsListing, WorkExperienceListing } from "~/components";
import { GET_COLLECTION_ARTICLES, PROFILE_INFO } from "../graphql/queries";
import type { CollectionArticles, ProfileInfo } from "../graphql/types";
import graphqlClient from "~/graphql/client";
import env from "~/config/env";
import { Link } from "react-router";
import { pages } from "~/routes/path";

export async function loader() {
  try {
    const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

    const { data: profileInfo } = await graphqlClient.query<ProfileInfo>({
      query: PROFILE_INFO,
    });

    if (!profileInfo || !profileInfo.profile) {
      throw new Error("Failed to fetch profile information");
    }

    const socialLinks = profileInfo.profile.socialLinks;

    const { data: collectionArticles } = await graphqlClient.query<CollectionArticles>({
      query: GET_COLLECTION_ARTICLES,
    });

    const articles = collectionArticles?.articles || [];
    const skills = profileInfo.profile.skills;
    const title = profileInfo.profile.title;
    const subTitle = profileInfo.profile.subTitle;
    const description = profileInfo.profile.description;
    const profilePicture = profileInfo.profile.profilePicture;
    const name = profileInfo.profile.name;

    // Use mock data if no work experiences are available from CMS
    const workExperiences = profileInfo.profile.workExperiences || [];

    return {
      socialLinks,
      articles,
      skills,
      title,
      subTitle,
      description,
      profilePicture,
      name,
      workExperiences,
      error: null
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return {
      error: error instanceof Error ? error.message : "An unknown error occurred",
      socialLinks: [],
      articles: [],
      skills: [],
      title: "Portfolio",
      subTitle: "",
      description: "",
      profilePicture: null,
      name: "Developer",
      workExperiences: []
    };
  }
}

export function meta({ data }: Route.MetaArgs) {
  const { name } = data;
  return [
    { title: `${name} | Portfolio` },
    { name: "description", content: `Welcome to ${name}'s portfolio - Full Stack Developer` },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { socialLinks, articles, skills, title, subTitle, description, profilePicture, name, workExperiences, error } = loaderData;
  if (error) {
    return <ErrorDisplay message={error} title="Error Loading Portfolio" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-2 sm:py-16">
        <div className="py-5 w-fit md:w-[650px] mx-auto font-semibold ">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-primary">
            {title.split(" ")[0]}
          </h1>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-primary ml-30 md:text-right">
            {title.split(" ")[1]}
          </h1>
        </div>
        <h2 className="sm:text-sm md:text-md lg:text-xl text-primary max-w-2xl mt-6 md:text-center sm:mx-auto text-left w-[80%]">
          {subTitle}
        </h2>
      </div>

      <div className="flex flex-row justify-end w-full">
        <Button variant="outline">
          <Link to={pages.Projects}>Projects</Link>
        </Button>
      </div>

      <SocialLinkList links={socialLinks} />
      <ArticlesCardListing articles={articles} />

      <SkillsListing
        skills={skills}
        description={description}
        profilePicture={profilePicture}
        animationConfig={{
          THRESHOLD_DISTANCE: 200,
          OPACITY_CURVE_POWER: 0.2,
          GRADIENT_COLORS: {
            PRIMARY_STOP: 20,
            SECONDARY_STOP: 40,
            ACCENT_STOP: 60,
            TRANSPARENT_STOP: 85
          }
        }}
      />

      <WorkExperienceListing experiences={workExperiences} />
    </div>
  );
}
