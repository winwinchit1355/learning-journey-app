import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProgressStore } from "../../stores/progressStore";
import { useStudyStore } from "../../stores/studyStore";

function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function MetricCard({ icon, iconColor, iconBackground, label, value }) {
  return (
    <View className="flex-1 flex-row items-center rounded-2xl bg-white px-3 py-4 shadow-sm shadow-indigo-100">
      <View
        className="mr-2.5 h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBackground }}
      >
        <Ionicons name={icon} size={21} color={iconColor} />
      </View>
      <View>
        <Text className="text-xs text-[#9A99A8]">{label}</Text>
        <Text className="mt-0.5 text-sm font-bold text-ink">{value}</Text>
      </View>
    </View>
  );
}

function EmptyCard({ icon, title, subtitle }) {
  return (
    <View className="min-h-[146px] items-center justify-center rounded-2xl border border-[#ECEBF2] bg-white px-5">
      <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-[#F2F0FF]">
        <Ionicons name={icon} size={23} color="#635BFF" />
      </View>
      <Text className="text-base font-bold text-ink">{title}</Text>
      <Text className="mt-1 text-sm text-[#77768A]">{subtitle}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const sessions = useStudyStore((state) => state.sessions);
  const dailyGoalMinutes = useProgressStore((state) => state.dailyGoalMinutes);
  const streak = useProgressStore((state) => state.streak);
  const weeklyTotalMinutes = useProgressStore(
    (state) => state.weeklyTotalMinutes,
  );

  const todayMinutes = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    return sessions
      .filter((session) => session.date === today)
      .reduce((total, session) => total + (session.duration_minutes || 0), 0);
  }, [sessions]);

  const progress = dailyGoalMinutes
    ? Math.min(100, Math.round((todayMinutes / dailyGoalMinutes) * 100))
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between pb-7 pt-4">
          <View>
            <Text className="text-xs font-medium uppercase tracking-wide text-[#9997AA]">
              Today&apos;s Progress
            </Text>
            <Text className="mt-1 text-xl font-extrabold text-ink">
              {dayjs().format("dddd, MMM D")}
            </Text>
          </View>
          <Pressable
            accessibilityLabel="Open profile"
            accessibilityRole="button"
            className="h-11 w-11 items-center justify-center rounded-full bg-[#F1EFFF]"
            onPress={() => router.push("/(tabs)/menu")}
          >
            <Ionicons name="person-outline" size={22} color="#635BFF" />
          </Pressable>
        </View>

        <View className="rounded-3xl bg-white px-5 py-5 shadow-md shadow-indigo-100">
          <View className="flex-row items-end justify-between">
            <View>
              <Text className="text-sm font-semibold text-[#6E6C82]">
                Total Study Time
              </Text>
              <Text className="mt-1 text-4xl font-extrabold text-[#A09EAF]">
                {formatMinutes(todayMinutes)}
              </Text>
            </View>
            <View className="mb-2 rounded-full bg-[#F5F3F9] px-4 py-2">
              <Text className="text-xs font-semibold text-[#6D6A7D]">
                {sessions.length}{" "}
                {sessions.length === 1 ? "session" : "sessions"}
              </Text>
            </View>
          </View>
          <View className="mt-5 flex-row items-center justify-between">
            <Text className="text-sm text-[#6E6C82]">
              Daily Goal Progress ({formatMinutes(dailyGoalMinutes)})
            </Text>
            <Text className="text-sm font-semibold text-[#A09EAF]">
              {progress}%
            </Text>
          </View>
          <View className="mt-2 h-2 overflow-hidden rounded-full bg-[#EFEDF5]">
            <View
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </View>
        </View>

        <View className="mt-7 flex-row gap-3">
          <MetricCard
            icon="flame-outline"
            iconColor="#FF5B22"
            iconBackground="#FFF0DE"
            label="Streak"
            value={`${streak} days`}
          />
          <MetricCard
            icon="sparkles-outline"
            iconColor="#0BAA9A"
            iconBackground="#D9F8F0"
            label="Weekly Total"
            value={formatMinutes(weeklyTotalMinutes)}
          />
        </View>

        <View className="mb-3 mt-5 flex-row items-center justify-between">
          <Text className="text-base font-extrabold text-ink">
            Today&apos;s Plan
          </Text>
          <Pressable onPress={() => router.push("/(tabs)/plan")}>
            <Text className="text-sm font-bold text-primary">View Plan</Text>
          </Pressable>
        </View>
        <EmptyCard
          icon="clipboard-outline"
          title="No plan yet"
          subtitle="Create your learning plan"
        />

        <Text className="mb-3 mt-5 text-base font-extrabold text-ink">
          Today&apos;s Activities
        </Text>
        <EmptyCard
          icon="book-outline"
          title="No activities yet"
          subtitle="Start your first study session"
        />

        <View className="mt-6 items-end">
          <Pressable
            accessibilityRole="button"
            className="flex-row items-center rounded-full bg-primary px-6 py-4 shadow-md shadow-indigo-300"
            onPress={() => router.push("/(tabs)/menu")}
          >
            <Ionicons name="add" size={25} color="#FFFFFF" />
            <Text className="ml-2 text-sm font-bold text-white">
              Add Study
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
