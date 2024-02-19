import { create } from "zustand";
import { User } from "@supabase/supabase-js";
interface UserState {
  user: User | null;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
}));
