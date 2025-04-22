import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import LineDataChart from "../charts/LineChart";

const StatisticsScreen = () => {
  const theme = useTheme();

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
    titleStyle: {
      fontSize: 20,
      fontWeight: 700,
      color: theme.colors.textColor,
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
  });

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 70,
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text variant="displaySmall" style={{ color: theme.colors.textColor }}>
        Statistiken
      </Text>
      <View style={styles.cardStyle}>
        <Text style={styles.titleStyle}>Portfolio vom 01.02.2025</Text>
        <Text style={styles.portfolioText}>37.402€</Text>
        <View style={styles.growthCard}>
          <Text style={styles.portfolioText}>+14.37%</Text>
          <Text style={styles.portfolioText}>+11.999€</Text>
          <Text style={styles.titleStyle}> Vergleich zum 25.07.2024</Text>
        </View>
      </View>
      <LineDataChart />
    </View>
  );
};

export default StatisticsScreen;
