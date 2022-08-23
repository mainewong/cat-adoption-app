import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInSignUpScreen from './screens/SignInSignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoggedInTabStack from "./components/LoggedInTabStack";
import OnboardingScreen from './screens/OnboardingScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './constants/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null ) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, []);

  if( isFirstLaunch === null ) {
    return null;
  } else if ( isFirstLaunch === true ) {
    return (
      <NavigationContainer>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
      <Stack.Navigator>
        {/* <Stack.Screen component={LoggedInTabStack} name="Logged In" options={{ headerShown: false }} /> */}
        <Stack.Screen component={OnboardingScreen} name="Onboarding" options={{ headerShown: false }} />
        <Stack.Screen component={LoggedInTabStack} name="Logged In" options={{ headerShown: false }} />
        <Stack.Screen options={{ headerShown: false }} name="SignInSignUp" component={SignInSignUpScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#00BCD4" translucent = {true}/>
        <Stack.Navigator>
          
          <Stack.Screen component={LoggedInTabStack} name="Logged In" options={{ headerShown: false }} />
          <Stack.Screen options={{ headerShown: false }} name="SignInSignUp" component={SignInSignUpScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightbeige,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
