import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],

  activeTab: "chats",
  selectedUser: null,

  isContactsLoading: false,
  isChatsLoading: false,
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
    set({ isContactsLoading: true });

    try {
      const res = await api.get("/message/contacts");

      set({
        allContacts: res.data.filteredUsers,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch contacts"
      );
    } finally {
      set({ isContactsLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isChatsLoading: true });

    try {
      const res = await api.get("/message/chat");

      set({
        chats: res.data.chatPartners,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch chats"
      );
    } finally {
      set({ isChatsLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({
      messages: [],
      isMessageLoading: true,
    });

    try {
      const res = await api.get(`/message/${userId}`);

      set({
        messages: res.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch messages"
      );
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
        `/message/send/${selectedUser._id}`,
        messageData
      );

      set({
        messages: [...messages, res.data.newMessage],
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send message"
      );
    }
  },
}));