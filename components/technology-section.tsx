import { Card, CardContent } from "@/components/ui/card"

const BlocksIcon = () => (
  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  </svg>
)

const SmartphoneIcon = () => (
  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
    />
  </svg>
)

const CoinsIcon = () => (
  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const BarChartIcon = () => (
  <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

export function TechnologySection() {
  const features = [
    {
      icon: BlocksIcon,
      title: "Blockchain-Powered Authenticity",
      description:
        "Every product verification is stored immutably on the blockchain, making counterfeiting nearly impossible. Customers can trust that the data can't be altered or hidden.",
    },
    {
      icon: SmartphoneIcon,
      title: "Smart QR Technology",
      description:
        "Our advanced QR codes are linked to its digital identity. A quick scan with any smartphone reveals the product's full journey from manufacturer to shelf.",
    },
    {
      icon: CoinsIcon,
      title: "Consumer Rewards in Stablecoins",
      description:
        "Shoppers who verify products earn stablecoin rewards, encouraging participation and building loyalty while contributing to a safer marketplace.",
    },
    {
      icon: BarChartIcon,
      title: "Real-Time Analytics for Businesses",
      description:
        "Manufacturers and regulators gain insights into consumer scans, regional demand, and potential counterfeiting hotspots, enabling smarter decisions.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-4">
            New Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Technology Driving <span className="text-primary">Authenticity</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge tech ensuring your products are always the real deal
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="relative">
            <img
              src="/person-scanning-qr-code-with-smartphone-in-modern-.jpg"
              alt="Person scanning QR code with smartphone"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
