export type ThemeColor = 'default' | 'primary' | 'secondary'
export type ThemeVariant = 'text' | 'contained'
export type TimeAmountMeasure = 'days' | 'weeks' | 'months'
export type DayEatTime = 'breakfast' | 'lunch' | 'dinner'

export type PillTask = {
  name: string
  amount: number
  timeAmount: number
  timeAmountMeasure: TimeAmountMeasure
  eatTime: DayEatTime[]
  timeNotification: number
}

export type Store = {
  tasks: PillTask[]
  add: (task: PillTask) => void
  update: (task: PillTask, index: number) => void
  delete: (index: number) => void
}
