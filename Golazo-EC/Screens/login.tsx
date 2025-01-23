import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Asegúrate de ajustar la ruta si es necesario
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

type UserInfo = {
  email: string;
  email_verified: boolean;
  name: string;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
  const [request, response, promptAsyn] = Google.useAuthRequest({
    webClientId: '523537409192-qsdp95lcn7nblht5a3iqas7gisr2ivpq.apps.googleusercontent.com',
    androidClientId:'523537409192-9kt6g6lsml82n20radf5npi04a4u4rqq.apps.googleusercontent.com'
  });
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Account Created', `Welcome ${user.email}`);
      })
      .catch((error) => {
        Alert.alert('Account Creation Failed', error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login Success', `Welcome ${user.email}`);
        navigation.replace('Home'); // Navegar a la pantalla HomeTabs después del login
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  // Incio google
  // web: 523537409192-qsdp95lcn7nblht5a3iqas7gisr2ivpq.apps.googleusercontent.com
  // android: 523537409192-9kt6g6lsml82n20radf5npi04a4u4rqq.apps.googleusercontent.com

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response])

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if(!user) {
      if (response?.type === 'success') {
        if (response.authentication) {
          getUserInfo(response.authentication.accessToken);
          navigation.replace('Home');
        }
      }
    }else{  
      setUserInfo(user);
    }
  }
  

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem('@user');
    if(!data) return null;
    return JSON.parse(data);
  }

  const getUserInfo = async (accessToken: string) => {
    if(!accessToken) return;
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const userInfo = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(userInfo));
      setUserInfo(userInfo);
    } catch (error) {
      console.error(error);
    }
  }
      
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleSignIn} />
      <Button title="Create Account" onPress={handleCreateAccount} />
      <Button title="Login with Google"  disabled={!request} onPress={() => {promptAsyn(); }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
