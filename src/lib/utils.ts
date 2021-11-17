import { add, format, getHours, getMinutes, startOfToday } from 'date-fns'
import { DAY_FORMAT } from 'src/lib/constant'
import { DayTaskState, Option, TaskState, TimeAmountMeasure } from 'src/lib/types'

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

export const getDateWithTimestamp = (date: Date, timestamp: string): Date => {
  const split = timestamp.split(':')
  return add(date, { hours: Number(split[0]), minutes: Number(split[1]) })
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

export const createTaskState = (notification: string[], totalTime: number) => {
  const today = startOfToday()
  const state: TaskState = {}
  const tasksNotification = notification.reduce<{ [index: string]: DayTaskState }>((acc, current) => {
    acc[current] = 'scheduled'
    return acc
  }, {})
  for (let i = 1; i <= totalTime; i++) {
    const date = add(today, { days: i })
    const index = format(date, DAY_FORMAT)
    state[index] = { ...tasksNotification }
  }
  return state
}
