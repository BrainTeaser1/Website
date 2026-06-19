import type { Metadata } from "next";
import { PageHeader } from "@/components/primitives/page-header";
import { About } from "@/components/sections/about";
import { Ecosystem } from "@/components/sections/ecosystem";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "About",
  description: "About Krishna Shukla, an AI and cloud engineer: how I work, the stack I use, and where I'm headed.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="// ABOUT"
        title="About"
        description="How I work, what I work with, and where I'm headed."
      />
      <About />
      <Ecosystem />
      <Experience />
    </>
  );
}
