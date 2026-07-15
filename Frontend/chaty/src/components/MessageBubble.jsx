import React from 'react'

const MessageBubble = ({ message, isOwn }) => {
  return (
    <div
      className={`flex mb-4 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-2xl ${
          isOwn
            ? "bg-white text-black"
            : "bg-zinc-800 text-white"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;