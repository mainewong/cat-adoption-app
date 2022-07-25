import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import FavouriteScreen from "../screens/FavouriteScreen";
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function FavourtieStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={FavouriteScreen} name="favourite" options={{
          title: "Your Favourites",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: false,
        }} />
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
