import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";

const CustomIconButtonWithState = ({ id }) => {
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();
  const assets = useAssetsStore((state) => state.allAssets);

  const handleEditCurrentCard = () => {
    const cardIdBollean = assets.some((asset) => asset.id === id);

    if (cardIdBollean) {
      setIsEdit(!isEdit);
    }
  };

  return (
    <IconButton
      icon={() => (
        <MaterialIcons name={!isEdit ? "edit" : "check"} size={24} color={theme.colors.textColor} />
      )}
      size={30}
      onPress={handleEditCurrentCard}
      style={{
        position: "absolute",
        top: -5,
        right: 0,
        zIndex: 100,
      }}
    />
  );
};

export default CustomIconButtonWithState;
