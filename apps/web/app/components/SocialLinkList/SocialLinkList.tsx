import { SocialLink } from "~/components/SocialLink";
import type { SocialLinkProps } from "~/components/SocialLink";

interface SocialLinkListProps {
  links: SocialLinkProps[];
}

export function SocialLinkList({ links }: SocialLinkListProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center my-3 sm:gap-6 lg:gap-8">
      {links.map((link) => (
        <SocialLink
          key={link.name}
          icon={link.icon}
          name={link.name}
          href={link.href}
        />
      ))}
    </div>
  );
}
