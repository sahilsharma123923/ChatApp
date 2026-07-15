import { useState } from "react";
import { Image, SendHorizontal } from "lucide-react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  return (
    <div className="border-t border-zinc-800 p-4 bg-black">
      <div className="flex items-center gap-3">

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3 text-white outline-none focus:border-white"
        />

        {/* Image Button */}
        <button className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 transition">
          <Image size={20} className="text-white" />
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className="p-3 rounded-full bg-white text-black hover:bg-zinc-200 transition"
        >
          <SendHorizontal size={20} />
        </button>

      </div>
    </div>
  );
};

export default MessageInput;