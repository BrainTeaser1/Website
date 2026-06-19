import { Hero } from "@/components/hero/hero";
import { Mission } from "@/components/sections/mission";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ArchitecturePreview } from "@/components/sections/architecture-preview";
import { Ecosystem } from "@/components/sections/ecosystem";
import { About } from "@/components/sections/about";
import { WritingPreview } from "@/components/sections/writing-preview";
import { CertificationsStrip } from "@/components/sections/certifications-strip";
import { Experience } from "@/components/sections/experience";
import { ContactCTA } from "@/components/sections/contact-cta";
import { GlowBridge } from "@/components/effects/glow-bridge";

export default function Home() {
  return (
    <>
      <Hero />
      <GlowBridge />
      <Mission />
      <GlowBridge />
      <FeaturedWork />
      <ArchitecturePreview />
      <Ecosystem />
      <GlowBridge />
      <About />
      <WritingPreview />
      <CertificationsStrip />
      <Experience />
      <GlowBridge />
      <ContactCTA />
    </>
  );
}
