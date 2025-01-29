import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Alert, View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import React, { useState } from 'react';

WebBrowser.maybeCompleteAuthSession();
type Props = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false)
  const auth = getAuth();

  const createAccount = (email: string, password: string, username: string) => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return null;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        })
        .then(() => {
          Alert.alert('Account Created');
          navigation.navigate('Home');
        })
        .catch((error) => {
          Alert.alert('Profile Update Failed', error.message);
        })
        .finally(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        Alert.alert('Account Creation Failed', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* Campo de Nombre de Usuario */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      {/* Campo de Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      {/* Campo de Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {/* Campo para Confirmar la Contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />

      <Button 
        title="Create Account" 
        onPress={() => {
          createAccount(email, password, username);
        }} 
      />
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

export default CreateAccountScreen;
