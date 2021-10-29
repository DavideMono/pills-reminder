import React, { useState, VFC } from 'react'
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { SECONDARY } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'

const Home: VFC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.root}>
        <Input style={styles.component} value={value} onChange={setValue} placeholder="Search" />
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
          <Text>NO TASK FOR NOW</Text>
        </ScrollView>
        <Button
          styleRoot={styles.component}
          color="secondary"
          onPress={() => console.log('On press')}
          text="Press me"
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 12
  },
  component: {
    marginVertical: 8
  },
  cardComponent: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: SECONDARY,
    paddingHorizontal: 8,
    paddingVertical: 12
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
  }
})

export default Home
