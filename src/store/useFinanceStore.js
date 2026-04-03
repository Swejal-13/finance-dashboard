import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_WIDGET_VISIBILITY, generateMockTransactions } from "@/data/mockData";

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      role: "admin",
      theme: "dark",
      widgetVisibility: DEFAULT_WIDGET_VISIBILITY,
      isLoading: false,
      error: null,

      setTransactions: (transactions) => set({ transactions }),
      addTransaction: (txn) =>
        set((s) => ({ transactions: [txn, ...s.transactions] })),
      updateTransaction: (id, updates) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),
      setRole: (role) => set({ role }),
      toggleTheme: () =>
        set((s) => {
          const newTheme = s.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark", newTheme === "dark");
          return { theme: newTheme };
        }),
      setWidgetVisibility: (vis) =>
        set((s) => ({
          widgetVisibility: { ...s.widgetVisibility, ...vis },
        })),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      initializeData: async () => {
        const state = get();
        if (state.transactions.length > 0) {
          document.documentElement.classList.toggle("dark", state.theme === "dark");
          return;
        }
        set({ isLoading: true, error: null });
        try {
          await new Promise((r) => setTimeout(r, 1200));
          const data = generateMockTransactions();
          set({ transactions: data, isLoading: false });
          document.documentElement.classList.toggle("dark", state.theme === "dark");
        } catch {
          set({ error: "Failed to load transactions", isLoading: false });
        }
      },
    }),
    {
      name: "finance-dashboard-store",
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
        widgetVisibility: state.widgetVisibility,
      }),
    }
  )
);
