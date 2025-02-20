import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}
const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      username: null,
      login: (username: string) => {
        set({ isLoggedIn: true, username });
      },
      logout: () => {
        set({ isLoggedIn: false, username: null });
        sessionStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
