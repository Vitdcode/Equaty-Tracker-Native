import { View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import useCounterStore, { useTextStore } from "../../zustand/store";
import LinearGradient from "react-native-linear-gradient";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomIconBtnWithText from "../reusable components/CustomIconBtnWithText";

function HomeScreen() {
  const { count, increment, decrement } = useCounterStore();
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
        colors={["#6e8efb", "#a777e3"]}
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
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 60 }}> Current Balance</Text>
        <Text variant="titleLarge" style={{ color: "white", fontWeight: "bold" }}>
          $25.000
        </Text>
      </LinearGradient>
      <View
        style={{
          position: "absolute",
          top: 200,
          backgroundColor: theme.colors.background,
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
          text={"Add Entry"}
        />
        <CustomIconBtnWithText
          onPress={() => setText("Goal")}
          icon={() => <MaterialCommunityIcons name="bullseye" size={24} color="white" />}
          text={"Goal"}
        />

        <CustomIconBtnWithText
          onPress={() => setText("History")}
          icon={() => <MaterialCommunityIcons name="history" size={24} color="white" />}
          text={"History"}
        />
      </View>
      <Text style={{ marginTop: 80 }}>{text}</Text>
    </View>
  );
}

export default HomeScreen;
