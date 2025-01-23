import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IStore {
  hydrated: boolean;
  selectedCurrency: string;
  exchangeRate: number;
  user: string | null

  setHydrated(): void;
  setCurrency(currency: string): Promise<void>;
  setUser(user: string | null): void;
}

export const useStore = create<IStore>()(
  persist(
    immer((set) => ({
      selectedCurrency: "inr",
      exchangeRate: 1,
      hydrated: false,
      user: null,

      setHydrated() {
        set({ hydrated: true });
      },

      async setCurrency(currency: string) {
        const { data } = await axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json")
        set({ selectedCurrency: currency, exchangeRate: data["inr"][currency] });
        
      },

      setUser(user: string | null) {
        set({ user }); 
      }
    
    })),
    {
      name: "store",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        }
      }
    }
  )
)