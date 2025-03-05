import { BlogCard } from "./BlogCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/Carousel";

export type BlogPost = {
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
};

interface BlogCardListProps {
  posts: BlogPost[];
}

export function BlogCardList({ posts }: BlogCardListProps) {
  return (
    <div className="py-1 w-full mt-4">
      <Carousel opts={{ loop: true }} className="max-w-5xl mx-auto">
        <CarouselContent className="w-full text-center">
          {posts.map((post, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
                <BlogCard
                  title={post.title}
                  description={post.description}
                  slug={post.slug}
                  imageUrl={post.imageUrl}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="relative flex items-center justify-center mt-5 gap-5 mx-auto">
          <CarouselPrevious className="relative inset-0" />
          <CarouselNext className="relative inset-0" />
        </div>
      </Carousel>
    </div>
  );
}
