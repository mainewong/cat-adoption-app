import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from '../screens/EditProfileScreen';
import { StyleSheet, Text, View } from 'react-native';

const Stack = createStackNavigator();
const InnerStack = createStackNavigator();

export default function ProfileStack() {

    return (
    <Stack.Navigator>
      <Stack.Screen component={ProfileScreen} name="account" options={{
          title: "Your Account",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: false,
        }} />
       
      <InnerStack.Screen name="EditProfile" component={EditProfileScreen}  options={{ title: "Edit Review"}} />
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
  })
