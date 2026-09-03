import { create } from "zustand";
const { createJSONStorage, persist } = require("zustand/middleware");
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useProgressStore = create(
  persist(
    (set, get) => ({
      dailyGoalMinutes: 180,
      streak: 0,
      weeklyTotalMinutes: 0,

      setDailyGoal: (minutes) => set({ dailyGoalMinutes: minutes }),

      recalc: (sessions) => {
        const streak = get().computeStreak(sessions);
        const weeklyTotal = get().weeklyTotal(sessions);
        set({ streak, weeklyTotalMinutes: weeklyTotal });
      },

      computeStreak: (sessions) => {
        const days = new Set(sessions.map((s) => s.date));
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          if (days.has(key)) streak += 1;
          else if (i === 0) continue;
          else break;
        }
        return streak;
      },

      weeklyTotal: (sessions) => {
        const now = new Date();
        const day = (now.getDay() + 6) % 7;
        const monday = new Date(now);
        monday.setDate(now.getDate() - day);
        const key = monday.toISOString().slice(0, 10);
        return sessions
          .filter((s) => s.date >= key)
          .reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
      },
    }),
    {
      name: "learning_journey.progress",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
