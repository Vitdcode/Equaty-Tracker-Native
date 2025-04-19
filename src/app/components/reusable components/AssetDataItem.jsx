import { View } from "react-native";
import { Text } from "react-native-paper";

const AssetDataItem = ({ label, value }) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
      <Text variant="titleMedium">{label}</Text>
      <Text variant="titleMedium">{`${value}€`}</Text>
    </View>
  );
};

export default AssetDataItem;
