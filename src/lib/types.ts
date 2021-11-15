export type ThemeColor = 'default' | 'primary' | 'secondary'
export type ThemeVariant = 'text' | 'contained'
export type TimeAmountMeasure = 'days' | 'weeks' | 'months'
export type DayEatTime = 'breakfast' | 'lunch' | 'dinner'

export enum TIME_AMOUNT_MEASURE_LABELS {
  'days' = 'Days',
  'weeks' = 'Weeks',
  'months' = 'Months'
}

export type PillTask = {
  name: string
  amount: number
  timeAmount: number
  timeAmountMeasure: TimeAmountMeasure
  eatTimes: DayEatTime[]
  timeNotification: string[]
  totalAmount: number
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
}

export type Option = { label: string; value: any; enabled?: boolean }
