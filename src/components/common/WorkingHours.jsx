import React from 'react'

export function formatTime(t) {
  if (!t) return ''
  const s = t.toString().trim()

  const ampmMatch = s.match(/^(\s*)(\d{1,2})(?::(\d{2}))?\s*([ap]m)\s*$/i)
  if (ampmMatch) {
    let hh = parseInt(ampmMatch[2], 10)
    const mm = ampmMatch[3] || '00'
    const period = ampmMatch[4].toUpperCase()
    if (Number.isNaN(hh)) return s.replace(/\s+/g, ' ')
    let displayHour = hh % 12
    if (displayHour === 0) displayHour = 12
    return `${displayHour}:${mm} ${period}`
  }

  const m = s.match(/^(\d{1,2})(?::(\d{2}))?$/)
  if (!m) return s
  let hh = parseInt(m[1], 10)
  const mm = m[2] || '00'
  if (Number.isNaN(hh)) return s
  const period = hh >= 12 ? 'PM' : 'AM'
  let displayHour = hh % 12
  if (displayHour === 0) displayHour = 12
  return `${displayHour}:${mm} ${period}`
}

export function formatTimeRange(rangeStr) {
  if (!rangeStr) return ''
  if (rangeStr.includes('-')) {
    const parts = rangeStr.split('-').map(p => p.trim())
    const left = formatTime(parts[0])
    const right = parts[1] ? formatTime(parts[1]) : ''
    return right ? `${left} – ${right}` : left
  }
  return formatTime(rangeStr)
}

export default function WorkingHours({ hours = [], size = 'normal' }) {
  if (!hours || !hours.length) return <p>No working hours provided</p>

  const headingClass = size === 'small' ? 'font-semibold text-lg mb-3' : 'font-semibold text-xl mb-3'
  const itemClass = size === 'small' ? 'text-sm sm:text-base font-normal' : 'text-base sm:text-lg font-normal'

  return (
    <div>
      <h4 className={headingClass}>Working Hours</h4>
      {hours.map((wh, i) => {
        const rawDayFrom = wh.dayFrom || wh.day || wh.day_from || wh.from_day || wh.fromDay || ''
        const rawDayTo = wh.dayTo || wh.toDay || wh.day_to || wh.to_day || wh.toDay || ''
        const dayFrom = (rawDayFrom || '').toString().trim()
        const dayTo = (rawDayTo || '').toString().trim()
        const dayLine = dayFrom && dayTo ? `${dayFrom} – ${dayTo}` : (dayFrom || dayTo || '')

        let timeLine = ''
        if (wh.isClosed || wh.closed) timeLine = 'Closed'
        else if (wh.time) timeLine = wh.time
        else if (wh.hours) timeLine = wh.hours
        else {
          const fromTime = wh.hoursFrom || wh.hours_from || wh.hoursfrom || wh.fromTime || wh.time_from || wh.open || wh.from || ''
          const toTime = wh.hoursTo || wh.hours_to || wh.hoursto || wh.toTime || wh.time_to || wh.close || wh.to || ''
          const f = (fromTime || '').toString().trim()
          const t = (toTime || '').toString().trim()
          if (f && t) timeLine = `${f} - ${t}`
          else if (f) timeLine = f
          else if (t) timeLine = t
        }

        if (timeLine && timeLine !== 'Closed') {
          timeLine = formatTimeRange(timeLine)
        }

        return (
          <div key={i} className={itemClass}>
            {dayLine ? <div className="font-semibold text-center md:text-left">{dayLine.endsWith(':') ? dayLine : `${dayLine}:`}</div> : null}
            {timeLine ? <div className="mt-1 text-sm md:text-sm text-center md:text-left">{timeLine}</div> : null}
          </div>
        )
      })}
    </div>
  )
}
