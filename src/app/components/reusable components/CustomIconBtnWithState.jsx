import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { IconButton, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";

const CustomIconButtonWithState = ({ id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();
  const assets = useAssetsStore((state) => state.allAssets);
  const setPortfolioCardIsEdit = useAssetsStore((state) => state.setPortfolioCardIsEdit);
  const setPortfolioCardId = useAssetsStore((state) => state.setPortfolioCardId);

  const handleEditCurrentCard = () => {
    const cardIdBollean = assets.some((asset) => asset.id === id);

    if (cardIdBollean) {
      setIsEdit(!isEdit);
      setPortfolioCardIsEdit();
      setPortfolioCardId(id);
    }
  };

  return (
    <IconButton
      icon={() => (
        <MaterialIcons name={!isEdit ? "edit" : "check"} size={24} color={theme.colors.textColor} />
      )}
      size={30}
      onPress={handleEditCurrentCard}
    />
  );
};

export default CustomIconButtonWithState;
