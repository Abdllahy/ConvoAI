import React, { useState } from "react";
import ChatInterface from "./chat/ChatInterface";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface SuggestionChip {
  id: string;
  text: string;
  tooltip?: string;
}

const Home = () => {
  // Initial messages to display when the chat loads
  const initialMessages: Message[] = [
    {
      id: "welcome-message",
      content:
        "Hello! I'm your AI personal assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ];

  // Initial suggestion chips
  const initialSuggestions: SuggestionChip[] = [
    {
      id: "1",
      text: "What can you help me with?",
      tooltip: "Get started with basic capabilities",
    },
    {
      id: "2",
      text: "Tell me a joke",
      tooltip: "Lighten the mood",
    },
    {
      id: "3",
      text: "Create a to-do list",
      tooltip: "Help with task management",
    },
    {
      id: "4",
      text: "Summarize an article",
      tooltip: "Content summarization",
    },
    {
      id: "5",
      text: "Weather forecast",
      tooltip: "Check the weather",
    },
    {
      id: "6",
      text: "Set a reminder",
      tooltip: "Manage your schedule",
    },
  ];

  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <ChatInterface
        initialMessages={initialMessages}
        initialSuggestions={initialSuggestions}
        title="AI Personal Assistant"
      />
    </div>
  );
};

export default Home;
