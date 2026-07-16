import React, { useEffect } from "react";
import ProfilePic from "./ProfilePic";
import { LogOut } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    allContacts,
    chats,
    getAllContacts,
    getMyChatPartners,
    selectedUser,
    setSelectedUser,
    isUserLoading,
  } = useChatStore();

  const { user, logout } = useAuthStore();

  useEffect(() => {
    getAllContacts();
    getMyChatPartners();
  }, [getAllContacts, getMyChatPartners]);

  const list = activeTab === "chats" ? chats : allContacts;

  return (
    <aside className="w-80 bg-black border-r border-gray-700 flex flex-col">

      {/* Profile */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <ProfilePic src={user?.profilePic} name={user?.name} />
          <div>
            <h2 className="text-white text-lg font-semibold">{user?.name}</h2>
            <p className="text-green-500 text-sm">Online</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-3 rounded-full border-none hover:bg-white hover:text-black transition duration-300"
        >
          <LogOut size={15} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-4">
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 py-3 rounded border-1 transition-all duration-200 ${
            activeTab === "chats" ? "border-white text-white" : "border-transparent text-gray-400"
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 py-3 rounded-lg border-1 transition-all duration-200 ${
            activeTab === "contacts" ? "border-white text-white" : "border-transparent text-gray-400"
          }`}
        >
          Contacts
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-3 px-3">
        {isUserLoading ? (
          <p className="text-gray-500 text-sm text-center mt-4">Loading...</p>
        ) : list.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-4">
            {activeTab === "chats" ? "No conversations yet" : "No contacts found"}
          </p>
        ) : (
          list.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedUser(item)}
              className={`flex items-center gap-3 p-3 mb-3 rounded-xl border cursor-pointer transition ${
                selectedUser?._id === item._id
                  ? "bg-zinc-800 border-white"
                  : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              <ProfilePic src={item.profilePic} name={item.name} />

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{item.name}</h3>
                <p className="text-sm text-gray-400 truncate">
                  {activeTab === "chats" ? "Tap to view conversation" : "Tap to start chatting"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;