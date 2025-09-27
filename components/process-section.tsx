import { Card, CardContent } from "@/components/ui/card"

const ScanIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 12h-4.01M12 12v4m6-4h.01M12 12V8"
    />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const GiftIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

export function ProcessSection() {
  const steps = [
    {
      icon: ScanIcon,
      title: "Scan the Product Instantly",
      description: "Use your phone to scan the TrustScan QR code and confirm authenticity in seconds",
    },
    {
      icon: ShieldIcon,
      title: "Verify on Blockchain",
      description: "Each scan is validated on a tamper-proof blockchain, ensuring the product is genuine",
    },
    {
      icon: GiftIcon,
      title: "Earn Stablecoin Rewards",
      description: "Consumers get rewarded in stablecoins for verifying products and staying safe",
    },
    {
      icon: TrendingUpIcon,
      title: "Build Trust Across the Chain",
      description: "Manufacturers, retailers, and buyers all benefit from transparent, fraud-free trade",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
            4 Step Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Path to Product Verification</h2>
          <p className="text-muted-foreground">Making trust as easy as point, scan, and confirm</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="bg-primary text-primary-foreground border-0">
              <CardContent className="p-6">
                <div className="mb-4">
                  <step.icon />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm opacity-90">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
