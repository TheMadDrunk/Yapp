import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "~/components/ui";
import { ArticleCard } from "~/components";
import type { ArticleSummary } from "~/graphql/types";
interface ArticlesCardListingProps {
  articles: ArticleSummary[];
}

export function ArticlesCardListing({ articles }: ArticlesCardListingProps) {
  if (articles.length === 0) {
    return null;
  }
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
                  imageUrl={article.cover.url}
                  tags={article.tags.map((tag) => tag.tag)}
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
