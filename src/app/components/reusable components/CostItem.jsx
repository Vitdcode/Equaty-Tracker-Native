import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

const CostItem = ({ name, value }) => {
  const num =
    typeof value != "number" && value?.includes(",")
      ? parseFloat(value.replace(",", "."))
      : parseFloat(value);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
      <Text variant="titleLarge">{name}</Text>
      <Text variant="titleLarge">{num.toFixed(2)}€</Text>
    </View>
  );
};

export const CostItemTextInput = ({ index, name, value, editFixedItem }) => {
  const [nameInput, setNameInput] = useState(name);
  const [costInput, setCostInput] = useState(value);

  const handleInputChange = (name, val) => {
    name === "name" ? setNameInput(val) : setCostInput(val);
    editFixedItem(index, name, val);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
      <TextInput
        mode="outlined"
        label="Name"
        value={nameInput}
        onChangeText={(val) => handleInputChange("name", val)}
        style={{ width: "40%" }}
      />
      <TextInput
        mode="outlined"
        label="Betrag"
        value={costInput}
        onChangeText={(val) => handleInputChange("cost", val)}
        style={{ width: "40%" }}
      />
    </View>
  );
};

export default CostItem;
