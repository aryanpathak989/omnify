export type TZChoice = "auto" | "Asia/Kolkata" | "UTC"

// Helper: parse "YYYY-MM-DDTHH:mm" into components
function parseLocalDateTime(s: string) {
  const [date, time = "00:00"] = s.split("T")
  const [y, m, d] = date.split("-").map((n) => Number(n))
  const [hh, mm] = time.split(":").map((n) => Number(n))
  return { y, m, d, hh, mm }
}

// Format a date (ISO string) in a given IANA timezone using Intl
function formatInZone(iso: string, zone: string) {
  const dtf = new Intl.DateTimeFormat(undefined, {
    timeZone: zone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  const parts = dtf.formatToParts(new Date(iso))
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? ""
  const wk = get("weekday")
  const mo = get("month")
  const day = get("day")
  const hr = get("hour")
  const min = get("minute")
  return `${wk}, ${mo} ${day} • ${hr}:${min}`
}

// Display a start/end range in selected timezone
export function formatRangeInTZ(startISO: string, endISO: string, tzChoice: TZChoice) {
  const zone = tzChoice === "auto" ? Intl.DateTimeFormat().resolvedOptions().timeZone : tzChoice
  const startStr = formatInZone(startISO, zone)
  const endStr = formatInZone(endISO, zone)
  return `${startStr} — ${endStr}`
}

// Convert a local datetime string (from <input type="datetime-local">) expressed in the selected TZ to a UTC ISO
// Note: We do not actually need to convert "to IST"; servers commonly use UTC ISO. For Asia/Kolkata, we apply +05:30 offset explicitly.
// - "auto": interpret input in the browser's local timezone via Date constructor
// - "UTC": construct from UTC components
// - "Asia/Kolkata": fixed offset +05:30 (no DST)
export function toISTIso(localISO: string, tzChoice: TZChoice) {
  if (!localISO) return new Date(Number.NaN).toISOString()

  const { y, m, d, hh, mm } = parseLocalDateTime(localISO)

  let ms: number
  if (tzChoice === "auto") {
    // Browser local timezone
    ms = new Date(localISO).getTime()
  } else if (tzChoice === "UTC") {
    // Interpret as UTC wall time
    ms = Date.UTC(y, (m || 1) - 1, d || 1, hh || 0, mm || 0)
  } else {
    // Asia/Kolkata -> UTC instant by subtracting +05:30
    // i.e., UTC = IST - 5h30m
    ms = Date.UTC(y, (m || 1) - 1, d || 1, (hh || 0) - 5, (mm || 0) - 30)
  }

  return new Date(ms).toISOString()
}
