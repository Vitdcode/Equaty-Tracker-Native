import { StyleSheet, View } from "react-native";
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

  const styles = StyleSheet.create({
    textStyle: {
      color: theme.colors.textColor,
      backgroundColor: "white",
      padding: 5,
      borderRadius: 5,
      color: changePositive ? "green" : theme.colors.red,
    },
    iconStyle: {
      position: "absolute",
      top: -100,
      right: 170,
      backgroundColor: theme.colors.elevation.level1,
      padding: 7,
      borderRadius: 50,
      elevation: 5,
    },
  });

  return (
    <View
      style={{
        backgroundColor: changePositive ? theme.colors.green : theme.colors.red,
        padding: 15,
        borderRadius: 12,
        justifyContent: "center",
        gap: 10,
        marginBlock: 20,
        elevation: 3,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 10 }}>
        <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
          Änderung zu letztem Mal
        </Text>
      </View>

      <FontAwesome6
        name={changePositive ? "arrow-trend-up" : "arrow-trend-down"}
        size={24}
        color={changePositive ? theme.colors.green : theme.colors.red}
        style={styles.iconStyle}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant="titleMedium" style={styles.textStyle}>
          {changePositive ? `+${changeInPercent.toFixed(2)}` : changeInPercent.toFixed(2)}%
        </Text>
        <Text variant="titleMedium" style={styles.textStyle}>
          {changePositive ? `+${changeAsNum.toFixed(2)}` : changeAsNum.toFixed(2)}€
        </Text>
      </View>
    </View>
  );
};

export default DifferencePercentage;
