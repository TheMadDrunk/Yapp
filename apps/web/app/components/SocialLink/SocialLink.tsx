import React from "react";
import type { ISocialLink } from "~/graphql/types";
import { SvgIcon } from "~/components/ui";

export function SocialLink({ icon, name, link }: ISocialLink) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-primary group hover:text-accent hover:border-accent transition-colors duration-300 border border-primary p-1"
      aria-label={name}
    >
      <SvgIcon
        url={icon.url}
        size={24}
        color="currentColor"
        className="text-primary group-hover:text-accent transition-colors duration-300"
      />
      <span className="text-sm font-medium">{name}</span>
    </a>
  );
}
