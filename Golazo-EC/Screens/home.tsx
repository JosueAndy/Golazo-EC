import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Asegúrate de ajustar la ruta si es necesario
import { getAuth, signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth();
  const [userInfo, setUserInfo] = React.useState<{ email: string | null; picture?: string; email_verified?: boolean; name?: string } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await AsyncStorage.getItem('@user');
        if (data) {
          setUserInfo(JSON.parse(data));
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      // Sign out from Firebase
      await signOut(auth);

      // Sign out from Google
      // await GoogleSignin.signOut();

      // Clear local storage
      await AsyncStorage.removeItem('@user');
      setUserInfo(null);

      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.replace('Login'); // Redirigir al usuario a la pantalla de Login
    } catch (error) {
      Alert.alert('Logout Failed', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button title="Log Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default HomeScreen;
