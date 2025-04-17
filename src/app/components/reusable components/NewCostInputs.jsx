import { View } from "react-native";
import { IconButton, TextInput, useTheme } from "react-native-paper";

const NewCostInputs = ({
  costEntryName,
  setCostEntryName,
  costEntrySum,
  setCostEntrySum,
  newCostTextInputIsVisible,
  setNewCostTextInputIsVisible,
  handleSubmitCost,
  handleCancelNewCost,
}) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <TextInput
        mode="outlined"
        label="Name"
        delete
        value={costEntryName}
        onChangeText={setCostEntryName}
        style={{ width: "40%" }}
      />
      {newCostTextInputIsVisible && (
        <IconButton
          icon="close-box"
          iconColor={theme.colors.red}
          size={35}
          onPress={handleCancelNewCost}
          style={{ paddingTop: 10 }}
        />
      )}
      <TextInput
        mode="outlined"
        label="Betrag"
        value={costEntrySum}
        onChangeText={setCostEntrySum}
        onSubmitEditing={handleSubmitCost}
        style={{ width: "40%" }}
        returnKeyType="send"
      />
    </View>
  );
};

export default NewCostInputs;
