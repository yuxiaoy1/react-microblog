import { useEffect, useState } from 'react'

const secondsTable = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
]

const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

const getTimeAgo = (date) => {
  let bestTime, bestUnit, bestInterval
  const seconds = Math.round((date.getTime() - new Date().getTime()) / 1000)
  const absSeconds = Math.abs(seconds)

  for (let [unit, unitSeconds] of secondsTable) {
    if (absSeconds >= unitSeconds) {
      bestUnit = unit
      bestTime = Math.round(seconds / unitSeconds)
      bestInterval = unitSeconds / 2
      break
    }
    if (!bestUnit) {
      bestUnit = 'second'
      bestTime = parseInt(seconds / 10) * 10
      bestInterval = 10
    }
  }

  return [bestTime, bestUnit, bestInterval]
}

export default function TimeAgo({ isoDate }) {
  const date = new Date(Date.parse(isoDate))
  const [time, unit, interval] = getTimeAgo(date)
  const [, setUpdate] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate((update) => update + 1)
    }, interval * 1000)
    return () => clearInterval(timer)
  }, [interval])

  return <span>{rtf.format(time, unit)}</span>
}
