import React, { useCallback, useMemo, useState, VFC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek, subMonths } from 'date-fns'
import Header from 'src/components/calendar/Header'

const WEEKS_DAY = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const Calendar: VFC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
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
  }, [startOfThisMonth, endOfThisMonth, startOfCalendar, endOfCalendar])

  const onPrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1))
  }, [])

  const onNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1))
  }, [])

  return (
    <View style={[styles.flex]}>
      <Header currentDate={currentDate} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />
      <View style={styles.flexContainer}>
        {WEEKS_DAY.map((w, index, array) => (
          <Text
            style={[
              styles.flex,
              styles.textCenter,
              styles.text,
              styles.day,
              index === array.length - 1 && styles.dayRight
            ]}
            key={index}
          >
            {w}
          </Text>
        ))}
      </View>
      {calendarDays.map((week, index, array) => (
        <View style={[styles.flexContainer, styles.flex]} key={index}>
          {week.map((day, i, arr) => (
            <Text
              style={[
                styles.flex,
                styles.textCenter,
                styles.text,
                styles.day,
                i === arr.length - 1 && styles.dayRight,
                index === array.length - 1 && styles.dayBottom
              ]}
              key={`${index}-${i}`}
            >
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
  text: { fontSize: 16 },
  day: { borderTopWidth: 1, borderLeftWidth: 1 },
  dayRight: { borderRightWidth: 1 },
  dayBottom: { borderBottomWidth: 1 }
})
