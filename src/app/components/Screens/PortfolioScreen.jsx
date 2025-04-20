import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";
import AssetDataItem from "../reusable components/AssetDataItem";
import CustomIconButtonWithState from "../reusable components/CustomIconBtnWithState";

function PortfolioScreen() {
  const theme = useTheme();
  const [selectedYear, setSelectedYear] = useState("2025");
  const years = ["2023", "2024", "2025"];
  const newPortfolioCardIsEdit = useAssetsStore((state) => state.newPortfolioCardIsEdit);
  const setNewPortfolioCardIsEdit = useAssetsStore((state) => state.setNewPortfolioCardIsEdit);

  const assets = useAssetsStore((state) => state.allAssets);
  const setNewAssetsData = useAssetsStore((state) => state.setNewAsset);

  const handleSetNewAssetsCard = () => {
    setNewPortfolioCardIsEdit();
    if (!newPortfolioCardIsEdit) {
      setNewAssetsData();
    }
  };

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
          /*         justifyContent: "center", */
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 58 }}>Portfolio</Text>
        <Text variant="headlineLarge" style={{ color: "white", fontWeight: "bold" }}>
          25.000€
        </Text>
      </LinearGradient>
      <View
        style={{
          position: "absolute",
          width: "70%",
          top: 130,
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
      <IconButton
        icon={!newPortfolioCardIsEdit ? "plus" : "check"}
        iconColor={theme.colors.textColor}
        size={40}
        onPress={handleSetNewAssetsCard}
        style={{
          backgroundColor: theme.colors.secondary,
          borderRadius: 50,
          position: "absolute",
          top: 190,
        }}
      />

      <ScrollView
        style={{ width: "100%", marginTop: 30 }}
        contentContainerStyle={{ paddingBottom: 60 }}
        fadingEdgeLength={30}
      >
        <View style={{ marginTop: 60, width: "90%", marginHorizontal: "auto", gap: 50 }}>
          {assets
            .slice()
            .reverse()
            .map(
              (assetData, index) =>
                assetData.date.includes(selectedYear) && (
                  <Card key={index}>
                    <View>
                      <Card.Title
                        title={assetData.date}
                        titleStyle={{ color: theme.colors.primary }}
                      />
                      <CustomIconButtonWithState id={assetData.id} />
                    </View>

                    <Card.Content>
                      {assetData.date.includes(selectedYear) && (
                        <View key={assetData.id} style={{ gap: 10 }}>
                          <AssetData assetData={assetData} id={assetData.id} />
                          <TotalAssets assetData={assetData} />
                        </View>
                      )}
                    </Card.Content>
                  </Card>
                )
            )}
        </View>
      </ScrollView>
    </View>
  );
}

const AssetData = ({ assetData, id }) => {
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
        {Object.entries(assetData["generalAssets"]).map(([label, value]) => (
          <AssetDataItem key={label} label={label} value={value} id={id} />
        ))}
      </View>
      <View style={styles.screenContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          Aktien Daten
        </Text>
        {Object.entries(assetData["stockData"]).map(([label, value]) => (
          <AssetDataItem key={label} label={label} value={value} id={id} objName="stockData" />
        ))}
      </View>
    </>
  );
};

const TotalAssets = ({ assetData }) => {
  const theme = useTheme();

  const sum = Object.values(assetData["generalAssets"]).reduce((acc, num) => {
    return (acc += parseFloat(num));
  }, 0);

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
        {`${sum}€`}
      </Text>
    </View>
  );
};

export default PortfolioScreen;
