import { NextResponse } from "next/server"
import { events, addEvent } from "../_store"

export async function GET() {
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  const { name, location, start_time, end_time, max_capacity } = body
  if (!name || !location || !start_time || !end_time || !max_capacity) {
    return NextResponse.json({ error: "Missing fields" }, { status: 422 })
  }
  const created = addEvent({ name, location, start_time, end_time, max_capacity: Number(max_capacity) })
  return NextResponse.json(created, { status: 201 })
}
