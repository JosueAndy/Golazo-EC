import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, Text, StyleSheet } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, "Social">

const SocialScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <Text>Social</Text>
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

  export default SocialScreen