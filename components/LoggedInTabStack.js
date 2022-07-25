import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscoverStack from '../components/DiscoverStack';
import ProfileStack from '../components/ProfileStack';
import NoticesStack from '../components/NoticesStack';

import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function LoggedInStack() {
  //const isDark = useSelector((state) => state.accountPrefs.isDark);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Notices') {
            iconName = "comments"
          } else if (route.name === 'Profile') {
            iconName = "user"
          }
          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#3F5362',
        inactiveTintColor: '#C7B6A6',
        // tabStyle: {
        //   backgroundColor: isDark ? "#181818" : "white",
        // }
      }}
      >
        {/* <Tab.Screen name="Discover" component={DiscoverStack} /> */}
        <Tab.Screen name="Notices" component={NoticesStack} />
        {/*<Tab.Screen name="Favourite" component={FavouriteStack} /> */}
        <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  )
}