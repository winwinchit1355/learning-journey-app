import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { hasSeenWelcome } from "../../lib/onboarding";

const ICONS = {
  home: ["home", "home-outline"],
  plan: ["calendar", "calendar-outline"],
  menu: ["grid", "grid-outline"],
  history: ["time", "time-outline"],
  stats: ["bar-chart", "bar-chart-outline"],
};

function tabIcon(name) {
  return ({ color, focused, size }) => (
    <Ionicons name={ICONS[name][focused ? 0 : 1]} color={color} size={size} />
  );
}

export default function TabsLayout() {
  const [canEnter, setCanEnter] = useState(null);

  useEffect(() => {
    hasSeenWelcome().then(setCanEnter);
  }, []);

  if (canEnter === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#5B4BFA" />
      </View>
    );
  }

  if (!canEnter) {
    return <Redirect href="/" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5B4BFA",
        tabBarInactiveTintColor: "#8A8F99",
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarStyle: { borderTopColor: "#E8E9EF", height: 64, paddingTop: 6 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: tabIcon("home") }}
      />
      <Tabs.Screen
        name="plan"
        options={{ title: "Plan", tabBarIcon: tabIcon("plan") }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: "Menu", tabBarIcon: tabIcon("menu") }}
      />
      <Tabs.Screen
        name="history"
        options={{ title: "History", tabBarIcon: tabIcon("history") }}
      />
      <Tabs.Screen
        name="stats"
        options={{ title: "Stats", tabBarIcon: tabIcon("stats") }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    flex: 1,
    justifyContent: "center",
  },
});
