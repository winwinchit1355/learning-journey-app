import { create } from "zustand";
const { createJSONStorage, persist } = require("zustand/middleware");
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStudyStore = create(
  persist(
    (set, get) => ({
      subjects: [],
      sessions: [],

      addSubject: (subject) =>
        set((s) => ({
          subjects: [
            ...s.subjects,
            { ...subject, id: subject.id || `sub-${Date.now()}` },
          ],
        })),

      addSession: (session) =>
        set((s) => ({
          sessions: [
            ...s.sessions,
            { ...session, id: session.id || `ses-${Date.now()}` },
          ],
        })),

      updateSubject: (id, patch) =>
        set((s) => ({
          subjects: s.subjects.map((sub) =>
            sub.id === id ? { ...sub, ...patch } : sub
          ),
        })),

      deleteSubject: (id) =>
        set((s) => ({ subjects: s.subjects.filter((sub) => sub.id !== id) })),

      deleteSession: (id) =>
        set((s) => ({ sessions: s.sessions.filter((ses) => ses.id !== id) })),

      isEmpty: () => {
        const state = get();
        return state.subjects.length === 0 && state.sessions.length === 0;
      },
    }),
    {
      name: "learning_journey.study",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
