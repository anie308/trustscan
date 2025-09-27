import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <span className="text-sm font-bold">T</span>
            </div>
            <span className="text-xl font-bold">TrustScan</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Process
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Use Case
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Product Demo
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link href="/scan">
            <Button>Verify Now</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
