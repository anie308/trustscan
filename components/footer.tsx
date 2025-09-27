import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                <span className="text-sm font-bold">T</span>
              </div>
              <span className="text-xl font-bold">TrustScan</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Demo
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-3">Join our Newsletter</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter Your Email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">2057 TrustScan. All rights reserved</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
