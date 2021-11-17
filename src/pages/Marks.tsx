import React, { useCallback, useMemo, VFC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format, startOfToday } from 'date-fns'
import { DAY_FORMAT } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { DayTaskState, PillTask, ScreenList, ThemeColor } from 'src/lib/types'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Button from 'src/components/Button'

const colorMap: { [index: string]: ThemeColor } = {
  scheduled: 'default',
  done: 'primary',
  skipped: 'secondary'
}

const Marks: VFC<NativeStackScreenProps<ScreenList, 'Marks'>> = (props) => {
  const store = useStore()
  const actualTaskIndex = useStore((state) => state.tasks.findIndex((t) => t.name === props.route.params.id))
  const actualTask = useMemo(() => store.tasks[actualTaskIndex] || null, [store, actualTaskIndex])
  const currentDate = useMemo(() => format(startOfToday(), DAY_FORMAT), [])

  const onMark = useCallback(
    (notification: string, nextMark: DayTaskState) => {
      if (actualTask) {
        const next: PillTask = JSON.parse(JSON.stringify(actualTask))
        next.taskState[currentDate][notification] = nextMark
        store.update(next, actualTaskIndex)
      }
    },
    [actualTask, currentDate]
  )

  return (
    <DismissKeyboardView onGoBack={props.navigation.goBack}>
      <Text style={COMMON_STYLE.title}>Mark your task for today</Text>
      <ScrollView style={styles.spacing}>
        {Object.entries(actualTask?.taskState[currentDate] || {}).map(([notification, state], index) => {
          const color: ThemeColor = colorMap[state]
          return (
            <View key={index} style={[styles.spacing, styles.flexContainer]}>
              <Button
                styleRoot={[styles.flex, styles.noRoundRight]}
                size="lg"
                color={color}
                text={notification}
                onPress={() => {}}
              />
              <Button
                styleRoot={[styles.noRoundRight, styles.noRoundLeft]}
                size="lg"
                leftIcon="broom"
                onPress={() => onMark(notification, 'scheduled')}
              />
              <Button
                styleRoot={[styles.noRoundRight, styles.noRoundLeft]}
                size="lg"
                leftIcon="history"
                onPress={() => onMark(notification, 'skipped')}
              />
              <Button
                styleRoot={styles.noRoundLeft}
                size="lg"
                leftIcon="check"
                onPress={() => onMark(notification, 'done')}
              />
            </View>
          )
        })}
      </ScrollView>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flex: { flex: 1 },
  spacing: { marginVertical: 8 },
  noRoundRight: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  noRoundLeft: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
})

export default Marks
