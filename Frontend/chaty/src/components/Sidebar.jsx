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
    { id: 1, name: "Rahul Sharma", profilePic: "" },
    { id: 2, name: "Aman Kumar", profilePic: "" },
    { id: 3, name: "Priya Sharma", profilePic: "" },
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
    <aside className="w-80 bg-black border-r border-zinc-800 flex flex-col">

      {/* Profile */}
      <div className="flex items-center justify-between p-5 border-b border-zinc-800">

        <div className="flex items-center gap-3">
          <ProfilePic
            src={user.profilePic}
            name={user.name}
          />

          <div>
            <h2 className="text-white text-lg font-semibold">
              {user.name}
            </h2>

            <p className="text-gray-400 text-sm">
              Online
            </p>
          </div>
        </div>

        <button
          className="p-3 rounded-full border border-zinc-700 hover:bg-white hover:text-black transition duration-300"
        >
          <LogOut size={22} />
        </button>

      </div>

      {/* Tabs */}

      <div className="flex gap-2 p-4">

        <button
          onClick={() => setActiveTab("chats")}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            activeTab === "chats"
              ? "bg-white text-black"
              : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
          }`}
        >
          Chats
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            activeTab === "contacts"
              ? "bg-white text-black"
              : "bg-zinc-900 text-gray-300 hover:bg-zinc-800"
          }`}
        >
          Contacts
        </button>

      </div>

      {/* List */}

      <div className="flex-1 overflow-y-auto px-3 pb-3">

        {list.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 mb-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition"
          >
            <ProfilePic
              src={item.profilePic}
              name={item.name}
            />

            <div className="flex-1">
              <h3 className="text-white font-medium">
                {item.name}
              </h3>

              <p className="text-sm text-gray-400">
                Tap to start chatting
              </p>
            </div>
          </div>
        ))}

      </div>

    </aside>
  );
};

export default Sidebar;