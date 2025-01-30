import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { View, Button, StyleSheet } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;

const StartScreen: React.FC<Props> = ({ navigation }) => {
    return (
    <View style={styles.container}>
        <Button title="Start" onPress={() => navigation.replace('Login')} 
            />
     </View>  
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  }
});

export default StartScreen