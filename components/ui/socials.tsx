import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";

const items = [
  { label: "GitHub", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export function Socials() {
  return (
    <div className="flex items-center gap-3">
      <span className="mr-1 font-mono text-xs text-sub">FIND ME</span>
      {items.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          className="chip grid h-10 w-10 place-items-center rounded-lg text-sub transition hover:text-ink active:scale-95"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
