import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import Home from './views/Home';
import Profile from './views/Profile';
import Details from './views/Details';
import NewReminder from './views/NewReminder';

const Stack = createNativeStackNavigator();

const customHeader = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#1E88F7',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={customHeader} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{...customHeader, title: 'Profile'}}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{...customHeader, title: 'Reminder Details'}}
        />
        <Stack.Screen
          name="NewReminder"
          component={NewReminder}
          options={{...customHeader, title: 'Add New Reminder'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
