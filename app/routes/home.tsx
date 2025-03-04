import type { Route } from "./+types/home";
import { AppNavBar } from "../components";
import { SocialLink } from "../components/SocialLink";
import { Github, Linkedin, Instagram, MessageCircle, Mail } from "lucide-react";
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

      <div className="flex flex-wrap gap-4 justify-center my-3 sm:gap-6 lg:gap-8">
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
        <SocialLink
          icon={Mail}
          name="Email"
          href="https://instagram.com/YOUR_USERNAME"
        />
      </div>

      <div className="py-1 w-full mt-4">
        <Carousel opts={{ loop: false }} className="max-w-5xl mx-auto">
          <CarouselContent className="w-full text-center">
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
                <BlogCard
                  title="The simplest example is kafka + golang"
                  description="This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker."
                  href="/blog/kafka-golang"
                  imageUrl="https://picsum.photos/300/300"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
                <BlogCard
                  title="The simplest example is kafka + golang"
                  description="This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker."
                  href="/blog/kafka-golang"
                  imageUrl="https://picsum.photos/300/300"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
                <BlogCard
                  title="The simplest example is kafka + golang"
                  description="This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker."
                  href="/blog/kafka-golang"
                  imageUrl="https://picsum.photos/300/300"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
                <BlogCard
                  title="The simplest example is kafka + golang"
                  description="This article presents a simple way to implement a micro-service architecture using Kafka, Golang and Docker."
                  href="/blog/kafka-golang"
                  imageUrl="https://picsum.photos/300/300"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
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
