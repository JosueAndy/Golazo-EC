import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   const handleLogout = () => {
//     navigation.navigate('Login');
//   };
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      {/* <Button title="Log Out" onPress={handleLogout} /> */}
    </View>
  );
}
// };

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
