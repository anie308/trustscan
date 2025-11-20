import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CtaSection() {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
          Secure Your Products.
          <br />
          Protect Your Brand
        </h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-balance">
          Join hundreds of brands building trust with blockchain verification
        </p>
        <Link href="/waitlist">
          <Button size="lg" variant="secondary">
            Join Waitlist
          </Button>
        </Link>
      </div>
    </section>
  )
}
