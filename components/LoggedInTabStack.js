import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverStack from '../components/DiscoverStack';
import NoticesStack from '../components/NoticesStack';
import FavouriteStack from '../components/FavouriteStack';
import ProfileStack from '../components/ProfileStack';

import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  //const isDark = useSelector((state) => state.accountPrefs.isDark);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Discover') {
            iconName = "paw" 
          } else if (route.name === 'My Notices') {
            iconName = "newspaper-o"
          } else if (route.name === 'Favourite') {
            iconName = "heart"
          } else if (route.name === 'Profile') {
            iconName = "user"
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBaractiveTintColor: '#3F5362',
        tabBarinactiveTintColor: '#C7B6A6',
      })}
      // screenOptions={{
      //   tabBaractiveTintColor: '#3F5362',
      //   tabBarinactiveTintColor: '#C7B6A6',
        // tabStyle: {
        //   backgroundColor: isDark ? "#181818" : "white",
        // }
      
      >
        <Tab.Screen name="Discover" component={DiscoverStack} />
        <Tab.Screen name="My Notices" component={NoticesStack} options= {{headerShown: false }}/>
        <Tab.Screen name="Favourite" component={FavouriteStack} /> 
        <Tab.Screen name="Profile" component={ProfileStack} options= {{headerShown: false }} />
    </Tab.Navigator>
  )
}