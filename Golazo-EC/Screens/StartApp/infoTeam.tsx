import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, Button, StyleSheet } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "InfoTeam">;

const InfoTeamScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Continue" onPress={() => navigation.navigate("Home")} />
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

export default InfoTeamScreen;
