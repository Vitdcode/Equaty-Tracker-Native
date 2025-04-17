import { View } from "react-native";
import { Text } from "react-native-paper";

const FixCostItem = ({ name, value }) => {
  const num =
    typeof value != "number" && value?.includes(",")
      ? parseFloat(value.replace(",", "."))
      : parseFloat(value);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text variant="titleLarge">{name}</Text>
      <Text variant="titleLarge">{num.toFixed(2)}€</Text>
    </View>
  );
};

export default FixCostItem;
