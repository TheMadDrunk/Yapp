import type { Route } from "./+types/home";
import { Button } from "../components/ui/Button";
import { SocialLinkList } from "~/components/SocialLinkList";
import { ArticlesCardListing, type ArticleCardProps } from "~/components";
import { GET_COLLECTION_ARTICLES, PROFILE_INFO } from "../graphql/queries";
import type { CollectionArticles, ProfileInfo } from "../graphql/types";
import graphqlClient from "~/graphql/client";
import { SvgIcon } from "~/components/ui";
import env from "~/config/env";

export async function loader() {

  const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;

  const { data: profileInfo } = await graphqlClient.query<ProfileInfo>({
    query: PROFILE_INFO,
  });

  const socialLinks = profileInfo.profile.socialLinks;

  const { data: collectionArticles } = await graphqlClient.query<CollectionArticles>({
    query: GET_COLLECTION_ARTICLES,
  });
  const articles = collectionArticles?.articles;
  const skills = profileInfo.profile.skills;
  const title = profileInfo.profile.title;
  const subTitle = profileInfo.profile.subTitle;
  const description = profileInfo.profile.description;
  const profilePicture = profileInfo.profile.profilePicture;
  console.log("[profilePicture]", profilePicture);
  const name = profileInfo.profile.name;

  return { socialLinks, articles, skills, title, subTitle, description, profilePicture, name };
}

export function meta({ data }: Route.MetaArgs) {
  const { name } = data;
  return [
    { title: `${name} | Portfolio` },
    { name: "description", content: `Welcome to ${name}'s portfolio - Full Stack Developer` },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { socialLinks, articles, skills, title, subTitle, description, profilePicture, name } = loaderData;
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
        <Button variant="outline">Projects</Button>
      </div>

      <SocialLinkList links={socialLinks} />
      <ArticlesCardListing articles={articles} />

      <div className="mt-10 grid grid-cols-7 grid-rows-6 ">
        <h2 className="text-lg text-primary font-semibold col-span-1">./About me</h2>
        <p className="text-primary max-w-xl text-justify col-span-3 col-start-5 italic">
          &quot;{description}&quot;
        </p>
        <div className="col-span-3 col-start-5 row-start-2 row-span-5 flex justify-center items-center sepia-100 bg-cover bg-center" style={{ backgroundImage: `url(${env.STRAPI_URL + profilePicture.url})` }}>
        </div>
        <div className="w-[11rem] h-30 p-1">
          <div className="w-full h-full bg-primary text-background"> My Skills</div>
        </div>
        {skills.map((skill) => (
          <div className="w-[11rem] h-30 p-1" key={skill.name}>
            <div className="w-full h-full flex justify-center items-center bg-clip-text hover:bg-primary hover:text-background transition-all duration-300 text-transparent" >
              <SvgIcon url={skill.icon.url} size={24} className="text-primary" />
              {skill.name}
            </div>
          </div>
        ))}
        <div className="w-[11rem] h-30 p-1">
          <div className="w-full h-full bg-primary text-background"> And More...</div>
        </div>

      </div>
    </div>
  );
}
