import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider, ThemeProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";
import Colors from "../constants/Colors.js";
import merge from "deepmerge";
import { useEffect } from "react";
import HomeScreen from "./components/Screens/HomeScreen.jsx";

function ProfileScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
}

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
  console.log(theme.colors.background);

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
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
              <BottomNavigation.Bar
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
              />
            )}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Text style={{ color, fontWeight: focused ? "bold" : "normal" }}>🏠</Text>
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Text style={{ color, fontWeight: focused ? "bold" : "normal" }}>👤</Text>
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color, focused }) => (
                  <Text style={{ color, fontWeight: focused ? "bold" : "normal" }}>⚙️</Text>
                ),
              }}
            />
          </Tab.Navigator>
          <StatusBar
            translucent={true}
            style={theme.dark ? "light" : "dark"} // Auto-detects from theme
            backgroundColor="rgba(158, 158, 158, 0.4)"
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
