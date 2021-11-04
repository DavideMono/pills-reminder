import React, { useEffect, useState, VFC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import shallow from 'zustand/shallow'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { BACKGROUND_SECONDARY, BORDER_RADIUS } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { PillTask } from 'src/lib/types'

const Home: VFC = () => {
  const { tasks, add } = useStore((state) => ({ tasks: state.tasks, add: state.add }), shallow)
  const [filteredTasks, setFilteredTasks] = useState<PillTask[]>([])
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const searchValueLowerCase = searchValue.toLowerCase()
    const filtered = tasks.filter((t) => t.name.toLocaleLowerCase().includes(searchValueLowerCase))
    setFilteredTasks(filtered)
  }, [tasks, searchValue])

  return (
    <DismissKeyboardView>
      <View style={styles.root}>
        <Input style={styles.component} value={searchValue} onChange={setSearchValue} placeholder="Search" />
        <View style={styles.component}>
          <Text style={COMMON_STYLE.title}>Hello,</Text>
          <Text style={COMMON_STYLE.subtitleLight}>$YOUR NAME</Text>
        </View>
        <View style={[styles.component, styles.cardComponent]}>
          <View style={[styles.cardLeftChild, styles.cardTextContainer]}>
            <Text style={COMMON_STYLE.subtitle}>Your Plan for today</Text>
            <Text>$NC of $NT completed</Text>
            <Text style={[COMMON_STYLE.link, styles.textSpacer]}>Show more</Text>
          </View>
          <View style={styles.cardRightChild} />
        </View>
        <Text style={[COMMON_STYLE.subtitle]}>Daily Review</Text>
        <ScrollView>
          {filteredTasks.length ? (
            filteredTasks.map((task, index) => (
              <Button
                styleRoot={styles.taskContainer}
                key={index}
                text={task.name}
                onPress={() => console.log('Press on', task.name)}
              />
            ))
          ) : (
            <Text>NO TASK FOR NOW</Text>
          )}
        </ScrollView>
        <Button
          styleRoot={styles.component}
          color="secondary"
          onPress={() =>
            add({
              name: 'Next task' + tasks.length,
              amount: 2,
              timeAmount: 25,
              timeAmountMeasure: 'days',
              eatTime: ['breakfast'],
              timeNotification: 25
            })
          }
          text="Press me"
        />
      </View>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
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
  taskContainer: {
    marginVertical: 8
  }
})

export default Home
