import { create } from "zustand";
const { createJSONStorage, persist } = require("zustand/middleware");
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSettingsStore = create(
  persist(
    (set) => ({
      userName: "Learner",
      pushNotifications: false,
      cloudSyncEnabled: false,

      setUserName: (name) => set({ userName: name }),
      setPushNotifications: (enabled) => set({ pushNotifications: enabled }),
      setCloudSync: (enabled) => set({ cloudSyncEnabled: enabled }),
    }),
    {
      name: "learning_journey.settings",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
