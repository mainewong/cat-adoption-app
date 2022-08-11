import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { stylesheet } from "../styles/stylesheet";

const QuizScreen = () => {
  return (
    <View style={stylesheet.container}>
      <Text style={stylesheet.title}>My Quiz</Text>
    </View>
  )
}

export default QuizScreen

const styles = StyleSheet.create({})