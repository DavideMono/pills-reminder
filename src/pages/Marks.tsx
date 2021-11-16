import React, { VFC } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { COMMON_STYLE } from 'src/lib/styles'
import { useStore } from 'src/lib/store'
import { ScreenList } from 'src/lib/types'
import DismissKeyboardView from 'src/components/DismissKeyboardView'
import Button from 'src/components/Button'

const Marks: VFC<NativeStackScreenProps<ScreenList, 'Marks'>> = (props) => {
  const actualTask = useStore((state) => state.tasks.find((t) => t.name === props.route.params.id) || null)
  return (
    <DismissKeyboardView onGoBack={props.navigation.goBack}>
      <Text style={COMMON_STYLE.title}>Mark your task for today</Text>
      <ScrollView style={styles.spacing}>
        {actualTask?.timeNotification.map((notification, index) => (
          <View key={index} style={[styles.spacing, styles.flexContainer]}>
            <Button styleRoot={[styles.flex, styles.noRoundRight]} size="lg" text={notification} onPress={() => {}} />
            <Button
              styleRoot={[styles.noRoundRight, styles.noRoundLeft]}
              size="lg"
              color="secondary"
              leftIcon="history"
              onPress={() => {}}
            />
            <Button styleRoot={styles.noRoundLeft} size="lg" color="primary" leftIcon="check" onPress={() => {}} />
          </View>
        ))}
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
