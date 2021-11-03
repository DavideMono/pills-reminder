import React, { VFC } from 'react'
import { View } from 'react-native'
import Button from 'src/components/Button'

const BottomNavigation: VFC = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 8,
        height: 60
      }}
    >
      <Button styleRoot={{ height: 40, marginVertical: 5 }} text="H" onPress={() => {}} />
      <Button
        styleRoot={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        color="primary"
        text="ADD"
        size="xl"
        onPress={() => {}}
      />
      <Button styleRoot={{ height: 40, marginVertical: 5 }} text="C" onPress={() => {}} />
    </View>
  )
}

export default BottomNavigation
