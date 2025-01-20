import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import './gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/login';
import HomeScreen from './Screens/home';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
