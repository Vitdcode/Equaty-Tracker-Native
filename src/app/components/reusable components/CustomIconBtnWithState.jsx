import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { IconButton, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";
import { View } from "react-native";
import updateData from "../../../backend/updateData";

const CustomIconButtonWithState = ({ id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();
  const assets = useAssetsStore((state) => state.allAssets);
  const setPortfolioCardIsEdit = useAssetsStore((state) => state.setPortfolioCardIsEdit);
  const setPortfolioCardId = useAssetsStore((state) => state.setPortfolioCardId);
  const deleteCard = useAssetsStore((state) => state.deleteCard);
  const newPortfolioCardIsEdit = useAssetsStore((state) => state.newPortfolioCardIsEdit);

  const handleEditCurrentCard = () => {
    const cardIdBollean = assets.some((asset) => asset.id === id);

    if (cardIdBollean) {
      setIsEdit(!isEdit);
      setPortfolioCardIsEdit();
      setPortfolioCardId(id);
    }

    updateData.updateAssets(assets);
  };

  const handleDeleteCard = () => {
    deleteCard(id);
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
      {isEdit && (
        <IconButton
          icon={"delete"}
          iconColor={theme.colors.gray}
          size={30}
          onPress={handleDeleteCard}
          style={{
            width: "20%",
          }}
        />
      )}
      {!newPortfolioCardIsEdit && (
        <IconButton
          icon={() => (
            <MaterialIcons
              name={!isEdit ? "edit" : "check"}
              size={28}
              color={theme.colors.textColor}
            />
          )}
          size={28}
          onPress={handleEditCurrentCard}
        />
      )}
    </View>
  );
};

export default CustomIconButtonWithState;
