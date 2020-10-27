import React from 'react'
import Constants from 'expo-constants'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}