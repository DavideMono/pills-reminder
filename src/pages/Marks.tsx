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
  const isSingle = useMemo(() => !!props.route.params?.id, [props.route])
  const tasks = useMemo(
    () => (props.route.params?.id ? store.tasks.filter((t) => t.name === props.route.params?.id) : store.tasks),
    [store, props.route]
  )
  const currentDate = useMemo(() => format(startOfToday(), DAY_FORMAT), [])

  const onMark = useCallback(
    (task: PillTask, index: number, notification: string, nextMark: DayTaskState) => {
      const next: PillTask = JSON.parse(JSON.stringify(task))
      next.taskState[currentDate][notification] = nextMark
      store.update(next, index)
    },
    [currentDate]
  )

  return (
    <DismissKeyboardView onGoBack={props.navigation.goBack}>
      <Text style={COMMON_STYLE.title}>Mark your task for today</Text>
      {tasks.length ? (
        <ScrollView style={styles.spacing}>
          {tasks.map((actualTask, index) => {
            return actualTask.taskState[currentDate] ? (
              <View key={index} style={styles.spacing}>
                {isSingle && <Text style={COMMON_STYLE.subtitle}>{actualTask.name}</Text>}
                {Object.entries(actualTask.taskState[currentDate]).map(([notification, state], i) => {
                  const color: ThemeColor = colorMap[state]
                  return (
                    <View key={`${index}-${i}`} style={[styles.spacing, styles.flexContainer]}>
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
                        onPress={() => onMark(actualTask, index, notification, 'scheduled')}
                      />
                      <Button
                        styleRoot={[styles.noRoundRight, styles.noRoundLeft]}
                        size="lg"
                        leftIcon="history"
                        onPress={() => onMark(actualTask, index, notification, 'skipped')}
                      />
                      <Button
                        styleRoot={styles.noRoundLeft}
                        size="lg"
                        leftIcon="check"
                        onPress={() => onMark(actualTask, index, notification, 'done')}
                      />
                    </View>
                  )
                })}
              </View>
            ) : (
              <View key={index} style={[styles.spacing, styles.flexContainer, styles.flexCenter]}>
                <Text style={COMMON_STYLE.subtitleLight}>
                  Nothing to mark today {isSingle && `for ${actualTask.name}`}
                </Text>
              </View>
            )
          })}
        </ScrollView>
      ) : (
        <View style={[styles.spacing, styles.flexContainer, styles.flexCenter]}>
          <Text style={COMMON_STYLE.subtitleLight}>Create your first task!</Text>
        </View>
      )}
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  flexContainer: { display: 'flex', flexDirection: 'row' },
  flexCenter: { justifyContent: 'center' },
  flex: { flex: 1 },
  spacing: { marginVertical: 8 },
  noRoundRight: { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  noRoundLeft: { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
})

export default Marks
