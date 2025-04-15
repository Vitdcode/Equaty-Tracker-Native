import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";

const CustomIconBtnWithText = ({ onPress, icon, text }) => {
  const theme = useTheme();
  return (
    <View style={{ alignItems: "center" }}>
      <IconButton
        onPress={onPress}
        icon={icon}
        style={{ backgroundColor: theme.colors.secondary }}
      />
      <Text>{text}</Text>
    </View>
  );
};

export default CustomIconBtnWithText;
