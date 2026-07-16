import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,

  setUser: (user) => set({ user }),

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/getUser");
      set({ user: res.data.user });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  },
}));