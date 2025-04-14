import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

const CustomIconBtnWithText = ({ onPress, icon, text }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <IconButton onPress={onPress} icon={icon} style={{ backgroundColor: "rgb(148, 101, 255)" }} />
      <Text>{text}</Text>
    </View>
  );
};

export default CustomIconBtnWithText;
