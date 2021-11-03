import React, { useState, VFC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { BACKGROUND_SECONDARY, BORDER_RADIUS } from 'src/lib/constant'
import { COMMON_STYLE } from 'src/lib/styles'

const Home: VFC = () => {
  const [value, setValue] = useState<string>('')

  return (
    <DismissKeyboardView>
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
          variant="text"
          onPress={() => console.log('On press')}
          text="Press me"
        />
      </View>
    </DismissKeyboardView>
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
  }
})

export default Home
