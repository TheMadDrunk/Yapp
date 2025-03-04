import type { Route } from "./+types/home";
import { AppNavBar } from "../components";
import { SocialLink } from "../components/SocialLink";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/Carousel";
import { BlogCard } from "~/components/BlogCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Software Engineer" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <div>
        <div className="py-5 w-fit mx-auto font-semibold">
          <h1 className="text-5xl text-primary">Software </h1>
          <h1 className="text-5xl text-primary ml-30">Engineer</h1>
        </div>
        <h2 className="text-md text-primary w-2/3 mx-2 text-justify">
          I'm a software engineer with a passion for building products that help
          people live better lives.
        </h2>
      </div>

      {/* Social media links */}

      <div className="flex flex-row justify-end w-full px-2">
        <Button variant="secondary">Projects</Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center my-8">
        <SocialLink
          icon={Github}
          name="GitHub"
          href="https://github.com/YOUR_USERNAME"
        />
        <SocialLink
          icon={Linkedin}
          name="LinkedIn"
          href="https://linkedin.com/in/YOUR_USERNAME"
        />
        <SocialLink
          icon={MessageCircle}
          name="WhatsApp"
          href="https://wa.me/YOUR_PHONE_NUMBER"
        />
        <SocialLink
          icon={Instagram}
          name="Instagram"
          href="https://instagram.com/YOUR_USERNAME"
        />
      </div>
      <div className="py-1 w-full">
        <Carousel opts={{ loop: false }}>
          <CarouselContent className="w-full text-center">
            <CarouselItem className="mx-auto w-fit">
              <div className="w-fit mx-auto">
                <BlogCard
                  title="The simplest example is kafka + golang"
                  description="This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker."
                  href="/blog/kafka-golang"
                  imageUrl="https://picsum.photos/300/300"
                />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="w-fit mx-auto">
                <BlogCard
                  title="The simplest example is kafka + golang"
                  description="This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker."
                  href="/blog/kafka-golang"
                  imageUrl="https://picsum.photos/300/300"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="relative flex items-center justify-center mt-5 gap-5 mx-auto">
            <CarouselPrevious className="relative inset-0" />
            <CarouselNext className="relative inset-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
