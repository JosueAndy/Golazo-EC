import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, Text, StyleSheet } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Saves">;

const SavesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Partidos y resultados guardados</Text>
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
  text: {
    fontSize: 16,
  },
});

export default SavesScreen;
