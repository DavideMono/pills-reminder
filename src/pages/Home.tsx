import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import shallow from 'zustand/shallow'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { BACKGROUND_SECONDARY, BORDER_RADIUS } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { PillTask, ScreenList, TaskCount } from 'src/lib/types'
import { getCount } from 'src/lib/utils'

const Home: VFC<NativeStackScreenProps<ScreenList, 'Home'>> = (props) => {
  const [tasks] = useStore((state) => [state.tasks, state.add], shallow)
  const name = useStore((store) => store.name)
  const { done, total } = useMemo<TaskCount>(() => getCount(tasks), [tasks])
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
        <View style={styles.cardRightChild}>
          <Image style={styles.image} source={require('../assets/flamenco.png')} />
        </View>
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
  },
  image: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 200,
    height: 200
  }
})

export default Home
