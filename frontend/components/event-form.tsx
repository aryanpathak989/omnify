"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { apiPost } from "@/lib/api"
import { useTimezone } from "@/components/timezone-provider"
import { toISTIso } from "@/lib/time"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FormState = {
  name: string
  location: string
  start: string
  end: string
  max_capacity: string
}

export function EventForm() {
  const { tz } = useTimezone()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState<FormState>({
    name: "",
    location: "",
    start: "",
    end: "",
    max_capacity: "",
  })

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Trim data for validation
    const name = form.name.trim()
    const location = form.location.trim()
    const startStr = form.start
    const endStr = form.end
    const maxCapStr = form.max_capacity.trim()

    if (!name || !location || !startStr || !endStr || !maxCapStr) {
      toast({ title: "Missing fields", description: "Please fill all fields.", variant: "destructive" })
      return
    }

    // Validate date format and logical order
    const startDate = new Date(startStr)
    const endDate = new Date(endStr)
    if (!(startDate instanceof Date && !isNaN(startDate.getTime()))) {
      toast({ title: "Invalid start time", description: "Please enter a valid start date/time.", variant: "destructive" })
      return
    }
    if (!(endDate instanceof Date && !isNaN(endDate.getTime()))) {
      toast({ title: "Invalid end time", description: "Please enter a valid end date/time.", variant: "destructive" })
      return
    }
    if (endDate <= startDate) {
      toast({ title: "Invalid event time", description: "End time must be after start time.", variant: "destructive" })
      return
    }

    // Capacity validation
    const maxCap = Number(maxCapStr)
    if (!Number.isInteger(maxCap) || maxCap <= 0) {
      toast({ title: "Invalid capacity", description: "Capacity must be a positive integer.", variant: "destructive" })
      return
    }

    // Convert to IST ISO format
    const startISO = toISTIso(startStr, tz)
    const endISO = toISTIso(endStr, tz)

    setLoading(true)
    try {
      await apiPost("/events", {
        name,
        location,
        startTime: startISO,
        endTime: endISO,
        max_capacity: maxCap,
      })
      toast({ title: "Event created", description: "Your event has been created." })
      router.push("/")
    } catch (err: any) {
      toast({ title: "Failed to create", description: err?.message || "Unknown error", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Create Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Event name</Label>
            <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start">Start (your selected timezone)</Label>
            <Input
              id="start"
              type="datetime-local"
              value={form.start}
              onChange={(e) => update("start", e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end">End (your selected timezone)</Label>
            <Input
              id="end"
              type="datetime-local"
              value={form.end}
              onChange={(e) => update("end", e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="capacity">Max capacity</Label>
            <Input
              id="capacity"
              inputMode="numeric"
              pattern="[0-9]*"
              value={form.max_capacity}
              onChange={(e) => update("max_capacity", e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" disabled={loading} className="bg-blue-600 text-white px-3 py-1 rounded">
              {loading ? "Creating…" : "Create Event"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
