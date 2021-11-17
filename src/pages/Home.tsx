import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { format, startOfToday } from 'date-fns'
import shallow from 'zustand/shallow'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { BACKGROUND_SECONDARY, BORDER_RADIUS, DAY_FORMAT } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { PillTask, ScreenList } from 'src/lib/types'

type TaskCount = { done: number; total: number }
const INIT_COUNT: TaskCount = { done: 0, total: 0 }

const Home: VFC<NativeStackScreenProps<ScreenList, 'Home'>> = (props) => {
  const [tasks] = useStore((state) => [state.tasks, state.add], shallow)
  const name = useStore((store) => store.name)
  const { done, total } = useMemo<TaskCount>(() => {
    return tasks.reduce(
      (acc, current) => {
        const date = format(startOfToday(), DAY_FORMAT)
        const singleCount = Object.values(current.taskState[date] || {}).reduce(
          (acc, value) => {
            if (value === 'done') acc.done += 1
            acc.total += 1
            return acc
          },
          { ...INIT_COUNT }
        )
        acc.done = singleCount.done
        acc.total = singleCount.total
        return acc
      },
      { ...INIT_COUNT }
    )
  }, [tasks])
  const [filteredTasks, setFilteredTasks] = useState<PillTask[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const goToSettings = useCallback(() => props.navigation.navigate('Account'), [props])
  const goToPlan = useCallback((name: string) => props.navigation.navigate('Plan', { id: name }), [props])
  const goToMarks = useCallback(() => props.navigation.navigate('Marks'), [])

  useEffect(() => {
    const searchValueLowerCase = searchValue.toLowerCase()
    const filtered = tasks.filter((t) => t.name.toLocaleLowerCase().includes(searchValueLowerCase))
    setFilteredTasks(filtered)
  }, [tasks, searchValue])

  return (
    <DismissKeyboardView onNavigate={props.navigation.navigate}>
      <View style={[styles.inputContainer, styles.component]}>
        <Input style={styles.input} value={searchValue} onChange={setSearchValue} placeholder="Search" />
        <Button onPress={goToSettings} leftIcon="cog" />
      </View>
      <View style={styles.component}>
        <Text style={COMMON_STYLE.title}>Hello,</Text>
        <Text style={COMMON_STYLE.subtitleLight}>{name}</Text>
      </View>
      <View style={[styles.component, styles.cardComponent]}>
        <View style={[styles.cardLeftChild, styles.cardTextContainer]}>
          <Text style={COMMON_STYLE.subtitle}>Your Plan for today</Text>
          <Text>
            {done} of {total} completed
          </Text>
          <Text style={[COMMON_STYLE.link, styles.textSpacer]} onPress={goToMarks}>
            Show more
          </Text>
        </View>
        <View style={styles.cardRightChild} />
      </View>
      <Text style={[COMMON_STYLE.subtitle]}>Daily Review</Text>
      {filteredTasks.length ? (
        <ScrollView style={[styles.component, styles.generalTaskContainer]}>
          {filteredTasks.map((task, index) => (
            <Button
              key={index}
              styleRoot={styles.component}
              size="xl"
              leftIcon="pills"
              text={task.name}
              rightIcon="long-arrow-alt-right"
              onPress={() => goToPlan(task.name)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={[styles.component, styles.noTaskContainer, styles.generalTaskContainer]}>
          <Text>Create your first task!</Text>
        </View>
      )}
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginRight: 8
  },
  component: {
    marginVertical: 8
  },
  cardComponent: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: BACKGROUND_SECONDARY,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS
  },
  cardLeftChild: {
    flex: 1
  },
  cardRightChild: {
    flex: 1
  },
  cardTextContainer: {
    display: 'flex'
  },
  textSpacer: {
    marginTop: 24
  },
  generalTaskContainer: {
    flex: 1
  },
  noTaskContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default Home
