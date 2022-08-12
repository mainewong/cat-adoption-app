import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { stylesheet } from "../../styles/stylesheet";
import { COLORS, SIZES } from '../../constants/theme'
import Quiz from './Quiz';

const QuizStart = () => {
  return (
    <View style={styles.container}>
      <Quiz/>
    </View>
  )
}

export default QuizStart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

