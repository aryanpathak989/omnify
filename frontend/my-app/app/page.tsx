"use client"

import { EventList } from "@/components/event-list"

export default function Page() {
  return (
    <section className="grid gap-6">
      <header>
        <h1 className="text-pretty text-xl font-semibold">Upcoming events</h1>
        <p className="text-sm text-muted-foreground">Browse and register.</p>
      </header>
      <EventList />
    </section>
  )
}
