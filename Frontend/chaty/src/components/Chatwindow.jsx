import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  return (
    <div className="flex-1 flex flex-col bg-black">

      <ChatHeader />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 bg-black">
        <MessageBubble message="Hi!" isOwn={false} />
        <MessageBubble message="Hello 👋" isOwn={true} />
      </div>

      <MessageInput />

    </div>
  );
};

export default ChatWindow;