import { View } from "react-native";
import { useAssetsStore } from "../../zustand/store";
import { Text, useTheme } from "react-native-paper";
import { FontAwesome6, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

const DifferencePercentage = ({ index }) => {
  const theme = useTheme();
  const assets = useAssetsStore((state) => state.allAssets);

  const sumCurrent = Object?.values(assets.slice().reverse()[index]["generalAssets"])?.reduce(
    (acc, value) => {
      return (acc += parseFloat(value));
    },
    0
  );

  const previousIndexExists = assets.slice()?.reverse()[index + 1];

  const sumPrevious =
    previousIndexExists &&
    Object.values(assets.slice()?.reverse()[index + 1]["generalAssets"])?.reduce((acc, value) => {
      return (acc += parseFloat(value));
    }, 0);

  if (!sumCurrent || !sumPrevious) return;
  const changeInPercent = ((sumCurrent - sumPrevious) / sumPrevious) * 100;
  const changeAsNum = sumCurrent - sumPrevious;
  const changePositive = !changeInPercent.toString().includes("-");

  return (
    <View
      style={{
        backgroundColor: changePositive ? theme.colors.green : theme.colors.red,
        padding: 10,
        borderRadius: 12,
        justifyContent: "center",
        gap: 10,
        marginBlock: 20,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
          Änderung zu letztem Mal
        </Text>
      </View>

      <FontAwesome6
        name={changePositive ? "arrow-trend-up" : "arrow-trend-down"}
        size={24}
        color={theme.colors.primary}
        style={{
          position: "absolute",
          top: 5,
          right: 10,
          backgroundColor: theme.colors.semiTransparent,
          padding: 2,
          borderRadius: 8,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
          {changePositive ? `+${changeInPercent.toFixed(2)}` : changeInPercent.toFixed(2)}%
        </Text>
        <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
          {changePositive ? `+${changeAsNum.toFixed(2)}` : changeAsNum.toFixed(2)}€
        </Text>
      </View>
    </View>
  );
};

export default DifferencePercentage;
