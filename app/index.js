import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hasSeenWelcome, markWelcomeSeen } from "../lib/onboarding";

export default function WelcomeScreen() {
  const router = useRouter();
  const [hasSeen, setHasSeen] = useState(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    hasSeenWelcome().then(setHasSeen);
  }, []);

  async function startLearning() {
    setStarting(true);

    try {
      await markWelcomeSeen();
      router.replace("/(tabs)/home");
    } catch {
      Alert.alert("Unable to continue", "Please try again. Your progress was not saved.");
      setStarting(false);
    }
  }

  if (hasSeen === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#5B4BFA" />
      </View>
    );
  }

  if (hasSeen) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.largeCircle} />
          <View style={styles.tealCircle} />
          <View style={styles.orangeCircle} />
          <View style={styles.bookBadge}>
            <Ionicons name="book-outline" size={54} color="#5B4BFA" />
          </View>
        </View>

        <Text style={styles.title}>Track Your Learning</Text>
        <Text style={styles.description}>
          Build a better learning habit, one day at a time. Record sessions and review your growth.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={starting}
        onPress={startLearning}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        {starting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Start Learning</Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F6FA",
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  loading: {
    alignItems: "center",
    backgroundColor: "#F5F6FA",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  illustration: {
    alignItems: "center",
    height: 210,
    justifyContent: "center",
    marginBottom: 36,
    position: "relative",
    width: 220,
  },
  largeCircle: {
    backgroundColor: "#E9E7FF",
    borderRadius: 90,
    height: 180,
    position: "absolute",
    width: 180,
  },
  tealCircle: {
    backgroundColor: "#DDF5F2",
    borderRadius: 58,
    height: 116,
    position: "absolute",
    right: 0,
    top: 4,
    width: 116,
  },
  orangeCircle: {
    backgroundColor: "#FFF0E5",
    borderRadius: 42,
    bottom: 8,
    height: 84,
    left: 4,
    position: "absolute",
    width: 84,
  },
  bookBadge: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    elevation: 3,
    height: 80,
    justifyContent: "center",
    shadowColor: "#443D91",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    width: 80,
  },
  title: {
    color: "#14161C",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    color: "#7A7F8C",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 14,
    maxWidth: 330,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#5B4BFA",
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.86,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
