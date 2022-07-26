import React from 'react';
import { StyleSheet, Text, View, st} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
//import IndexScreen from '../screens/IndexScreen';
import CreateScreen from '../screens/CreateScreen';
import NoticesScreen from '../screens/NoticesScreen';
// import EditScreen from '../screens/EditScreen';
// import ShowScreen from '../screens/DetailsScreen';

const InnerStack = createStackNavigator();
const Stack = createStackNavigator();

export default function NoticesStack() {
  
  const headerOptions = {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerTintColor: styles.headerTint
  }

  return (
    <InnerStack.Navigator>
      <Stack.Screen component={NoticesScreen} name="MyNotices" options={{
          title: "Your notices",
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle, headerLeft: null,
          headerShown: true,
        }} />
      
      {/* <InnerStack.Screen name="Index" component={IndexScreen} options={{ title: "Reviews", ...headerOptions, headerLeft: null }} /> */}
      <InnerStack.Screen name="Add" component={CreateScreen} options={{ title: "Add Review", ...headerOptions }} />
      <InnerStack.Screen name="Create" component={CreateScreen}/>
      {/* <InnerStack.Screen name="Details" component={ShowScreen} options={headerOptions} /> */}
      {/* <InnerStack.Screen name="Edit" component={EditScreen} options={{ title: "Edit Review", ...headerOptions }} /> */}
    </InnerStack.Navigator>
   
  )
}

const styles = StyleSheet.create({})