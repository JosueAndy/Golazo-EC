import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, Button, StyleSheet, Alert, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

type Props = NativeStackScreenProps<RootStackParamList, "SelectTeam">;

const SelectTeamScreen: React.FC<Props> = ({ navigation }) => {
  
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Salir', '¿Quieres regresar al login?', [
          { text: 'No', style: 'cancel' },
          { text: 'Sí', onPress: async () => { await handleLogout() }},
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove();
    }, [])
  );

  const handleLogout = async () => {
    try {
      // Cerrar sesión de Firebase
      await signOut(auth);

      // Cerrar sesión de Google
      if (await GoogleSignin.getCurrentUser()) {
        await GoogleSignin.signOut();
      }

      await AsyncStorage.removeItem("@user");

      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", (error as Error).message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Button
        title="Select Team"
        onPress={() => navigation.navigate("InfoTeam")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default SelectTeamScreen;
