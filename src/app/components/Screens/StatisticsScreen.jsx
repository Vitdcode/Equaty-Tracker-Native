import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import LineDataChart from "../charts/LineChart";
import { useAssetsStore } from "../../zustand/store";
import portfolioSum from "../../js-functions/portfolioSum";
import portfolioSumFirstEntry from "../../js-functions/portfolioSumFirstEntry";
import PieChartYears from "../charts/PieChart";

const StatisticsScreen = () => {
  const theme = useTheme();
  const assets = useAssetsStore((state) => state.allAssets);

  const styles = StyleSheet.create({
    cardStyle: {
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: theme.colors.lightGray,
      elevation: 3,
      borderRadius: 10,
      gap: 20,
    },
    growthCard: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      padding: 10,
      backgroundColor: theme.colors.green,
      elevation: 3,
      borderRadius: 10,
      gap: 20,
    },
    growthCardNegative: {
      backgroundColor: theme.colors.red,
    },
    titleStyle: {
      fontSize: 20,
      fontWeight: 700,
      color: theme.colors.textColor,
    },
    titleStyleColorWhite: {
      color: "white",
    },
    portfolioText: {
      fontSize: 30,
      fontWeight: 700,
      color: theme.colors.primary,
      backgroundColor: "white",
      borderRadius: 10,
      elevation: 3,
      padding: 5,
    },
    portfolioTextNegative: {
      color: theme.colors.red,
    },
  });

  function getApproximateYearsBetweenDates() {
    // Helper function to parse DD.MM.YYYY format into a Date object
    const parseDate = (dateString) => {
      const parts = dateString.split(".");
      // Date constructor takes (year, monthIndex, day). Month is 0-indexed.
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };

    const date1 = parseDate(assets[assets.length - 1].date);
    const date2 = parseDate(assets[0].date);

    // Ensure we get a positive difference by putting the later date first
    const laterDate = date1.getTime() > date2.getTime() ? date1 : date2;
    const earlierDate = date1.getTime() > date2.getTime() ? date2 : date1;

    // Calculate the difference in milliseconds
    const diffMilliseconds = laterDate.getTime() - earlierDate.getTime();

    // Define the approximate number of milliseconds in an average year (365.25 days to account for leap years)
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

    // Convert milliseconds to years and round to two decimal places for approximation
    const approximateYears = (diffMilliseconds / millisecondsPerYear).toFixed(2);

    return approximateYears;
  }

  const comparePercantageToFirstEntry = () => {
    const value1 = portfolioSumFirstEntry(assets);
    const value2 = portfolioSum(assets);
    const percentageChange = (((value2 - value1) / value1) * 100).toFixed(2);
    return percentageChange > 0 ? `+${percentageChange}` : percentageChange;
  };

  const comparePortfolios = () => {
    const result = portfolioSum(assets) - portfolioSumFirstEntry(assets);
    return result > 0 ? `+${result.toLocaleString("de-DE")}` : result.toLocaleString("de-DE");
  };

  const comparePercantage = comparePercantageToFirstEntry();
  const comparePortfolio = comparePortfolios();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{
          width: "100%",
          marginTop: 50,
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        fadingEdgeLength={20}
      >
        <Text variant="displaySmall" style={{ color: theme.colors.textColor }}>
          Statistiken
        </Text>
        <View style={styles.cardStyle}>
          <Text style={styles.titleStyle}>Portfolio vom {assets[assets.length - 1]?.date}</Text>
          <Text style={styles.portfolioText}>{portfolioSum(assets).toLocaleString("de-DE")}€</Text>
          <View
            style={
              comparePortfolio > 0
                ? styles.growthCard
                : [styles.growthCard, styles.growthCardNegative]
            }
          >
            <Text
              style={
                comparePercantage > 0
                  ? styles.portfolioText
                  : [styles.portfolioText, styles.portfolioTextNegative]
              }
            >
              {comparePercantage}%
            </Text>
            <Text
              style={
                comparePortfolio > 0
                  ? styles.portfolioText
                  : [styles.portfolioText, styles.portfolioTextNegative]
              }
            >
              {comparePortfolio}€
            </Text>
            <Text style={[styles.titleStyle, styles.titleStyleColorWhite]}>
              {" "}
              Vergleich zum {assets[0]?.date}
            </Text>
            <Text style={[styles.titleStyle, styles.titleStyleColorWhite]}>
              {" "}
              ~ {getApproximateYearsBetweenDates()} Jahre
            </Text>
          </View>
        </View>
        <LineDataChart />
        <PieChartYears />
      </ScrollView>
    </View>
  );
};

export default StatisticsScreen;
