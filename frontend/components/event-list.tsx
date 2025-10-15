"use client"

import { useQuery } from "@tanstack/react-query"
import type { Event } from "@/types"
import { EventCard } from "./event-card"

// API call with TanStack Query
async function fetchEvents(): Promise<Event[]> {
  const res = await fetch("http://localhost:4000/events", {
    headers: {
      "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "",
      "Content-Type": "application/json",
      "Cookie": "access_token=YOUR_ACCESS_TOKEN; refresh_token=YOUR_REFRESH_TOKEN",
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }
  return res.json()
}

export function EventList() {
  const { data, error, isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  })

  if (isLoading)
    return <p className="text-sm text-muted-foreground">Loading events…</p>
  if (error instanceof Error)
    return (
      <p className="text-sm text-destructive">
        Failed to load events: {error.message}
      </p>
    )
  if (!data || data.length === 0)
    return <p className="text-sm text-muted-foreground">No upcoming events yet.</p>

  return (
    <div className="grid gap-4">
      {data.map((ev) => (
        <EventCard key={String(ev.id)} event={ev} />
      ))}
    </div>
  )
}
