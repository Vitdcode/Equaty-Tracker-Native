import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";

const AssetDataItem = ({ label, value, id, objName = "generalAssets" }) => {
  const newPortfolioCardIsEdit = useAssetsStore((state) => state.newPortfolioCardIsEdit);
  const assets = useAssetsStore((state) => state.allAssets);
  const editNewAssets = useAssetsStore((state) => state.editNewAssets);
  const portfolioCardIsEdit = useAssetsStore((state) => state.portfolioCardIsEdit);
  const portFolioCardId = useAssetsStore((state) => state.portFolioCardId);

  const addNewCardBoolean = newPortfolioCardIsEdit && assets[assets.length - 1].id === id;
  const editCardBoolean = portfolioCardIsEdit && portFolioCardId === id;

  const handleInputChange = (val) => {
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
      {addNewCardBoolean || editCardBoolean ? (
        <>
          <Text variant="titleMedium">{label}</Text>
          <TextInput
            mode="outlined"
            label="Wert"
            value={value?.toString() || ""}
            onChangeText={handleInputChange}
            style={{ width: "40%" }}
            keyboardType="numeric"
          />
        </>
      ) : (
        <>
          <Text variant="titleMedium">{label}</Text>
          <Text variant="titleMedium">{Number(value).toLocaleString("de-DE")}€</Text>
        </>
      )}
    </View>
  );
};

export default AssetDataItem;
