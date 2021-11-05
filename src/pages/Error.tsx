import React, { VFC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { COMMON_STYLE } from 'src/lib/styles'
import DismissKeyboardView from 'src/components/DismissKeyboardView'

type Props = { error: string }

const Error: VFC<Props> = (props) => {
  return (
    <DismissKeyboardView navigation={false} style={styles.root}>
      <Text style={COMMON_STYLE.subtitle}>Oh no! We got an error</Text>
      <Text>{props.error}</Text>
    </DismissKeyboardView>
  )
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Error
