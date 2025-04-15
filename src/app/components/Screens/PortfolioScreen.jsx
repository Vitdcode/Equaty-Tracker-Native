import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text, useTheme } from "react-native-paper";
import useCounterStore, { useTextStore } from "../../zustand/store";
import CustomIconBtnWithText from "../reusable components/CustomIconBtnWithText";

function PortfolioScreen() {
  const { text, setText } = useTextStore();
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <LinearGradient
        colors={["rgb(144, 98, 250)", "rgb(141, 95, 247)"]}
        start={{ x: 0, y: 0 }} // Top-left
        end={{ x: 1, y: 1 }} // Bottom-right (135deg direction)
        style={{
          height: "25%",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 50 }}>Portfolio</Text>
        <Text variant="headlineMedium" style={{ color: "white", fontWeight: "bold" }}>
          25.000€
        </Text>
      </LinearGradient>
      <View
        style={{
          position: "absolute",
          top: 170,
          backgroundColor: theme.colors.elevation.level1,
          elevation: 5,
          flexDirection: "row",
          borderRadius: 10,
          padding: 10,
          gap: 20,
        }}
      >
        <CustomIconBtnWithText
          onPress={() => setText("Add Entry")}
          icon={() => <MaterialCommunityIcons name="plus" size={24} color="white" />}
          text={"Neuer Eintrag"}
        />
        <CustomIconBtnWithText
          onPress={() => setText("Goal")}
          icon={() => <MaterialCommunityIcons name="bullseye" size={24} color="white" />}
          text={"Ziel"}
        />

        <CustomIconBtnWithText
          onPress={() => setText("History")}
          icon={() => <MaterialCommunityIcons name="history" size={24} color="white" />}
          text={"Verlauf"}
        />
      </View>
      <Text style={{ marginTop: 80 }}>{text}</Text>
    </View>
  );
}

export default PortfolioScreen;
