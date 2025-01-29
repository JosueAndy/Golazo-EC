import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/login';
import HomeScreen from './Screens/home';
import CreateAccountScreen from './Screens/createAccount';
import StartScreen from './Screens/start';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined; 
  CreateAccount: undefined;
  Start: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerShown: false
          }}
          />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerShown: false
          }} 
        />
        <Stack.Screen
          name='CreateAccount'
          component={CreateAccountScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
