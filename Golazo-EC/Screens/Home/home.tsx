import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App"; // Ajusta la ruta si es necesario
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { useFocusEffect } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const auth = getAuth();
  const [loading, setLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<{
    email: string | null;
    picture?: string;
    email_verified?: boolean;
    name?: string;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Salir', '¿Quieres cerrar la aplicación?', [
          { text: 'No', style: 'cancel' },
          { text: 'Sí', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove();
    }, [])
  );
    
  useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        console.log(JSON.stringify(user, null, 2));
        setUserInfo({
          picture: user.photoURL || "",
          email: user.email || "",
          email_verified: user.emailVerified,
          name: user.displayName || "",
        });
      } else {
        console.log("User is not authenticated");
      }
    });
    return () => unsub();
  }, []);

  const getLocalUser = async () => {
    try {
      const data = await AsyncStorage.getItem("@user");
      if (!data) return null;
      return JSON.parse(data);
    } catch (e) {
      console.log(e, "Error getting local user");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await AsyncStorage.getItem("@user");
        if (data) {
          setUserInfo(JSON.parse(data));
        } else {
          console.log("No user data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);


  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    alignItems: "center",
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

