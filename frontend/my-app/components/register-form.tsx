"use client"

import * as React from "react"
import { useToast } from "@/hooks/use-toast"
import { apiPost } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ eventId }: { eventId: string | number }) {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast({ title: "Missing info", description: "Name and email are required.", variant: "destructive" })
      return
    }
    setLoading(true)
    try {
      await apiPost(`/events/${encodeURIComponent(String(eventId))}/register`, { name, email })
      toast({ title: "Registered", description: "You are registered for this event." })
      setName("")
      setEmail("")
    } catch (err: any) {
      toast({ title: "Registration failed", description: err?.message || "Unknown error", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <div className="grid gap-2">
        <Label htmlFor="attendee-name">Name</Label>
        <Input id="attendee-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="attendee-email">Email</Label>
        <Input id="attendee-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting…" : "Register"}
        </Button>
      </div>
    </form>
  )
}
