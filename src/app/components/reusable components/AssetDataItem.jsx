import { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";

const AssetDataItem = ({ label, value, id, objName = "generalAssets" }) => {
  const newPortfolioCardIsEdit = useAssetsStore((state) => state.newPortfolioCardIsEdit);
  const assets = useAssetsStore((state) => state.allAssets);
  const editAssetValue = useAssetsStore((state) => state.editAssetValue);
  const editAssetName = useAssetsStore((state) => state.editAssetName);
  const portfolioCardIsEdit = useAssetsStore((state) => state.portfolioCardIsEdit);
  const portFolioCardId = useAssetsStore((state) => state.portFolioCardId);

  const addNewCardBoolean = newPortfolioCardIsEdit && assets[assets.length - 1].id === id;
  const editCardBoolean = portfolioCardIsEdit && portFolioCardId === id;
  const deleteEntry = useAssetsStore((state) => state.deleteEntry);
  const theme = useTheme();

  const handleInputChange = (label) => {
    editNewAssets(label, value, id, objName);
  };

  const handleDeleteEntry = () => {
    deleteEntry(id, objName, label);
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: 40,
          }}
        >
          <AssetNameInput
            label={label}
            value={value}
            id={id}
            objName={objName}
            editAssetName={editAssetName}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              mode="outlined"
              label="Wert"
              value={value?.toString() || ""}
              onChangeText={(val) => editAssetValue(label, val, id, objName)}
              style={{ width: "45%" }}
              keyboardType="numeric"
            />
            <IconButton
              icon={"delete"}
              iconColor={theme.colors.gray}
              size={30}
              onPress={handleDeleteEntry}
              style={{
                width: "20%",
              }}
            />
          </View>
        </View>
      ) : (
        <>
          <Text variant="titleMedium">{label}</Text>
          <Text variant="titleMedium">{Number(value).toLocaleString("de-DE")}€</Text>
        </>
      )}
    </View>
  );
};

const AssetNameInput = ({ label, value, id, objName, editAssetName }) => {
  const [localName, setLocalName] = useState(label);

  // Sync with external changes
  useEffect(() => {
    setLocalName(label);
  }, [label]);

  const handleSubmit = () => {
    if (localName !== label) {
      editAssetName(label, localName, value, id, objName);
    }
  };

  return (
    <TextInput
      mode="outlined"
      label="Name"
      value={localName}
      onChangeText={setLocalName}
      onBlur={handleSubmit}
      onSubmitEditing={handleSubmit}
      style={{ width: "45%" }}
    />
  );
};

export default AssetDataItem;
