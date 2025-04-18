import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Card, Divider, IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { useFixCostsStore, useMoneyStore, useSubsStore } from "../../zustand/store";
import CostItem, { CostItemTextInput } from "../reusable components/CostItem";
import CustomIconButton from "../reusable components/CustomIconButton";
import NewCostInputs from "../reusable components/NewCostInputs";

const BudgetScreen = () => {
  const theme = useTheme();

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
        {/* income */}
        <Text variant="titleMedium" style={{ color: "white", fontWeight: "bold", marginTop: 25 }}>
          Verdienst
        </Text>
        {!isIncomeEdit ? (
          <Text variant="displaySmall" style={{ color: "white", fontWeight: "bold" }}>
            {`${income}€`}
          </Text>
        ) : (
          <TextInput
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
        style={{ width: "100%" }}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
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
          <MoneyLeftCard income={income} />
          <FixCostsCard />
          <SubsCard />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const SubsCard = () => {
  const theme = useTheme();
  const subs = useSubsStore((state) => state.subs);
  const sumSubs = useSubsStore((state) => state.sum());

  const [newSubCostTextInputIsVisible, setNewSubCostTextInputIsVisible] = useState(false);
  const [subCostEntryName, setSubCostEntryName] = useState("");
  const [subCostEntrySum, setSubCostEntrySum] = useState("");
  const { setNewSub } = useSubsStore();
  const editSubs = useSubsStore((state) => state.editSub);
  const [subsIsEditMode, setSubsIsEditMode] = useState(false);

  const handleSubmitNewSub = () => {
    if (newSubCostTextInputIsVisible) {
      if (!subCostEntryName || !subCostEntrySum) {
        !subCostEntryName
          ? setSubCostEntryName("Cannot be empty")
          : !subCostEntrySum
          ? setSubCostEntrySum("Cannot be empty")
          : "";
        return;
      }
      setSubCostEntryName("");
      setSubCostEntrySum("");

      setNewSub(subCostEntryName, subCostEntrySum);
    }
    setNewSubCostTextInputIsVisible(!newSubCostTextInputIsVisible);
  };

  const handleCancelNewSub = () => {
    setNewSubCostTextInputIsVisible(!newSubCostTextInputIsVisible);
    setSubCostEntryName("");
    setSubCostEntrySum("");
  };

  return (
    <Card style={{ padding: 5, position: "relative", marginBottom: 20 }}>
      <IconButton
        icon={() => (
          <MaterialIcons
            name={!subsIsEditMode ? "edit" : "check"}
            size={24}
            color={theme.colors.gray}
          />
        )}
        size={30}
        onPress={() => setSubsIsEditMode(!subsIsEditMode)}
        style={{
          position: "absolute",
          top: -5,
          right: 0,
          /*        backgroundColor: theme.colors.secondary, */
          zIndex: 100,
        }}
      />

      <Card.Title
        title="Abos"
        titleStyle={{ color: theme.colors.primary }}
        style={{ marginBottom: 10 }}
      />
      <Card.Content>
        {subs.map((obj, index) =>
          !subsIsEditMode ? (
            <CostItem key={index} name={obj?.name} value={obj?.cost} />
          ) : (
            <CostItemTextInput
              key={index}
              index={index}
              name={obj?.name}
              value={obj?.cost}
              editFixedItem={editSubs}
            />
          )
        )}
        {newSubCostTextInputIsVisible && (
          <NewCostInputs
            costEntryName={subCostEntryName}
            setCostEntryName={setSubCostEntryName}
            costEntrySum={subCostEntrySum}
            setCostEntrySum={setSubCostEntrySum}
            newCostTextInputIsVisible={newSubCostTextInputIsVisible}
            setNewCostTextInputIsVisible={setNewSubCostTextInputIsVisible}
            handleSubmitCost={handleSubmitNewSub}
            handleCancelNewCost={handleCancelNewSub}
          />
        )}
        <Divider style={{ marginBlock: 10 }} />
        <CostItem name={"Summe"} value={sumSubs} />
        <IconButton
          icon={newSubCostTextInputIsVisible ? "check" : "plus"}
          iconColor={theme.colors.textColor}
          size={35}
          onPress={handleSubmitNewSub}
          style={{
            backgroundColor: theme.colors.secondary,
            borderRadius: 50,
            position: "absolute",
            bottom: -40,
            right: 155,
          }}
        />
      </Card.Content>
    </Card>
  );
};

const FixCostsCard = () => {
  const theme = useTheme();
  const [editFixCosts, setEditFixCosts] = useState(false);
  const fixCosts = useFixCostsStore((state) => state.fixCosts);
  const editFixedItem = useFixCostsStore((state) => state.editFixItem);
  const sumFixedCosts = useFixCostsStore((state) => state.sum());

  const [newFixCostTextInputIsVisible, setNewFixCostTextInputIsVisible] = useState(false);
  const [fixCostEntryName, setFixCostEntryName] = useState("");
  const [fixCostEntrySum, setFixCostEntrySum] = useState("");
  const { setNewFixCost } = useFixCostsStore();

  const handleSubmitNewFixCost = () => {
    if (newFixCostTextInputIsVisible) {
      if (!fixCostEntryName || !fixCostEntrySum) {
        !fixCostEntryName
          ? setFixCostEntryName("Cannot be empty")
          : !fixCostEntrySum
          ? setFixCostEntrySum("Cannot be empty")
          : "";
        return;
      }
      setFixCostEntryName("");
      setFixCostEntrySum("");

      setNewFixCost(fixCostEntryName, fixCostEntrySum);
    }
    setNewFixCostTextInputIsVisible(!newFixCostTextInputIsVisible);
  };

  const handleCancelNewFixCost = () => {
    setNewFixCostTextInputIsVisible(!newFixCostTextInputIsVisible);
    setFixCostEntryName("");
    setFixCostEntrySum("");
  };

  return (
    <Card
      style={{
        padding: 5,
        position: "relative",
        marginBottom: 20,
      }}
    >
      <IconButton
        icon={() => (
          <MaterialIcons
            name={!editFixCosts ? "edit" : "check"}
            size={24}
            color={theme.colors.textColor}
          />
        )}
        size={30}
        onPress={() => setEditFixCosts(!editFixCosts)}
        style={{
          position: "absolute",
          top: -5,
          right: 0,
          zIndex: 100,
        }}
      />
      <Card.Title
        titleStyle={{ color: theme.colors.primary }}
        style={{ marginBottom: 10 }}
        title="Fix Kosten"
      />
      <Card.Content>
        {fixCosts?.map((obj, index) =>
          !editFixCosts ? (
            <CostItem key={index} name={obj?.name} value={obj?.cost} />
          ) : (
            <CostItemTextInput
              key={index}
              index={index}
              name={obj?.name}
              value={obj?.cost}
              editFixedItem={editFixedItem}
            />
          )
        )}
        {newFixCostTextInputIsVisible && (
          <NewCostInputs
            costEntryName={fixCostEntryName}
            setCostEntryName={setFixCostEntryName}
            costEntrySum={fixCostEntrySum}
            setCostEntrySum={setFixCostEntrySum}
            newCostTextInputIsVisible={newFixCostTextInputIsVisible}
            setNewCostTextInputIsVisible={setNewFixCostTextInputIsVisible}
            handleSubmitCost={handleSubmitNewFixCost}
            handleCancelNewCost={handleCancelNewFixCost}
          />
        )}
        <Divider style={{ marginBlock: 10 }} />
        <CostItem name={"Summe"} value={sumFixedCosts} />
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
            right: 155,
          }}
        />
      </Card.Content>
    </Card>
  );
};

const MoneyLeftCard = ({ income }) => {
  const theme = useTheme();
  const sumFixedCosts = useFixCostsStore((state) => state.sum());
  const sumSubsCost = useSubsStore((state) => state.sum());
  const sum = income - parseFloat(sumFixedCosts) - parseFloat(sumSubsCost);
  return (
    <Card>
      <Card.Title titleStyle={{ color: theme.colors.primary }} title="Geld übrig nach Ausgaben" />
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
          >{`${sum.toFixed(2)} €`}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default BudgetScreen;
