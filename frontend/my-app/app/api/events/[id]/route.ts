import { NextResponse } from "next/server"
import { getEventById } from "../../_store"

type Params = { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const ev = getEventById(params.id)
  if (!ev) return NextResponse.json({ error: "Event not found" }, { status: 404 })
  return NextResponse.json(ev)
}
