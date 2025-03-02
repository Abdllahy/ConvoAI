import React, { useRef, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface MessageListProps {
  messages?: Message[];
  loading?: boolean;
}

const MessageList = ({
  messages = [
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000 * 5),
    },
    {
      id: "2",
      content: "I need help organizing my schedule for next week.",
      sender: "user",
      timestamp: new Date(Date.now() - 60000 * 4),
    },
    {
      id: "3",
      content:
        "I can help with that! Would you like me to create a daily plan or just highlight important events?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000 * 3),
    },
    {
      id: "4",
      content: "A daily plan would be great, thanks!",
      sender: "user",
      timestamp: new Date(Date.now() - 60000 * 2),
    },
    {
      id: "5",
      content:
        "Perfect! Let me create a daily schedule template for you. What time do you usually start and end your day?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000),
    },
  ],
  loading = false,
}: MessageListProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <div
      className="w-full h-[778px] bg-gray-50 flex flex-col"
      ref={scrollAreaRef}
    >
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <p>{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg self-start max-w-[80%]">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
