import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/QuizScreen";
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function FavourtieStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={QuizScreen} name="quiz" options={{
          title: "Quiz",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: false,
        }} />
      
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
