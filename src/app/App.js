import { StatusBar } from "expo-status-bar";
import { Easing, StyleSheet, Text, useColorScheme, View, Appearance } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider, ThemeProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  SceneStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import Colors from "../constants/Colors.js";
import merge from "deepmerge";
import { useEffect } from "react";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import PortfolioScreen from "./components/Screens/PortfolioScreen.jsx";
import StatisticsScreen from "./components/Screens/StatisticsScreen.jsx";
import BudgetScreen from "./components/Screens/BudgetScreen.jsx";
import * as SystemUI from "expo-system-ui";

function SettingsScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const CombinedLightTheme = merge(MD3LightTheme, { colors: Colors.light });
const CombinedDarkTheme = merge(MD3DarkTheme, { colors: Colors.dark });

export default function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      const newTheme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme;
      SystemUI.setBackgroundColorAsync(newTheme.colors.background);
    });

    return () => subscription.remove(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const setNavBarTransparent = async () => {
      try {
        NavigationBar.setPositionAsync("absolute");
        NavigationBar.setBackgroundColorAsync(theme.colors.lightGray);
      } catch (error) {
        console.error("Failed to set navigation bar color:", error);
      }
    };

    setNavBarTransparent();
  }, [theme]);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              animation: "none",
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
              <BottomNavigation.Bar
                animationEasing={Easing.inOut(Easing.ease)}
                navigationState={state}
                safeAreaInsets={insets}
                onTabPress={({ route, preventDefault }) => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }}
                renderIcon={({ route, focused, color }) => {
                  const { options } = descriptors[route.key];
                  return options.tabBarIcon ? options.tabBarIcon({ focused, color }) : null;
                }}
                getLabelText={({ route }) => {
                  const { options } = descriptors[route.key];
                  return options.tabBarLabel || route.name;
                }}
                style={{ backgroundColor: theme.colors.lightGray }}
                activeIndicatorStyle={{ backgroundColor: theme.colors.secondary }}
              />
            )}
          >
            <Tab.Screen
              name="Portfolio"
              component={PortfolioScreen}
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Text style={{ color, fontWeight: focused ? "bold" : "normal" }}>
                    {
                      <MaterialIcons
                        name="attach-money"
                        size={24}
                        color={focused ? "white" : theme.colors.gray}
                      />
                    }
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Statistiken"
              component={StatisticsScreen}
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Text style={{ color, fontWeight: focused ? "bold" : "normal" }}>
                    <MaterialIcons
                      name="table-chart"
                      size={24}
                      color={focused ? "white" : theme.colors.gray}
                    />
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Ausgaben"
              component={BudgetScreen}
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Text style={{ color, fontWeight: focused ? "bold" : "normal" }}>
                    {
                      <FontAwesome5
                        name="money-check-alt"
                        size={24}
                        color={focused ? "white" : theme.colors.gray}
                      />
                    }
                  </Text>
                ),
              }}
            />
          </Tab.Navigator>
          <StatusBar
            translucent={true}
            style={theme.dark ? "light" : "dark"} // Auto-detects from theme
            backgroundColor="rgba(158, 158, 158, 0.15)"
          />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
