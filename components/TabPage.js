import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabPage({ title, description, icon, onRefresh }) {
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);

    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F5F6FA]" edges={["top"]}>
      <ScrollView
        alwaysBounceVertical
        className="flex-1 px-5"
        refreshControl={(
          <RefreshControl
            colors={["#5B4BFA"]}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            tintColor="#5B4BFA"
          />
        )}
      >
        <View className="pt-6 pb-5">
          <Text className="text-[#777D8A] text-11 font-semibold tracking-wider">
            LEARNING JOURNEY
          </Text>
          <Text className="text-[#171922] text-30 font-extrabold mt-1.5">
            {title}
          </Text>
        </View>

        <View className="items-center bg-white rounded-2xl px-7 py-10">
          <View className="w-16 h-16 rounded-2xl bg-[#ECEAFE] items-center justify-center mb-5">
            <Ionicons name={icon} size={32} color="#5B4BFA" />
          </View>
          <Text className="text-[#171922] text-20 font-bold">{title}</Text>
          <Text className="text-[#777D8A] text-15 leading-6 mt-2 text-center">
            {description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
