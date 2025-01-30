import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase-config";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
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
  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.card}>
          {userInfo.picture && (
            <Image
              source={{ uri: userInfo.picture }}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.text}>Welcome {userInfo.name || "User"}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>
      )}
      <Button title="Saves" onPress={() => navigation.navigate('Saves')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
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

export default ProfileScreen;
