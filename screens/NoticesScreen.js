import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { stylesheet } from "../styles/stylesheet";

const NoticesScreen = () => {
  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.title}>My notices</Text>
    </View>
  )
}

export default NoticesScreen

const styles = StyleSheet.create({})