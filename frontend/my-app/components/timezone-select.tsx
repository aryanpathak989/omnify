"use client"

import { useTimezone } from "./timezone-provider"

export function TimezoneSelect() {
  const { tz, setTZ } = useTimezone()
  return (
    <select
      aria-label="Timezone"
      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
      value={tz}
      onChange={(e) => setTZ(e.target.value as any)}
    >
      <option value="auto">Auto (Device)</option>
      <option value="Asia/Kolkata">IST (Asia/Kolkata)</option>
      <option value="UTC">UTC</option>
    </select>
  )
}
