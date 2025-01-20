// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to the Home Screen!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;
// --------------------------------------------------------------------------------------
// import React from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { NavigationProp } from '@react-navigation/native';
// import { auth } from '../firebase-config';

// const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
//   const handleLogout = async () => {
//     try {
//       await auth.signOut(); // Cerrar sesión con Firebase
//       Alert.alert('Logout Successful', 'You have been logged out.');
//       navigation.navigate('Login'); // Redirigir al usuario a la pantalla de Login
//     } catch (error) {
//       Alert.alert('Logout Failed', (error as Error).message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to the Home Screen!</Text>
//       <Button title="Log Out" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;

import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Asegúrate de ajustar la ruta si es necesario
import { getAuth, signOut } from 'firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cerrar sesión con Firebase
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
});

export default HomeScreen;
