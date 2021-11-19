import React, { useCallback, useMemo, useState, VFC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { add, addMonths, endOfMonth, endOfWeek, format, isToday, startOfMonth, startOfWeek, subMonths } from 'date-fns'
import { DAY_FORMAT, PRIMARY, SECONDARY } from 'src/lib/constant'
import { useStore } from 'src/lib/store'
import Header from 'src/components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenList } from 'src/lib/types'
import DismissKeyboardView from 'src/components/DismissKeyboardView'

const WEEKS_DAY = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const Calendar: VFC<NativeStackScreenProps<ScreenList, 'Calendar'>> = (props) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const states = useStore((state) => state.tasks.map((t) => t.taskState))
  const tasksCount = useMemo(() => {
    const keys = states.flatMap((t) => Object.keys(t))
    return keys.reduce<{ [date: string]: number }>((acc, current) => {
      acc[current] = states.reduce((total, s) => {
        total += Object.keys(s[current] || {}).length
        return total
      }, 0)
      return acc
    }, {})
  }, [states])
  const startOfThisMonth = useMemo(() => startOfMonth(currentDate), [currentDate])
  const endOfThisMonth = useMemo(() => endOfMonth(currentDate), [currentDate])
  const startOfCalendar = useMemo(() => startOfWeek(startOfThisMonth, { weekStartsOn: 1 }), [startOfThisMonth])
  const endOfCalendar = useMemo(() => endOfWeek(endOfThisMonth, { weekStartsOn: 1 }), [endOfThisMonth])
  const calendarDays = useMemo(() => {
    let endOfPrevWeekDays: Date[] = []
    let endOfNextWeekDays: Date[] = []
    if (startOfCalendar.getDate() !== startOfThisMonth.getDate()) {
      const endOfPrevMonth = endOfMonth(startOfCalendar)
      const betweenDays = endOfPrevMonth.getDate() - startOfCalendar.getDate() + 1
      endOfPrevWeekDays = Array.from({ length: betweenDays }).map((_, index) => {
        const day = add(startOfCalendar, { days: index })
        if (day.getDate() <= endOfPrevMonth.getDate()) return day
        return add(day, { days: -endOfPrevMonth.getDate() })
      })
    }
    if (endOfCalendar.getDate() !== endOfThisMonth.getDate()) {
      endOfNextWeekDays = Array.from({ length: endOfCalendar.getDate() }).map((_, index) =>
        add(startOfThisMonth, { months: 1, days: index })
      )
    }
    const monthsDate = Array.from({ length: endOfThisMonth.getDate() }).map((_, index) => {
      return add(startOfThisMonth, { days: index })
    })
    const allDays = [...endOfPrevWeekDays, ...monthsDate, ...endOfNextWeekDays]
    const chunksLength = 7
    const chunks: Date[][] = []
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
    <DismissKeyboardView onNavigate={props.navigation.navigate} currentRoute={props.route.name}>
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
          {week.map((day, i, arr) => {
            const today = isToday(day)
            const key = format(day, DAY_FORMAT)
            const taskCount = tasksCount[key] || 0
            return (
              <View
                key={`${index}-${i}`}
                style={[
                  styles.flex,
                  styles.flexVerticalCenter,
                  styles.day,
                  i === arr.length - 1 && styles.dayRight,
                  index === array.length - 1 && styles.dayBottom,
                  today && styles.dayToday
                ]}
              >
                <Text style={[styles.textCenter, styles.text, today && styles.dayTextToday]}>{day.getDate()}</Text>
                {taskCount > 0 && (
                  <View style={styles.counter}>
                    <Text style={styles.counterText}>{taskCount}</Text>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      ))}
      <View style={styles.spacer} />
    </DismissKeyboardView>
  )
}

export default Calendar

const styles = StyleSheet.create({
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flexVerticalCenter: { alignItems: 'center' },
  flexCenter: { justifyContent: 'center' },
  textCenter: { textAlign: 'center' },
  flex: { flex: 1 },
  text: { fontSize: 16 },
  day: { borderTopWidth: 1, borderLeftWidth: 1 },
  dayRight: { borderRightWidth: 1 },
  dayBottom: { borderBottomWidth: 1 },
  dayToday: { backgroundColor: PRIMARY },
  dayTextToday: { color: 'white' },
  counter: {
    borderRadius: 99,
    backgroundColor: SECONDARY,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 8
  },
  counterText: { color: 'white' },
  spacer: { marginVertical: 8 }
})
