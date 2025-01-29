import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { googleAuthConfig } from '../config';


WebBrowser.maybeCompleteAuthSession();
type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [request, response, PromptAsync] = Google.useAuthRequest({
    webClientId: googleAuthConfig.webClientId,
    androidClientId: googleAuthConfig.androidClientId
  });
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount')
  };

  const handleSignIn = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login Success', `Welcome ${user.email}`);
        navigation.replace('Home');
      })
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      })
      .finally(() => {
        setLoading(false)
      });
  };

  useEffect(() => {
    if (response?.type == "success"){
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      setLoading(true);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Home');
      })
      .catch((error) =>{
        Alert.alert('Login Failed', error.message)
      })
      .finally(() => {
        setLoading(false);
      });
    }
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
      <Button title="Log in Google" onPress={async () => { await PromptAsync() }} />
      {loading && <ActivityIndicator size={"large"} color="#0000ff" />}
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


