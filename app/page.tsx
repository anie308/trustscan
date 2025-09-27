import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProcessSection } from "@/components/process-section"
import { TechnologySection } from "@/components/technology-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <TechnologySection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
