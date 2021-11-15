import { Option, TimeAmountMeasure } from 'src/lib/types'
import { getHours, getMinutes } from 'date-fns'

export const capitalize = (text: string) => {
  const firstUpper = text.charAt(0).toUpperCase()
  return firstUpper + text.slice(1)
}

export const parseStoreValue = <T>(data: string | null, defaultValue: T): T => {
  if (data !== null) {
    return JSON.parse(data)
  }
  return defaultValue
}

export const enumToOptions = (enumLike: Record<string, any>) => {
  return Object.entries(enumLike).map<Option>(([value, label]) => ({ value, label }))
}

export const getFormattedTimestamp = (date: Date) => {
  const hours = getHours(date)
  const minutes = getMinutes(date)
  const formattedHours = hours < 10 ? `0${hours}` : hours.toString()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString()
  return `${formattedHours}:${formattedMinutes}`
}

export const getTotalAmount = (time: number, measure: TimeAmountMeasure): number => {
  if (measure === 'weeks') return time * 7
  if (measure === 'months') return time * 30
  return time
}
