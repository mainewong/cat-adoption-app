import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInSignUpScreen from './screens/SignInSignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoggedInTabStack from "./components/LoggedInTabStack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="SignInSignUp" component={SignInSignUpScreen} />
        <Stack.Screen component={LoggedInTabStack} name="Logged In" options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
