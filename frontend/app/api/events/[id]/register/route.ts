import { NextResponse } from "next/server"
import { getEventById, addAttendee } from "../../../_store"

type Params = { params: { id: string } }

export async function POST(req: Request, { params }: Params) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  const { name, email } = body
  if (!name || !email) return NextResponse.json({ error: "Name and email are required" }, { status: 422 })
  const ev = getEventById(params.id)
  if (!ev) return NextResponse.json({ error: "Event not found" }, { status: 404 })
  const created = addAttendee(params.id, String(name), String(email))
  return NextResponse.json(created, { status: 201 })
}
