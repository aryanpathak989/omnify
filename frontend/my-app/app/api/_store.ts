import type { Event, Attendee } from "@/types"

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

let _eventId = 3
let _attendeeId = 1
let _userId = 1

// Seed a few future events
export const events: Event[] = [
  {
    id: 1,
    name: "Product Launch Meetup",
    location: "Mumbai",
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 days
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(), // +2h
    max_capacity: 120,
  },
  {
    id: 2,
    name: "Design Systems Workshop",
    location: "Bengaluru",
    start_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // +5 days
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(), // +3h
    max_capacity: 40,
  },
]

export const attendeesByEventId: Record<string, Attendee[]> = {
  "1": [],
  "2": [],
}

export const users: User[] = []

export function addEvent(input: Omit<Event, "id">): Event {
  const ev: Event = { ...input, id: _eventId++ }
  events.push(ev)
  attendeesByEventId[String(ev.id)] = []
  return ev
}

export function getEventById(id: string | number) {
  return events.find((e) => String(e.id) === String(id))
}

export function addAttendee(eventId: string | number, name: string, email: string): Attendee {
  const list = attendeesByEventId[String(eventId)] || (attendeesByEventId[String(eventId)] = [])
  const att: Attendee = { id: _attendeeId++, name, email, registered_at: new Date().toISOString() }
  list.push(att)
  return att
}

export function paginate<T>(items: T[], page = 1, per_page = 10) {
  const start = (page - 1) * per_page
  const data = items.slice(start, start + per_page)
  return { data, total: items.length, page, per_page }
}

export function addUser(input: Omit<User, "id">) {
  const exists = users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())
  if (exists) throw new Error("User with this email already exists")
  const user: User = { id: _userId++, ...input }
  users.push(user)
  return user
}

export function findUser(email: string, password: string) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
}
