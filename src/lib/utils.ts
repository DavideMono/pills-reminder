export const capitalize = (text: string) => {
  const firstUpper = text.charAt(0).toUpperCase()
  return firstUpper + text.slice(1)
}
