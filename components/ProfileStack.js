import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from '../screens/EditProfileScreen';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();
const InnerStack = createStackNavigator();

export default function ProfileStack() {

    const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint,
    headerTintColor: "white",
    }

    return (
    <Stack.Navigator>
      <Stack.Screen component={ProfileScreen} name="account" options={{
          title: "Profile",
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: false,
        }} />
       
      <InnerStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Edit Profile", ...headerOptions }} />
       
    </Stack.Navigator>
    )
  }
  
  const styles = StyleSheet.create({
    header: {
      backgroundColor: COLORS.lightred,
    }
  })
