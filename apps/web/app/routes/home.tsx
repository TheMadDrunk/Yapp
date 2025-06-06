import type { Route } from "./+types/home";
import { SocialLinkList } from "~/components/SocialLinkList";
import { ArticlesCardListing, type ArticleCardProps, ErrorDisplay, WorkExperienceListing, Quote, AboutMe } from "~/components";
import { GET_COLLECTION_ARTICLES, PROFILE_INFO } from "../graphql/queries";
import type { CollectionArticles, ProfileInfo } from "../graphql/types";
import graphqlClient from "~/graphql/client";

export async function loader() {
  try {
    const { data: profileInfo, errors, error } = await graphqlClient.query<ProfileInfo>({
      query: PROFILE_INFO
    });

    if (!profileInfo || !profileInfo.profile || errors) {
      throw new Error(`Failed to fetch profile information`);
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
    const quote = profileInfo.profile.favoriteQuote;

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
      quote,
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
  const { socialLinks, articles, skills, title, subTitle, description, profilePicture, name, workExperiences, error, quote } = loaderData;
  if (error) {
    return <ErrorDisplay message={error} title="Error Loading Portfolio" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-2 sm:py-16">
        <div className="py-5 w-fit md:w-[70%] lg:w-[650px] mx-auto font-semibold ">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            {title.split(" ")[0]}
          </h1>
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-primary ml-16  sm:ml-30 md:text-right">
            {title.split(" ")[1]}
          </h1>
        </div>
        <h2 className="sm:text-sm md:text-md lg:text-xl text-primary max-w-2xl mt-6 text-center mx-auto w-[80%]">
          {subTitle}
        </h2>
      </div>

      <SocialLinkList links={socialLinks} />
      <ArticlesCardListing articles={articles} />
      <div className="border-t border-primary my-12"></div>
      <AboutMe
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
      <div className="border-t border-primary my-12"></div>

      <WorkExperienceListing experiences={workExperiences} />
      <div className="border-t border-primary my-12"></div>

      <div className="flex flex-col items-center justify-center">
        <Quote quote={quote?.body!} author={quote?.name!} />
      </div>
    </div>
  );
}
