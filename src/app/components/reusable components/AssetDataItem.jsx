import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";
import { useEffect, useState } from "react";

const AssetDataItem = ({ label, value, id, objName = "generalAssets" }) => {
  const newPortfolioCardIsEdit = useAssetsStore((state) => state.newPortfolioCardIsEdit);
  const [valueState, setValueState] = useState(value);
  const assets = useAssetsStore((state) => state.allAssets);
  const editNewAssets = useAssetsStore((state) => state.editNewAssets);

  const addNewCardBoolean = newPortfolioCardIsEdit && assets[assets.length - 1].id === id;

  const handleInputChange = (val) => {
    setValueState(val);
    editNewAssets(label, val, id, objName);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        alignItems: "center",
      }}
    >
      {addNewCardBoolean ? (
        <>
          <Text variant="titleMedium">{label}</Text>
          <TextInput
            mode="outlined"
            label="Wert"
            value={valueState}
            onChangeText={(val) => handleInputChange(val)}
            style={{ width: "40%" }}
          />
        </>
      ) : (
        <>
          <Text variant="titleMedium">{label}</Text>
          <Text variant="titleMedium">{`${value}€`}</Text>
        </>
      )}
    </View>
  );
};

export default AssetDataItem;
