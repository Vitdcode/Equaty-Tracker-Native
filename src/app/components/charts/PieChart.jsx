import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";

// Get screen dimensions for responsive chart sizing
const screenWidth = Dimensions.get("window").width;

const data = [
  {
    name: "Savings",
    value: 2500,
    color: "#FF6347", // Tomato
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Investments",
    value: 4000,
    color: "#4682B4", // SteelBlue
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Expenses",
    value: 1500,
    color: "#9ACD32", // YellowGreen
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Emergency",
    value: 1000,
    color: "#DA70D6", // Orchid
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
      marginBottom: 20,
    },
    chartContainer: {
      backgroundColor: theme.colors.lightGray,
      borderRadius: 16,
      padding: 15,
      margin: 16,
      elevation: 3, // Android shadow
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
  });

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.header}>Financial Overview</Text>
      <PieChart
        data={data}
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
