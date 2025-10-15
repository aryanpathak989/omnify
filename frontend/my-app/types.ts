export type Event = {
  id: number | string
  name: string
  location: string
  start_time: string // ISO
  end_time: string // ISO
  max_capcity: number
}

export type Attendee = {
  id: number | string
  name: string
  email: string
  registered_at?: string
}
