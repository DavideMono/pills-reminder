import React, { useMemo, VFC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns'

const WEEKS_DAY = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const Calendar: VFC = () => {
  const currentDate = useMemo(() => new Date(2021, 10), [])
  const startOfThisMonth = useMemo(() => startOfMonth(currentDate), [currentDate])
  const endOfThisMonth = useMemo(() => endOfMonth(currentDate), [currentDate])
  const startOfCalendar = useMemo(() => startOfWeek(startOfThisMonth, { weekStartsOn: 1 }), [startOfThisMonth])
  const endOfCalendar = useMemo(() => endOfWeek(endOfThisMonth, { weekStartsOn: 1 }), [endOfThisMonth])
  const calendarDays = useMemo(() => {
    const startDay = startOfCalendar.getDate()
    let endOfPrevWeekDays: number[] = []
    let endOfNextWeekDays: number[] = []
    if (startOfCalendar.getDate() !== startOfThisMonth.getDate()) {
      const endOfPrevMonth = endOfMonth(startOfCalendar)
      const betweenDays = endOfPrevMonth.getDate() - startOfCalendar.getDate() + 1
      endOfPrevWeekDays = Array.from({ length: betweenDays }).map((_, index) => {
        const day = startDay + index
        if (day <= endOfPrevMonth.getDate()) return day
        return day - endOfPrevMonth.getDate()
      })
    }
    if (endOfCalendar.getDate() !== endOfThisMonth.getDate()) {
      endOfNextWeekDays = Array.from({ length: endOfCalendar.getDate() }).map((_, index) => index + 1)
    }
    const monthsDate = Array.from({ length: endOfThisMonth.getDate() }).map((_, index) => {
      return startOfThisMonth.getDate() + index
    })
    const allDays = [...endOfPrevWeekDays, ...monthsDate, ...endOfNextWeekDays]
    const chunksLength = 7
    const chunks: number[][] = []
    for (let i = 0; i < allDays.length; i += chunksLength) {
      chunks.push(allDays.slice(i, chunksLength + i))
    }
    return chunks
  }, [])

  console.log(startOfThisMonth, endOfThisMonth, startOfCalendar, endOfCalendar, calendarDays)
  return (
    <View style={[styles.flex]}>
      <View style={[styles.flexContainer, styles.spacing]}>
        {WEEKS_DAY.map((w, index) => (
          <Text style={[styles.flex, styles.textCenter]} key={index}>
            {w}
          </Text>
        ))}
      </View>
      {calendarDays.map((week, index) => (
        <View style={[styles.flexContainer, styles.flex]} key={index}>
          {week.map((day, i) => (
            <Text style={[styles.flex, styles.textCenter]} key={`${index}-${i}`}>
              {day.toString()}
            </Text>
          ))}
        </View>
      ))}
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flexCenter: { justifyContent: 'center' },
  textCenter: { textAlign: 'center' },
  flex: { flex: 1 },
  spacing: { marginVertical: 8 }
})
