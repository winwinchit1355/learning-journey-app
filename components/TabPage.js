import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabPage({ title, description, icon }) {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>LEARNING JOURNEY</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={32} color="#5B4BFA" />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 24,
    paddingTop: 24,
  },
  eyebrow: {
    color: "#777D8A",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
  },
  title: {
    color: "#171922",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 6,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  icon: {
    alignItems: "center",
    backgroundColor: "#ECEAFE",
    borderRadius: 24,
    height: 64,
    justifyContent: "center",
    marginBottom: 20,
    width: 64,
  },
  cardTitle: {
    color: "#171922",
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    color: "#777D8A",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },
});
