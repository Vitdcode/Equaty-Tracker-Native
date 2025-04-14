import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const BudgetScreen = () => {
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
        colors={["#5F0A87", "#A4508B"]}
        start={{ x: 0, y: 0 }} // Top-left
        end={{ x: 1, y: 1 }} // Bottom-right (135deg direction)
        style={{
          height: "30%",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 60 }}>Verdienst</Text>
        <Text variant="titleLarge" style={{ color: "white", fontWeight: "bold" }}>
          2700€
        </Text>
      </LinearGradient>
    </View>
  );
};

export default BudgetScreen;
