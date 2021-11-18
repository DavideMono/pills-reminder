import { Props as IconProps } from '@fortawesome/react-native-fontawesome'

export type ThemeColor = 'default' | 'primary' | 'secondary'
export type ThemeVariant = 'text' | 'contained'
export type TimeAmountMeasure = 'days' | 'weeks' | 'months'
export type DayEatTime = 'breakfast' | 'lunch' | 'dinner'
export type DayTaskState = 'scheduled' | 'done' | 'skipped'
export type TaskCount = { done: number; total: number }

export enum TIME_AMOUNT_MEASURE_LABELS {
  'days' = 'Days',
  'weeks' = 'Weeks',
  'months' = 'Months'
}

export type TaskState = {
  [date: string]: {
    [notification: string]: DayTaskState
  }
}

export type PillTask = {
  name: string
  amount: number
  timeAmount: number
  timeAmountMeasure: TimeAmountMeasure
  eatTimes: DayEatTime[]
  timeNotification: string[]
  totalAmount: number
  taskState: TaskState
}

export type Store = {
  name: string
  tasks: PillTask[]
  updateName: (name: string) => void
  add: (task: PillTask) => void
  update: (task: PillTask, index: number) => void
  delete: (index: number) => void
  initialize: (tasks: PillTask[], name: string) => void
}

export type ScreenList = {
  Home: undefined
  Account: undefined
  Plan: { id: string } | undefined
  Marks: { id: string } | undefined
}

export type Option = { label: string; value: any; enabled?: boolean }

export type ActionType = { icon: IconProps['icon']; onPress: () => void }
