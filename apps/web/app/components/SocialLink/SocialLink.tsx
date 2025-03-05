import type { LucideProps } from "lucide-react";
import React from "react";

export interface SocialLinkProps {
  icon: string;
  name: string;
  href: string;
}

export function SocialLink({ icon, name, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-primary hover:text-accent hover:border-accent transition-colors duration-300 border border-primary p-1"
      aria-label={name}
    >
      <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: icon }} />
      <span className="text-sm font-medium">{name}</span>
    </a>
  );
}
