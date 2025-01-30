import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./Screens/Login-SignIn/login";
import HomeScreen from "./Screens/Home/home";
import CreateAccountScreen from "./Screens/Login-SignIn/createAccount";
import StartScreen from "./Screens/Login-SignIn/start";
import SelectTeamScreen from "./Screens/StartApp/SelectTeam";
import InfoTeamScreen from "./Screens/StartApp/infoTeam";
import ProfileScreen from "./Screens/Profile/profile";
import SettingsScreen from "./Screens/Settings/settings";
import SavesScreen from "./Screens/Profile/saves";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GamesScreen from "./Screens/Games/games";
import SocialScreen from "./Screens/Social/social";
import { Button, TouchableOpacity, Text } from "react-native";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  CreateAccount: undefined;
  Start: undefined;
  SelectTeam: undefined;
  InfoTeam: undefined;
  Profile: undefined;
  Settings: undefined;
  Saves: undefined;
  Games: undefined;
  Social: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} 
      options={({ navigation }) => ({
        headerTitle: 'Home',
        headerBackVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={{ color: '#000', marginRight: 10 }}>Settings</Text>
          </TouchableOpacity>
        ),
      })}
        />
      <Tab.Screen name="Games" component={GamesScreen} 
      options={({ navigation }) => ({
        headerTitle: 'Home',
        headerBackVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={{ color: '#000', marginRight: 10 }}>Settings</Text>
          </TouchableOpacity>
        ),
      })}
      />
      <Tab.Screen name="Social" component={SocialScreen} 
      options={({ navigation }) => ({
        headerTitle: 'Home',
        headerBackVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={{ color: '#000', marginRight: 10 }}>Settings</Text>
          </TouchableOpacity>
        ),
      })}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        headerShown: false,
      }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={HomeTabs}
        options={{
          headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccountScreen}
        />
        <Stack.Screen
          name="SelectTeam"
          component={SelectTeamScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="InfoTeam" component={InfoTeamScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Saves" component={SavesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
