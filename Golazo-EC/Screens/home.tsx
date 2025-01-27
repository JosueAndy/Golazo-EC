import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Ajusta la ruta si es necesario
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth();
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<{
    email: string | null;
    picture?: string;
    email_verified?: boolean;
    name?: string;
  } | null>(null);

  useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user))
        console.log(JSON.stringify(user, null, 2));
        setUserInfo({
          picture: user.photoURL || '',
          email: user.email || '',
          email_verified: user.emailVerified,
          name: user.displayName || ''
        });
      } else {
        console.log('User is not authenticated');
      }
    });
    return () => unsub();
  }, []);

  const getLocalUser = async () => {
      try {
        setLoading(true)
        const data = await AsyncStorage.getItem('@user');
        if(!data) return null;
        return JSON.parse(data);
      }catch(e) {
        console.log(e, 'Error getting local user')
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Obtener datos almacenados en AsyncStorage
        const data = await AsyncStorage.getItem('@user');
        if (data) {
          setUserInfo(JSON.parse(data));
        } else {
          console.log('No user data found in AsyncStorage.');
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      // Cerrar sesión de Firebase
      await signOut(auth);

      // Cerrar sesión de Google
      if (await GoogleSignin.getCurrentUser()) {
        await GoogleSignin.signOut();
      }

      // Limpiar almacenamiento local
      await AsyncStorage.removeItem('@user');
      setUserInfo(null);

      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.replace('Login'); // Redirigir a la pantalla de inicio de sesión
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', (error as Error).message);
    }
  };

  if (loading) return <View style={{ flex:1, alignItems: 'center', justifyContent:'center'}} >
    <ActivityIndicator size={"large"} />
  </View>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      {userInfo && (
        <View style={styles.card}>
          {userInfo.picture && (
            <Image
              source={{ uri: userInfo.picture }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.text}>Welcome {userInfo.name || 'User'}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
          {userInfo.email_verified && (
            <Text style={styles.text}>Email Verified</Text>
          )}
        </View>
      )}
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
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default HomeScreen;

