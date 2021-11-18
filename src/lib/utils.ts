import { add, format, getHours, getMinutes, startOfToday } from 'date-fns'
import { DAY_FORMAT, START_COUNT } from 'src/lib/constant'
import { DayTaskState, Option, PillTask, TaskState, TimeAmountMeasure } from 'src/lib/types'

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

export const createTaskNotification = (notification: string[]) => {
  return notification.reduce<{ [index: string]: DayTaskState }>((acc, current) => {
    acc[current] = 'scheduled'
    return acc
  }, {})
}

export const createTaskState = (notification: string[], totalTime: number) => {
  const today = startOfToday()
  const state: TaskState = {}
  const tasksNotification = createTaskNotification(notification)
  for (let i = 1; i <= totalTime; i++) {
    const date = add(today, { days: i })
    const index = format(date, DAY_FORMAT)
    state[index] = { ...tasksNotification }
  }
  return state
}

export const reclaimTaskState = (oldState: TaskState, notification: string[], totalTime: number) => {
  const keys = Object.keys(oldState)
  if (keys.length < totalTime) {
    const tasksNotification = createTaskNotification(notification)
    const today = startOfToday()
    const formatted = format(today, DAY_FORMAT)
    const index = keys.findIndex((d) => d === formatted)
    const nextTotalTimes = totalTime - index
    const state: TaskState = {}
    for (let i = 0; i < nextTotalTimes; i++) {
      const nextDate = add(today, { days: i })
      const nextIndex = format(nextDate, DAY_FORMAT)
      state[nextIndex] = { ...tasksNotification }
    }
    return { ...oldState, ...state }
  } else if (keys.length > totalTime) {
    const reducedKeys = keys.slice(0, totalTime)
    return reducedKeys.reduce<TaskState>((acc, current) => {
      acc[current] = oldState[current]
      return acc
    }, {})
  }
  return oldState
}

export const getCount = (tasks: PillTask[]) => {
  const init = { ...START_COUNT }
  return tasks.reduce((total, current) => {
    const singleInit = { ...START_COUNT }
    const date = format(startOfToday(), DAY_FORMAT)
    const notifications = Object.values(current.taskState[date] || {})
    const singleCount = notifications.reduce((acc, value) => {
      if (value === 'done') acc.done += 1
      acc.total += 1
      return acc
    }, singleInit)
    total.total += singleCount.total
    total.done += singleCount.done
    return total
  }, init)
}
