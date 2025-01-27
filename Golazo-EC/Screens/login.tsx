import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Asegúrate de ajustar la ruta si es necesario
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// type UserInfo = {
//   picture: string;
//   email: string;
//   email_verified: boolean;
//   name: string;
// };


const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
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
        navigation.replace('Home');
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  useEffect(() => {
    if (response?.type == "success"){
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    };
  }, [response]);

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
      <Button title="Log in Google" onPress={async () => { await promptAsyn(); navigation.navigate('Home'); }} />
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
  card: {
    alignItems: 'center',
    marginTop: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default LoginScreen;
