"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ScanPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page - scan page is blocked
    router.push("/")
  }, [router])

  return null
}
