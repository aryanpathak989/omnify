"use client"
import React from "react"
import { useParams } from "next/navigation"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

type Attendee = {
  id: string
  name: string
  email: string
}

type RegisterPayload = {
  name: string
  email: string
}

type Props = {
  apiKey: string // Pass your actual API key as a prop
}

export default function EventAttendeeManager({ apiKey }: Props) {
  const params = useParams()
  // For route /events/[eventId], the param key is exactly "eventId" (not "id")
  // Make sure your folder structure is /app/events/[eventId]/page.tsx
  const eventId = params.id as string

  const queryClient = useQueryClient()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  console.log("EventId from params:", eventId) // Debug log

  // Mutation for registering attendee
const registerMutation = useMutation({
  mutationFn: async (payload: RegisterPayload) => {
    const res = await fetch(
      `http://localhost:4000/events/${eventId}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
    if (!res.ok) {
      // Parse response body for error message
      let errMsg = "Registration failed"
      try {
        const errData = await res.json()
        errMsg = errData.message || errMsg
      } catch {
        // fallback to status text
        errMsg = res.statusText || errMsg
      }
      throw new Error(errMsg)
    }
    return res.json()
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["attendees", eventId] })
    setName("")
    setEmail("")
  },
})


  // Query for attendees
  const {
    data: attendees,
    error,
    isLoading,
  } = useQuery<Attendee[]>({
    queryKey: ["attendees", eventId],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/events/${eventId}/attendees`,
      )
      if (!res.ok) throw new Error("Fetch failed")
      const result = await res.json()
      // adapt if backend returns {data: Attendee[]}
      return result.data || result
    },
  })

  // Don't render if no eventId
  if (!eventId) {
    return <div>Loading event...</div>
  }

  return (
    <div className="flex flex-col gap-6 p-4 max-w-md mx-auto">
      <div className="text-sm text-gray-600">Event ID: {eventId}</div>

      <form
        onSubmit={e => {
          e.preventDefault()
          registerMutation.mutate({ name, email })
        }}
        className="flex flex-col gap-3"
      >
        <h3 className="font-semibold text-lg">Register Attendee</h3>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
          className="border px-2 py-1 rounded"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {registerMutation.isPending ? "Submitting..." : "Register"}
        </button>
        {registerMutation.isError && (
          <p className="text-red-500 text-sm">
            {registerMutation.error.message}
          </p>
        )}
        {registerMutation.isSuccess && (
          <p className="text-green-500 text-sm">Registered!</p>
        )}
      </form>

      <div>
        <h3 className="font-semibold text-lg mb-2">Attendees</h3>
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500 text-sm">{error.message}</p>}
        <ul className="grid gap-2">
          {attendees?.length === 0 && <p>No attendees yet.</p>}
          {attendees?.map(a => (
            <li key={a.id} className="border rounded px-2 py-1 ">
              <span className="font-medium">{a.name}</span>
              <span className="ml-2 text-gray-500">{a.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
