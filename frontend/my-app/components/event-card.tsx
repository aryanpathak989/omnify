"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatRangeInTZ } from "@/lib/time"
import { useTimezone } from "@/components/timezone-provider"
import type { Event } from "@/types"
import Link from "next/link"

export function EventCard({ event }: { event: Event }) {
  const { tz } = useTimezone()
  return (
    <Card className="hover:bg-accent transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="mb-1">{event.location}</div>
        <div className="mb-3">{formatRangeInTZ(event.start_time, event.end_time, tz)}</div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Capacity: {event.max_capcity}</span>
          <Link className="text-sm font-medium underline" href={`/events/${encodeURIComponent(String(event.id))}`}>
            View
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
