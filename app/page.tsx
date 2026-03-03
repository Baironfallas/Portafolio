import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { EducationSection } from "@/components/education-section";
import { LanguagesSection } from "@/components/languages-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { FooterSection } from "@/components/footer-section";
import { PortfolioShell } from "@/components/portfolio-shell";

export default function Home() {
  return (
    <PortfolioShell>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <LanguagesSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <FooterSection />
    </PortfolioShell>
  );
}
