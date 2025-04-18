import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Text, useTheme } from "react-native-paper";
import useCounterStore, { useTextStore } from "../../zustand/store";
import CustomIconBtnWithText from "../reusable components/CustomIconBtnWithText";
import { useState } from "react";
import AssetDataItem from "../reusable components/AssetDataItem";

function PortfolioScreen() {
  const { text, setText } = useTextStore();
  const theme = useTheme();
  const [selectedYear, setSelectedYear] = useState("2025");
  const years = ["2023", "2024", "2025"];

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
        colors={["rgba(79, 196, 141, 0.58)", "rgba(49, 185, 155, 0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: "25%",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 10 }}>Portfolio</Text>
        <Text variant="headlineLarge" style={{ color: "white", fontWeight: "bold" }}>
          25.000€
        </Text>
      </LinearGradient>
      <View
        style={{
          position: "absolute",
          width: "70%",
          top: 190,
          backgroundColor: theme.colors.elevation.level1,
          elevation: 5,
          flexDirection: "row",
          borderRadius: 10,
          padding: 2,
          gap: 20,
        }}
      >
        <Picker
          selectedValue={selectedYear}
          onValueChange={(itemValue) => setSelectedYear(itemValue)} // Simplified, itemIndex not needed
          mode="dropdown"
          style={{
            color: theme.colors.textColor,
            width: "100%",
            marginHorizontal: "auto",
          }}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={String(year)} value={year} />
          ))}
        </Picker>
      </View>

      <ScrollView
        style={{ width: "100%", marginTop: 30 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        fadingEdgeLength={30}
      >
        <View style={{ marginTop: 60, width: "90%", marginHorizontal: "auto", gap: 50 }}>
          <Card>
            <Card.Title title="29.07.2024" titleStyle={{ color: theme.colors.primary }} />
            <Card.Content>
              <AssetData />
              <TotalAssets />
            </Card.Content>
          </Card>

          <Card>
            <Card.Title title="29.07.2024" titleStyle={{ color: theme.colors.primary }} />
            <Card.Content>
              <AssetData />
              <TotalAssets />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const TotalAssets = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: theme.colors.secondary,
        borderRadius: 10,
        justifyContent: "space-between",
      }}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
        Gesamt
      </Text>
      <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
        37.432
      </Text>
    </View>
  );
};

const AssetData = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    screenContainer: {
      padding: 10,
      gap: 10,
      backgroundColor: theme.colors.elevation.level5,
      borderRadius: 10,
      marginBottom: 20,
    },
  });

  return (
    <>
      <View style={styles.screenContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          Allgemeines Vermögen
        </Text>
        <AssetDataItem label="Investiert" value="25.000€" />
        <AssetDataItem label="Cash Trade Republic" value="4000€" />
        <AssetDataItem label="C24 Tagesgeld" value="1714€" />
        <AssetDataItem label="Cash" value="3000€" />
      </View>
      <View style={styles.screenContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          Aktien Daten
        </Text>
        <AssetDataItem label="S&P 500" value="570.30€" />
        <AssetDataItem label="Bitcoin" value="98.148€" />
        <AssetDataItem label="XRP" value="2.87€" />
      </View>
    </>
  );
};

export default PortfolioScreen;
