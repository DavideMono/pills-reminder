import React, { useMemo, VFC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { format } from 'date-fns'
import Button from 'src/components/Button'

type Props = {
  currentDate: Date
  onPrevMonth: () => void
  onNextMonth: () => void
}

const Header: VFC<Props> = (props) => {
  const monthName = useMemo(() => format(props.currentDate, 'MMMM yyyy'), [props.currentDate])

  return (
    <View style={styles.root}>
      <Button leftIcon="long-arrow-alt-left" variant="text" onPress={props.onPrevMonth} />
      <Text>{monthName}</Text>
      <Button leftIcon="long-arrow-alt-right" variant="text" onPress={props.onNextMonth} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 8
  }
})
