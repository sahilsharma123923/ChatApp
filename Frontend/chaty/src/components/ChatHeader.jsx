import React from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import ProfilePic from "./ProfilePic";

const ChatHeader = () => {
  const user = {
    name: "Rahul Sharma",
    profilePic: "",
    online: true,
  };

  return (
    <div className="h-20 px-6 border-b border-gray-500 bg-black flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        <ProfilePic
          src={user.profilePic}
          name={user.name}
        />

        <div>
          <h2 className="text-white font-semibold">
            {user.name}
          </h2>

          <p className="text-sm text-gray-500">
            {user.online ? "Online" : "Offline"}
          </p>
        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        <button className="p-2 rounded-full hover:bg-zinc-800 transition">
          <MoreVertical size={20} className="text-white" />
        </button>

      </div>

    </div>
  );
};

export default ChatHeader;