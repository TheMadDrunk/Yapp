import { type LucideIcon } from "lucide-react";

interface SocialLinkProps {
  icon: LucideIcon;
  name: string;
  href: string;
}

export function SocialLink({ icon: Icon, name, href }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-primary hover:text-accent hover:border-accent transition-colors duration-300 border border-primary p-1"
      aria-label={name}
    >
      <Icon className="w-6 h-6" />
      <span className="text-sm font-medium">{name}</span>
    </a>
  );
}
