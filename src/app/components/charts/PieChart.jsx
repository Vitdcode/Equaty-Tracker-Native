import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";

// Get screen dimensions for responsive chart sizing
const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Savings",
    value: 2500,
    color: "rgb(196, 90, 71)", // Tomato
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Investments",
    value: 4000,
    color: "rgb(70, 149, 180)", // SteelBlue
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Expenses",
    value: 1500,
    color: "rgb(106, 182, 126)", // YellowGreen
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Emergency",
    value: 1000,
    color: "rgb(4, 41, 145)", // Orchid
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const chartConfig = {
  /*   backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#fefefe", */
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default text color
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default label color
  decimalPlaces: 0, // optional, defaults to 2dp
};

const PieChartYears = () => {
  const theme = useTheme();

  const assets = useAssetsStore((state) => state.allAssets);

  const colors = [
    "rgb(196, 90, 71)",
    "rgb(70, 149, 180)",
    "rgb(106, 182, 126)",
    "rgb(141, 72, 138)",
    "rgb(4, 41, 145)",
  ];

  const getYearFromDate = (dateStr) =>
    new Date(dateStr.split(".").reverse().join("-")).getFullYear();

  const calculateYearlyGains = () => {
    const euroFormatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    });

    const currentYear = new Date().getFullYear();
    const last5Years = Array.from({ length: 5 }, (_, i) => currentYear - i).reverse();

    const filtered = assets
      .filter((a) => a.name === "General Assets")
      .map((a) => ({ ...a, year: getYearFromDate(a.date) }))
      .filter((a) => last5Years.includes(a.year));
    // Group by year
    const grouped = {};
    for (const asset of filtered) {
      if (!grouped[asset.year]) grouped[asset.year] = [];
      grouped[asset.year].push(asset);
    }

    // Sort each year's data by date (ascending)
    for (const year in grouped) {
      grouped[year].sort(
        (a, b) =>
          new Date(a.date.split(".").reverse().join("-")) -
          new Date(b.date.split(".").reverse().join("-"))
      );
    }

    // Generate chart data
    const chartData = last5Years
      .map((year, index) => {
        const entries = grouped[year];
        if (!entries || entries.length < 2) return null;

        const sumAssets = (asset) =>
          Object.values(asset.generalAssets).reduce((acc, val) => acc + parseFloat(val), 0);
        const start = parseFloat(sumAssets(entries[0]));
        const end = parseFloat(sumAssets(entries[entries.length - 1]));
        if (!start || !end) return;
        const value = end?.toFixed(0) - start?.toFixed(0);

        return {
          name: `€ | ${year}`,
          value: parseFloat(value.toLocaleString("de-DE")),
          color: colors[index % colors.length],
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        };
      })
      .filter(Boolean); // remove any nulls

    return chartData;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
      padding: 16,
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      marginBlock: 10,
      textAlign: "center",
      color: theme.colors.textColor,
    },
    chartContainer: {
      backgroundColor: theme.colors.lightGray,
      borderRadius: 16,
      /*       padding: 15, */
      margin: 16,
      elevation: 3, // Android shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
  });

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.header}>Geld verdient pro Jahr</Text>
      <PieChart
        data={calculateYearlyGains()}
        width={screenWidth - 32} // Subtract some padding/margin
        height={220}
        chartConfig={chartConfig}
        accessor={"value"} // Key in your data array that holds the slice value
        backgroundColor={"transparent"} // Makes the chart background transparent
        paddingLeft={"15"} // Adjust padding if needed
        absolute // Displays absolute values in the legend
      />
    </View>
  );
};

export default PieChartYears;
