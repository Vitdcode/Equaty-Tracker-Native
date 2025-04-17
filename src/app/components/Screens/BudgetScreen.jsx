import { View, Keyboard } from "react-native";
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
import { useEffect, useState } from "react";
import { useFixCostsStore, useMoneyStore } from "../../zustand/store";
import FixCostItem from "../reusable components/FixCostItems";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomIconButton from "../reusable components/CustomIconButton";

const BudgetScreen = () => {
  const theme = useTheme();
  const [editFixCosts, setEditFixCosts] = useState(false);
  const fixCosts = useFixCostsStore((state) => state.fixCosts);
  const sumFixedCosts = useFixCostsStore((state) => state.sum());
  const [newFixCostTextInputIsVisible, setNewFixCostTextInputIsVisible] = useState(false);
  const { income, setIncome, isIncomeEdit, setIsIncomeEdit } = useMoneyStore();

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
        start={{ x: 0, y: 0 }} // Top-left
        end={{ x: 1, y: 1 }} // Bottom-right (135deg direction)
        style={{
          height: "25%",
          width: "100%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text variant="titleMedium" style={{ color: "white", fontWeight: "bold", marginTop: 25 }}>
          Verdienst
        </Text>
        {!isIncomeEdit ? (
          <Text variant="displaySmall" style={{ color: "white", fontWeight: "bold" }}>
            {`${income}€`}
          </Text>
        ) : (
          <TextInput
            /*    mode="outlined" */
            label="Verdienst anpassen"
            value={income}
            onChangeText={setIncome}
            returnKeyType="send"
            /*       onSubmitEditing={}  send to backend for later*/
            style={{ width: "40%" }}
          />
        )}
      </LinearGradient>
      {isIncomeEdit ? (
        <CustomIconButton icon={"check"} onPress={setIsIncomeEdit} />
      ) : (
        <CustomIconButton icon={"pencil"} onPress={setIsIncomeEdit} />
      )}

      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View
          style={{
            marginTop: 90,
            position: "relative",
            width: "85%",
            gap: 20,
            marginHorizontal: "auto",
          }}
        >
          <MoneyLeftCard sumFixedCosts={sumFixedCosts} income={income} theme={theme} />
          <FixCostsCard
            fixCosts={fixCosts}
            sumFixedCosts={sumFixedCosts}
            theme={theme}
            newFixCostTextInputIsVisible={newFixCostTextInputIsVisible}
            setNewFixCostTextInputIsVisible={setNewFixCostTextInputIsVisible}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const FixCostsCard = ({
  fixCosts,
  sumFixedCosts,
  theme,
  newFixCostTextInputIsVisible,
  setNewFixCostTextInputIsVisible,
}) => {
  const [fixCostEntryName, setFixCostEntryName] = useState("");
  const [fixCostEntrySum, setFixCostEntrySum] = useState("");
  const [error, setError] = useState("");
  const { setNewFixCost } = useFixCostsStore();

  const handleSubmitNewFixCost = () => {
    if (newFixCostTextInputIsVisible) {
      if (!fixCostEntryName || !fixCostEntrySum) {
        !fixCostEntryName
          ? setFixCostEntryName("This cannot be empty")
          : !fixCostEntrySum
          ? setFixCostEntrySum("This cannot be empty")
          : "";
        return;
      }
      setFixCostEntryName("");
      setFixCostEntrySum("");

      setNewFixCost(fixCostEntryName, fixCostEntrySum);
    }
    setNewFixCostTextInputIsVisible(!newFixCostTextInputIsVisible);
  };

  return (
    <Card
      style={{
        padding: 5,
        position: "relative",
      }}
    >
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
        {fixCosts?.map((obj, index) => (
          <View key={index} style={{ marginTop: 15, gap: 10 }}>
            <FixCostItem name={obj?.name} value={obj?.cost} />
          </View>
        ))}
        {newFixCostTextInputIsVisible && (
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextInput
              mode="outlined"
              label="Name"
              value={fixCostEntryName}
              onChangeText={setFixCostEntryName}
              /*    onSubmitEditing={handleSubmitNewFixCost} */
              style={{ width: "40%" }}
            />
            <TextInput
              mode="outlined"
              label="Betrag"
              value={fixCostEntrySum}
              onChangeText={setFixCostEntrySum}
              /*     onSubmitEditing={handleSubmitNewFixCost} */
              style={{ width: "40%" }}
            />
          </View>
        )}
        <Divider style={{ marginBlock: 10 }} />
        <FixCostItem name={"Summe"} value={sumFixedCosts} />
        <IconButton
          icon={newFixCostTextInputIsVisible ? "check" : "plus"}
          iconColor={theme.colors.textColor}
          size={35}
          onPress={handleSubmitNewFixCost}
          style={{
            backgroundColor: theme.colors.secondary,
            borderRadius: 50,
            position: "absolute",
            bottom: -40,
            right: 135,
          }}
        />
      </Card.Content>
    </Card>
  );
};

const MoneyLeftCard = ({ sumFixedCosts, income, theme }) => {
  const sum = income - parseFloat(sumFixedCosts);
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
