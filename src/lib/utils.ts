import { Option } from 'src/lib/types'

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
