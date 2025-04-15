import { View } from "react-native";
import { Text } from "react-native-paper";

const FixCostItem = ({ title, value }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="titleLarge">{value}</Text>
    </View>
  );
};

export default FixCostItem;
