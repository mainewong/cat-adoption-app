import React from 'react';
import { StyleSheet, Text, View, st} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from '../constants/theme';
import CreateScreen from '../screens/CreateScreen';
import NoticesScreen from '../screens/NoticesScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditScreen from '../screens/EditScreen';

const InnerStack = createStackNavigator();
const Stack = createStackNavigator();

export default function NoticesStack() {
  
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint,
    headerTintColor: "white",
  }

  return (
    <InnerStack.Navigator>
      
      <Stack.Screen component={NoticesScreen} name="MyNotices" options={{
          title: "Your notices",
          headerStyle: styles.header,
          headerTintColor: "white",
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: true,
        }} />
      
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Notice", ...headerOptions }} />
      <InnerStack.Screen name="Create" component={CreateScreen}/>
      <InnerStack.Screen name="Details" component={DetailsScreen} options={{ title: "Details", ...headerOptions }} />
      <InnerStack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Cat Details", ...headerOptions }} /> 
    </InnerStack.Navigator>
   
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.yellow,
  }
})