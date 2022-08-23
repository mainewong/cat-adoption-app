import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import DiscoverScreen from "../screens/DiscoverScreen";
import DiscoverDetailsScreen from '../screens/DiscoverDetailsScreen';
import ApplyScreen from '../screens/ApplyScreen';
import { StyleSheet, Text, View } from 'react-native';
import BreedInfo from '../screens/BreedInfo';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();
const InnerStack = createStackNavigator();

export default function DiscoverStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={DiscoverScreen} name="discover" options={{
          title: "Browse",
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: true,
        }} />
    <InnerStack.Screen name="DiscoverDetails" component={DiscoverDetailsScreen} options={{ headerShown: true}} />
    <InnerStack.Screen name="ApplyScreen" component={ApplyScreen} options={{ headerShown: true}} />
    <InnerStack.Screen name="BreedInfo" component={BreedInfo} options={{ headerShown: true}} />
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
    header: {
      backgroundColor: COLORS.purple,
    }
  })
