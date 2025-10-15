"use client"
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Link from "next/link"
import { TimezoneProvider } from "@/components/timezone-provider"
import { TimezoneSelect } from "@/components/timezone-select"
import { Suspense } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <TimezoneProvider>
            <header className="border-b border-border">
              <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
                <nav className="flex items-center gap-4">
                  <Link href="/" className="text-sm font-medium hover:underline">
                    Events
                  </Link>
                  <Link href="/events/new" className="text-sm font-medium hover:underline">
                    Create
                  </Link>
                </nav>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Timezone</span>
                  <TimezoneSelect />
                </div>
              </div>
            </header>
            <main className="mx-auto max-w-3xl px-4 py-8">
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </main>
          </TimezoneProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
