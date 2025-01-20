import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './Screens/login';
import HomeScreen from './Screens/home';

export type RootStackParamList = {
  Login: undefined; // No se esperan parámetros en la pantalla de Login
  Home: undefined;  // No se esperan parámetros en la pantalla de Home
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            headerShown: false, // Ocultar encabezado para Login
          }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Home', // Título para la pantalla Home
            headerStyle: {
              backgroundColor: '#6200ee', // Color del encabezado
            },
            headerTintColor: '#fff', // Color del texto del encabezado
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
