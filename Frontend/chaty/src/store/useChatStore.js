import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,

  isUserLoading: false,
  isMessageLoading: false,

  isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

  toggleSound: () => {
    const value = !get().isSoundEnabled;

    localStorage.setItem("isSoundEnabled", value);

    set({
      isSoundEnabled: value,
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (user) =>
    set({
      selectedUser: user,
    }),

 getAllContacts: async () => {
  set({ isUserLoading: true });

  try {
    const res = await api.get("/messages/contacts");

    set({
      allContacts: res.data.filteredUsers,
    });
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    set({
      isUserLoading: false,
    });
  }
},

 getMyChatPartners: async () => {
  set({ isUserLoading: true });

  try {
    const res = await api.get("/messages/chat");

    set({
      chats: res.data.chatPartners,
    });
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    set({
      isUserLoading: false,
    });
  }
},

  getMessages: async (userId) => {
    set({ isMessageLoading: true });

    try {
      const res = await api.get(`/messages/${userId}`);

      set({
        messages: res.data,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      set({
        isMessageLoading: false,
      });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    if (!selectedUser) return;

    try {
      const res = await api.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      set({
        messages: [...messages, res.data.newMessage],
    });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  },
}));