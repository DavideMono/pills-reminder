import React, { useCallback, useMemo, VFC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format, startOfToday } from 'date-fns'
import { DAY_FORMAT } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { DayTaskState, PillTask, ScreenList } from 'src/lib/types'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import SingleMark from 'src/components/SingleMark'

const Marks: VFC<NativeStackScreenProps<ScreenList, 'Marks'>> = (props) => {
  const store = useStore()
  const isSingle = useMemo(() => !props.route.params?.id, [props.route])
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
          {tasks.map((actualTask, index) => (
            <SingleMark
              key={index}
              task={actualTask}
              currentDate={currentDate}
              showTitle={isSingle}
              onMark={(notification, status) => onMark(actualTask, index, notification, status)}
            />
          ))}
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
  spacing: { marginVertical: 8 }
})

export default Marks
