"use client"

import React from "react"
import type { TZChoice } from "@/lib/time"

type Ctx = {
  tz: TZChoice
  setTZ: (v: TZChoice) => void
}

const TimezoneCtx = React.createContext<Ctx | null>(null)

export function TimezoneProvider({ children }: { children: React.ReactNode }) {
  const [tz, setTZ] = React.useState<TZChoice>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("tz-choice") as TZChoice) || "auto"
    }
    return "auto"
  })
  React.useEffect(() => {
    localStorage.setItem("tz-choice", tz)
  }, [tz])

  return <TimezoneCtx.Provider value={{ tz, setTZ }}>{children}</TimezoneCtx.Provider>
}

export function useTimezone() {
  const ctx = React.useContext(TimezoneCtx)
  if (!ctx) throw new Error("useTimezone must be used within TimezoneProvider")
  return ctx
}
