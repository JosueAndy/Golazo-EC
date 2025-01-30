import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import React, { useEffect } from "react";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
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
  const handleLogout = async () => {
    try {
      await signOut(auth);

      if (await GoogleSignin.getCurrentUser()) {
        await GoogleSignin.signOut();
      }

      await AsyncStorage.removeItem("@user");
      setUserInfo(null);

      Alert.alert("Logout Successful", "You have been logged out.");
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Logout Failed", (error as Error).message);
    }
  };
  return (
    <View style={styles.container}>
      <Button title="LogOut" onPress={handleLogout} />
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

export default SettingsScreen;
