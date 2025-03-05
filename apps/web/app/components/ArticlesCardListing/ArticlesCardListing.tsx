import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui";
import { ArticleCard, type ArticleCardProps } from "~/components";

interface ArticlesCardListingProps {
  articles: ArticleCardProps[];
}

export function ArticlesCardListing({ articles }: ArticlesCardListingProps) {
  return (
    <div className="py-1 w-full mt-4">
      <Carousel opts={{ loop: true }} className="max-w-5xl mx-auto">
        <CarouselContent className="w-full text-center">
          {articles.map((article, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <div className="w-fit mx-auto p-2">
                <ArticleCard
                  title={article.title}
                  description={article.description}
                  slug={article.slug}
                  imageUrl={article.imageUrl}
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
