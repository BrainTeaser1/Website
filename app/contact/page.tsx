import type { Metadata } from "next";
import { Mail, Github, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/primitives/page-header";
import { Reveal } from "@/components/effects/reveal";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Krishna Shukla. Open to AI and cloud engineering roles.",
};

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "GitHub", value: "github.com/Brainteaser1", href: site.socials.github, Icon: Github },
  { label: "LinkedIn", value: "linkedin.com/in/krishnashukla3002", href: site.socials.linkedin, Icon: Linkedin },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="// CONTACT"
        title="Get in touch"
        description="I'm open to AI and cloud engineering roles, and to interesting systems work. Email is the fastest way to reach me."
      />
      <section className="container-page relative grid gap-10 pb-28 lg:grid-cols-2">
        <div className="space-y-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} index={i}>
              <a
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="card card-hover flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                  <c.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[11px] uppercase tracking-wider text-sub">{c.label}</div>
                  <div className="font-semibold break-words">{c.value}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="card relative overflow-hidden rounded-3xl p-8">
            <div className="glow absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/25" />
            <h2 className="relative text-xl font-bold">Follow the build</h2>
            <p className="relative mt-2 text-[15px] leading-relaxed text-sub">
              An occasional email when I ship something or publish a deep dive.
            </p>
            <div className="relative mt-6">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
