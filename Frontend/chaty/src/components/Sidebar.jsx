import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("chats");

  const user = {
    name: "Sahil Sharma",
    profilePic: "",
  };

  const chats = [
    {
      id: 1,
      name: "Rahul Sharma",
      profilePic: "",
      lastMessage: "Hey, are we still on for later?",
      time: "2:14 PM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Aman Kumar",
      profilePic: "",
      lastMessage: "Tap to start chatting",
      time: "Mon",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Priya Sharma",
      profilePic: "",
      lastMessage: "Tap to start chatting",
      time: "Sun",
      unread: 0,
      online: true,
    },
  ];

  const contacts = [
    { id: 1, name: "Rahul Sharma", profilePic: "" },
    { id: 2, name: "Aman Kumar", profilePic: "" },
    { id: 3, name: "Priya Sharma", profilePic: "" },
    { id: 4, name: "Rohit Sharma", profilePic: "" },
    { id: 5, name: "Neha Sharma", profilePic: "" },
  ];

  const list = activeTab === "chats" ? chats : contacts;

  return (
    <aside className="w-80 bg-black border-r border-gray-600 flex flex-col">

      {/* Profile */}
      <div className="flex items-center justify-between p-3 border-b border-gray-500">

        <div className="flex items-center gap-3">
          <ProfilePic src={user.profilePic} name={user.name} />

          <div>
            <h2 className="text-white text-lg font-semibold">
              {user.name}
            </h2>

            <p className="text-green-500 text-sm">
              Online
            </p>
          </div>
        </div>

        <button className="p-3 rounded-full border-none hover:bg-white hover:text-black transition duration-300">
          <LogOut size={15} />
        </button>

      </div>

      {/* Tabs */}

    <div className="flex gap-4 p-4">
  <button
    onClick={() => setActiveTab("chats")}
    className={`flex-1 py-3 rounded border-1 transition-all duration-200 ${
      activeTab === "chats"
        ? "border-white text-white"
        : "border-transparent text-gray-400"
    }`}
    >
    Chats
    </button>

    <button
    onClick={() => setActiveTab("contacts")}
    className={`flex-1 py-3 rounded-lg border-1 transition-all duration-200 ${
      activeTab === "contacts"
        ? "border-white text-white"
        : "border-transparent text-gray-400"
    }`}
    >
    Contacts
    </button>
   </div>
      {/* List */}

     <div className="flex-1 overflow-y-auto hide-scrollbar pb-3 px-3">
        {list.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 mb-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition"
          >
            <div className="relative">
              <ProfilePic src={item.profilePic} name={item.name} />
              {activeTab === "chats" && item.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-zinc-900" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium truncate">
                {item.name}
              </h3>

              {activeTab === "chats" ? (
                <p className="text-sm text-gray-400 truncate">
                  {item.lastMessage}
                </p>
              ) : (
                <p className="text-sm text-gray-400">
                  Tap to start chatting
                </p>
              )}
            </div>

            {activeTab === "chats" && (
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs text-gray-500">{item.time}</span>
                {item.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-white text-black text-[10px] font-medium flex items-center justify-center">
                    {item.unread}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

      </div>

    </aside>
  );
};

export default Sidebar;
