import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/quiz/QuizScreen";
import QuizStart from '../screens/quiz/QuizStart';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();
const InnerStack = createStackNavigator();

export default function FavourtieStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={QuizScreen} name="quiz" options={{
          title: "Quiz",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: false,
        }} />

      <InnerStack.Screen name="QuizStart" component={QuizStart} options={{headerShown: false}} /> 
      
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
