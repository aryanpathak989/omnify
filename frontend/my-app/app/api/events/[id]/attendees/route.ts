import { NextResponse } from "next/server"
import { attendeesByEventId, paginate } from "../../../_store"

type Params = { params: { id: string } }

export async function GET(req: Request, { params }: Params) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || "1")
  const per_page = 10
  const list = attendeesByEventId[params.id] || []
  const res = paginate(list, page, per_page)
  return NextResponse.json(res)
}
