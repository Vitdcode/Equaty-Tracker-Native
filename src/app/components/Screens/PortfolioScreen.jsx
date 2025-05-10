import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";
import AssetDataItem from "../reusable components/AssetDataItem";
import CustomIconButtonWithState from "../reusable components/CustomIconBtnWithState";
import DifferencePercentage from "../reusable components/DifferencePercentage";
import getYears from "../../js-functions/availableYears";
import portfolioSum from "../../js-functions/portfolioSum";

function PortfolioScreen() {
  const theme = useTheme();
  const selectedYear = useAssetsStore((state) => state.selectedYear);
  const setSelectedYear = useAssetsStore((state) => state.setSelectedYear);

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

  const years = getYears();

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
        colors={[theme.colors.secondary, theme.colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: "25%",
          width: "100%",
          position: "relative",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 58 }}>Portfolio</Text>
        <Text variant="headlineLarge" style={{ color: "white", fontWeight: "bold" }}>
          {Number(portfolioSum(assets)).toLocaleString("de-DE")}€
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
          selectedValue={selectedYear.toString()}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
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
      <View
        style={{
          elevation: 5,
          backgroundColor: theme.colors.secondary,
          borderRadius: 50,
          position: "absolute",
          top: 195,
        }}
      >
        <IconButton
          icon={!newPortfolioCardIsEdit ? "plus" : "check"}
          iconColor={theme.colors.textColor}
          size={30}
          onPress={handleSetNewAssetsCard}
        />
      </View>

      <ScrollView
        style={{ width: "100%", marginTop: 35 }}
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 5,
                        padding: newPortfolioCardIsEdit ? 10 : 0,
                      }}
                    >
                      <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.primary, marginLeft: 15 }}
                      >
                        {assetData.date}
                      </Text>

                      <CustomIconButtonWithState id={assetData.id} />
                    </View>

                    <Card.Content>
                      <DifferencePercentage index={index} />
                      {assetData.date.includes(selectedYear) && (
                        <View key={assetData.id} style={{ gap: 10 }}>
                          <AssetData assetData={assetData} id={assetData.id} index={index} />
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

const AssetData = ({ assetData, id, index }) => {
  const theme = useTheme();
  const allAssets = useAssetsStore((state) => state.allAssets);
  const portfolioCardIsEdit = useAssetsStore((state) => state.portfolioCardIsEdit);
  const portFolioCardId = useAssetsStore((state) => state.portFolioCardId);
  const addNewEntry = useAssetsStore((state) => state.addNewEntry);

  const styles = StyleSheet.create({
    screenContainer: {
      padding: 15,
      gap: 10,
      backgroundColor: theme.colors.lightGray,
      borderRadius: 10,
      position: "relative",
      elevation: 2,
    },
  });

  const isCardIdBool = portfolioCardIsEdit && portFolioCardId === id;

  return (
    <View style={{ justifyContent: "center", gap: 20 }}>
      <View style={styles.screenContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          Allgemeines Vermögen
        </Text>
        {portfolioCardIsEdit && isCardIdBool && (
          <IconButton
            icon={"plus"}
            iconColor={theme.colors.textColor}
            size={25}
            onPress={() => addNewEntry(id, "generalAssets", "Neu")}
            style={{
              position: "absolute",
              right: 12,
              top: 3,
              backgroundColor: theme.colors.secondary,
              borderRadius: 50,
            }}
          />
        )}
        {Object.entries(assetData["generalAssets"]).map(([label, value]) => (
          <AssetDataItem key={label} label={label} value={value} id={id} />
        ))}
      </View>

      <View style={styles.screenContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
          Aktien Daten
        </Text>
        {portfolioCardIsEdit && isCardIdBool && (
          <IconButton
            icon={"plus"}
            iconColor={theme.colors.textColor}
            size={25}
            onPress={() => addNewEntry(id, "stockData", "Neu")}
            style={{
              position: "absolute",
              right: 12,
              top: 3,
              backgroundColor: theme.colors.secondary,
              borderRadius: 50,
            }}
          />
        )}
        {Object.entries(assetData["stockData"]).map(([label, value]) => (
          <AssetDataItem key={label} label={label} value={value} id={id} objName="stockData" />
        ))}
      </View>
    </View>
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
        position: "relative",
        flexDirection: "row",
        padding: 10,
        backgroundColor: theme.colors.green,
        borderRadius: 10,
        justifyContent: "space-between",
        elevation: 1,
        borderWidth: 2,
        borderColor: theme.colors.lightGray,
      }}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
        Gesamt
      </Text>
      <Text variant="titleMedium" style={{ color: theme.colors.textColor }}>
        {Number(sum).toLocaleString("de-DE")}€
      </Text>
    </View>
  );
};

export default PortfolioScreen;
