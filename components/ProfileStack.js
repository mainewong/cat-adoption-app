import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function ProfileStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={ProfileScreen} name="Profile" options={{
          title: "Your Account",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null
        }} />
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
