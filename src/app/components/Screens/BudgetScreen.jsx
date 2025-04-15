import { View } from "react-native";
import {
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CustomIconBtnWithText from "../reusable components/CustomIconBtnWithText";
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useFixCostsStore } from "../../zustand/store";
import FixCostItem from "../reusable components/FixCostItems";

const BudgetScreen = () => {
  const theme = useTheme();
  const [editFixCosts, setEditFixCosts] = useState(false);
  const fixCosts = useFixCostsStore((state) => state.fixCosts);
  const sumFixedCosts = useFixCostsStore((state) => state.sum());
  const [income, setIncome] = useState(2700);

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
        colors={["rgb(144, 98, 250)", "rgb(141, 95, 247)"]}
        start={{ x: 0, y: 0 }} // Top-left
        end={{ x: 1, y: 1 }} // Bottom-right (135deg direction)
        style={{
          height: "25%",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", marginTop: 60 }}>Verdienst</Text>
        <Text variant="headlineMedium" style={{ color: "white", fontWeight: "bold" }}>
          {`${income}€`}
        </Text>
      </LinearGradient>

      <View
        style={{
          position: "absolute",
          top: 170,
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
          text={"Neuer Eintrag"}
        />
      </View>
      <View style={{ marginTop: 90, position: "relative", width: "80%", gap: 20 }}>
        <MoneyLeftCard sumFixedCosts={sumFixedCosts} income={income} theme={theme} />
        <FixCostsCard fixCosts={fixCosts} sumFixedCosts={sumFixedCosts} theme={theme} />
      </View>
    </View>
  );
};

const FixCostsCard = ({ fixCosts, sumFixedCosts, theme }) => {
  return (
    <Card style={{ padding: 5 }}>
      <IconButton
        icon={() => <MaterialIcons name="edit" size={24} color={theme.colors.textColor} />}
        iconColor={theme.colors.secondary}
        size={20}
        onPress={() => console.log("Pressed")}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: theme.colors.secondary,
        }}
      />
      <Card.Title title="Fix Kosten" />
      <Card.Content>
        {fixCosts?.map((cost, index) => (
          <View key={index} style={{ marginTop: 20, gap: 10 }}>
            <FixCostItem title={"Miete"} value={cost?.rent} />
            <FixCostItem title={"Strom"} value={cost?.power} />

            <Divider />
            <FixCostItem title={"Summe"} value={sumFixedCosts} />
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const MoneyLeftCard = ({ sumFixedCosts, income, theme }) => {
  const sum = income - parseFloat(sumFixedCosts.replace("€", "").trim());
  return (
    <Card>
      <Card.Title title="Geld übrig nach ausgaben" />
      <Card.Content>
        <View
          style={{
            marginTop: 20,
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.elevation.level3,
            borderRadius: 10,
            padding: 8,
          }}
        >
          <IconButton
            icon={() => <FontAwesome6 name="money-check-dollar" size={24} color="white" />}
            iconColor={theme.colors.secondary}
            size={20}
            onPress={() => console.log("Pressed")}
            style={{
              backgroundColor: theme.colors.secondary,
              borderRadius: 7,
            }}
          />

          <Text
            variant="headlineSmall"
            style={{ color: theme.colors.primary, fontWeight: "bold" }}
          >{`${sum} €`}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default BudgetScreen;
