import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";

const CustomIconButton = ({ icon, onPress }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        elevation: 5,
        backgroundColor: theme.colors.secondary,
        position: "absolute",
        top: 189,
        borderRadius: 50,
      }}
    >
      <IconButton icon={icon} iconColor={theme.colors.textColor} size={35} onPress={onPress} />
    </View>
  );
};

export default CustomIconButton;
