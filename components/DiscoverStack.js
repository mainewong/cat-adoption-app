import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/DiscoverScreen";
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function DiscoverStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={DiscoverScreen} name="discover" options={{
          title: "Your Account",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: false,
        }} />
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
