export const site = {
  name: "Krishna Shukla",
  role: "AI & Cloud Engineer",
  tagline: "Building intelligent cloud systems: agentic AI, FinOps, and data platforms.",
  url: "https://kr1shna.xyz",
  email: "krishnashukla3002@gmail.com",
  description:
    "An engineering platform documenting the agentic AI systems, cloud architecture, and data platforms built by Krishna Shukla — AI & Cloud Engineer working across Azure, AWS, and Databricks.",
  socials: {
    github: "https://github.com/Brainteaser1",
    linkedin: "https://linkedin.com/in/krishnashukla3002",
    email: "mailto:krishnashukla3002@gmail.com",
  },
} as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "Architecture", href: "/architecture" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/now" },
] as const;

export const footerNav = [
  { label: "Credentials", href: "/certifications" },
  { label: "Changelog", href: "/changelog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
  { label: "RSS", href: "/rss.xml" },
] as const;
