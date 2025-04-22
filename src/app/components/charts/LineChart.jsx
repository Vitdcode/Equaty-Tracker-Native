import { LineChart } from "react-native-chart-kit";
import { Dimensions, View, StyleSheet } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useAssetsStore } from "../../zustand/store";
import getYears from "../../js-functions/availableYears";

const LineDataChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const theme = useTheme();

  const assets = useAssetsStore((state) => state.allAssets);
  const selectedYearStatistics = useAssetsStore((state) => state.selectedYearStatistics);
  const setSelectedYearStatistics = useAssetsStore((state) => state.setSelectedYearStatistics);

  const monthMap = {
    "01": "Januar",
    "02": "Februar",
    "03": "März",
    "04": "April",
    "05": "Mai",
    "06": "Juni",
    "07": "Juli",
    "08": "August",
    "09": "September",
    10: "Oktober",
    11: "November",
    12: "Dezember",
  };

  const monthsCurrentYear = assets.reduce((acc, currentAsset) => {
    for (const key in monthMap) {
      if (
        currentAsset.date.includes(selectedYearStatistics.toString()) &&
        currentAsset.date.split(".")[1].includes(key)
      ) {
        acc.push(monthMap[key]);
      }
    }
    return acc;
  }, []);

  const sumPerMonth = assets
    .filter((asset) => asset.date.includes(selectedYearStatistics))
    .map((filteredAsset) =>
      Object.values(filteredAsset["generalAssets"]).reduce((acc, currentNum) => {
        acc += currentNum;
        return acc;
      }, 0)
    );

  const styles = StyleSheet.create({
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
    chart: {
      borderRadius: 10,
    },
  });

  const years = getYears();

  const handleYearChange = (direction) => {
    let index = years.findIndex((year) => year === selectedYearStatistics.toString());

    if (index === 0 && direction === "left") {
      setSelectedYearStatistics(years[years.length - 1]);
    } else if (index === years.length - 1 && direction === "right") {
      setSelectedYearStatistics(years[0]);
    } else {
      direction === "left"
        ? setSelectedYearStatistics(years[index - 1])
        : setSelectedYearStatistics(years[index + 1]);
    }
  };

  return (
    <View style={styles.chartContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <IconButton
          icon="arrow-left-circle-outline"
          iconColor={theme.colors.textColor}
          size={30}
          onPress={() => handleYearChange("left")}
        />
        <Text variant="titleMedium">{selectedYearStatistics}</Text>
        <IconButton
          icon="arrow-right-circle-outline"
          iconColor={theme.colors.textColor}
          size={30}
          onPress={() => handleYearChange("right")}
        />
      </View>
      <LineChart
        data={{
          labels: monthsCurrentYear,
          datasets: [
            {
              data: sumPerMonth,
            },
          ],
        }}
        width={screenWidth - 70} // padding on both sides
        height={220}
        yAxisLabel="€"
        chartConfig={{
          backgroundColor: theme.colors.secondary,
          backgroundGradientFrom: theme.colors.lightGray,
          backgroundGradientTo: theme.colors.lightGray,
          decimalPlaces: 0,
          color: (opacity = 1) => `${theme.colors.blue} ${opacity})`, // green tone
          labelColor: (opacity = 1) => `${theme.colors.textColor} ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};
export default LineDataChart;
