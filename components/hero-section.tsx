import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm mb-6">
            <span>Join the Fight Against Counterfeits Today</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Verify <span className="text-primary">Authenticity</span>,<br />
            Build Trust
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Our blockchain-powered platform ensures every product is traceable, authentic, and tamper-proof
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/waitlist">
              <Button size="lg">Join Waitlist</Button>
            </Link>
            <Button variant="outline" size="lg" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <img
            src="/person-scanning-product-with-smartphone-in-retail-.jpg"
            alt="Person scanning product with smartphone"
            className="w-full h-[450px] rounded-lg object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
