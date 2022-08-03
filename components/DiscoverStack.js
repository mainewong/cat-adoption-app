import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/DiscoverScreen";
import DiscoverDetailsScreen from '../screens/DiscoverDetailsScreen';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();
const InnerStack = createStackNavigator();

export default function DiscoverStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={DiscoverScreen} name="discover" options={{
          title: "Browse",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: true,
        }} />
    <InnerStack.Screen name="DiscoverDetails" component={DiscoverDetailsScreen} options={{ headerShown: true}} />
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
