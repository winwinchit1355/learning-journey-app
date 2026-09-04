import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
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
      Alert.alert(
        "Unable to continue",
        "Please try again. Your progress was not saved.",
      );
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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.illustration}>
          <View style={styles.largeCircle} />
          <View style={styles.tealCircle} />
          <View style={styles.bookBadge}>
            <Ionicons name="book-outline" size={72} color="#635BFF" />
          </View>
          <View style={styles.accents}>
            <Ionicons name="leaf-outline" size={25} color="#009D91" />
            <Ionicons name="sparkles-outline" size={25} color="#FF6A21" />
          </View>
        </View>

        <Text style={styles.title}>Track Your Learning</Text>
        <Text style={styles.description}>
          Build a better learning habit, one day at a time. Simply record
          sessions &amp; review your growth.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          disabled={starting}
          onPress={startLearning}
          style={styles.button}
          android_ripple={{ color: "#8175FF" }}
        >
          {starting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Start Learning</Text>
          )}
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/login")}
          style={styles.accountLink}
        >
          <Text style={styles.accountLinkText}>I already have an account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  footer: {
    flexShrink: 0,
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  loading: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  illustration: {
    alignItems: "center",
    height: 240,
    justifyContent: "center",
    marginBottom: 48,
    position: "relative",
    width: 240,
  },
  largeCircle: {
    backgroundColor: "#F6F3FF",
    borderRadius: 120,
    height: 240,
    position: "absolute",
    width: 240,
  },
  tealCircle: {
    backgroundColor: "#DFF7F7",
    borderRadius: 80,
    height: 160,
    position: "absolute",
    right: 0,
    top: 40,
    width: 160,
  },
  accents: {
    flexDirection: "row",
    gap: 10,
    top: 136,
    left: 92,
    position: "absolute",
  },
  bookBadge: {
    alignItems: "center",
    position: "absolute",
    top: 38,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  title: {
    color: "#20202F",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    color: "#6E6A82",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 18,
    maxWidth: 354,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#6257E8",
    borderRadius: 28,
    minHeight: 56,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexShrink: 0,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
    includeFontPadding: false,
  },
  accountLink: {
    minHeight: 44,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  accountLinkText: {
    color: "#635BFF",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
