import AsyncStorage from "@react-native-async-storage/async-storage";

const WELCOME_SEEN_KEY = "learning_journey.has_seen_welcome";

export async function hasSeenWelcome() {
  try {
    return (await AsyncStorage.getItem(WELCOME_SEEN_KEY)) === "true";
  } catch {
    return false;
  }
}

export function markWelcomeSeen() {
  return AsyncStorage.setItem(WELCOME_SEEN_KEY, "true");
}
