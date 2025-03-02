import type { Route } from "./+types/home";
import { AppNavBar } from "../components";
import { SocialLink } from "../components/SocialLink";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Carousel, CarouselItem } from "../components/ui/Carousel";
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
          <h1 className="text-6xl text-primary">Software </h1>
          <h1 className="text-6xl text-primary ml-30">Engineer</h1>
        </div>
        <h2 className="text-md text-primary w-2/3 mx-2 text-justify">
          I'm a software engineer with a passion for building products that help
          people live better lives.
        </h2>
      </div>

      {/* Social media links */}

      <div className="flex flex-row justify-end w-full px-2">
        <Button variant="ghost">Projects</Button>
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
      <div>
        <Carousel>
          <CarouselItem>
            <div className="w-full h-full bg-red-500">
              <h1>Project 1</h1>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="w-full h-full bg-red-500">
              <h1>Project 2</h1>
            </div>
          </CarouselItem>
        </Carousel>
      </div>
    </div>
  );
}
