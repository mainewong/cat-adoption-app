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
          title: "Discover",
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: true,
        }} />
    <InnerStack.Screen name="DiscoverDetails" component={DiscoverDetailsScreen} options={{ title: "Details", headerShown: true,  headerStyle: styles.header, headerTintColor: "white",}} />
    <InnerStack.Screen name="ApplyScreen" component={ApplyScreen} options={{ title: "Apply", headerShown: true, headerStyle: styles.header, headerTintColor: "white" }} />
    <InnerStack.Screen name="BreedInfo" component={BreedInfo} options={{  title: "About this breed", headerShown: true, headerStyle: styles.header, headerTintColor: "white" }} />
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
    header: {
      backgroundColor: COLORS.yellow,
    }
  })
