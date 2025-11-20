"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckCircle2, Shield, Zap, TrendingUp, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { supabase, type WaitlistEntry } from "@/lib/supabase"

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    userType: "",
    agreeToTerms: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    if (!formData.userType) {
      toast.error("Please select your role")
      return
    }

    setIsSubmitting(true)

    try {
      const emailToCheck = formData.email.trim().toLowerCase()

      // Check if email already exists
      const { data: existingEntry, error: checkError } = await supabase
        .from('waitlist')
        .select('email')
        .eq('email', emailToCheck)
        .maybeSingle()

      if (checkError) {
        console.error("Error checking email:", checkError)
        toast.error("Failed to verify email. Please try again.")
        return
      }

      console.log(existingEntry, "exisits?")

      if (existingEntry) {
        toast.error("This email is already on the waitlist!")
        return
      }

      // Prepare data for Supabase
      const waitlistData: WaitlistEntry = {
        name: formData.name.trim(),
        email: emailToCheck,
        company: formData.company.trim() || null,
        user_type: formData.userType as WaitlistEntry['user_type'],
        agreed_to_terms: formData.agreeToTerms,
      }

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert([waitlistData])
        .select()

      if (insertError) {
        console.error("Supabase error:", insertError)
        toast.error("Failed to join waitlist. Please try again.")
        return
      }

      setIsSubmitted(true)
      toast.success("Successfully joined the waitlist!")
    } catch (error) {
      console.error("Unexpected error:", error)
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">You're on the List!</CardTitle>
              <CardDescription className="text-base">
                Thank you for joining the TrustScan waitlist. We'll notify you when we launch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <p className="text-sm text-muted-foreground mb-6">
                We've sent a confirmation email to <span className="font-medium text-foreground">{formData.email}</span>
              </p> */}
              <Button onClick={() => window.location.href = "/"} className="w-full">
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-12">
        <div className="container max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Limited Early Access</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join the <span className="text-primary">Waitlist</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Be among the first to experience blockchain-powered product verification.
              Early members get exclusive benefits and priority access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle>Reserve Your Spot</CardTitle>
                <CardDescription>
                  Fill out the form below to join our exclusive waitlist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userType">I am a *</Label>
                    <Select
                      required
                      value={formData.userType}
                      onValueChange={(value) => handleChange("userType", value)}
                    >
                      <SelectTrigger id="userType">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consumer">Consumer</SelectItem>
                        <SelectItem value="manufacturer">Manufacturer</SelectItem>
                        <SelectItem value="retailer">Retailer</SelectItem>
                        <SelectItem value="regulator">Regulator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleChange("agreeToTerms", checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to receive updates about TrustScan and understand that I can
                      unsubscribe at any time *
                    </label>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Early Access Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Priority Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Be the first to access TrustScan when we launch
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Exclusive Features</h3>
                      <p className="text-sm text-muted-foreground">
                        Get access to premium features at no extra cost
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Special Rewards</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn bonus stablecoin rewards as an early adopter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary mb-2">500+</p>
                    <p className="text-sm text-muted-foreground">
                      People have already joined the waitlist
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
