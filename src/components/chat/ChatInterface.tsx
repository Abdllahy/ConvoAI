import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import SuggestionChips from "./SuggestionChips";
import ChatInput from "./ChatInput";
import HistorySidebar from "./HistorySidebar";
import SettingsPanel from "./SettingsPanel";
import { cn } from "@/lib/utils";

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

interface ChatInterfaceProps {
  initialMessages?: Message[];
  initialSuggestions?: SuggestionChip[];
  title?: string;
}

const ChatInterface = ({
  initialMessages = [
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 60000 * 5),
    },
  ],
  initialSuggestions = [
    {
      id: "1",
      text: "What can you help me with?",
      tooltip: "Get started with basic capabilities",
    },
    { id: "2", text: "Tell me a joke", tooltip: "Lighten the mood" },
    {
      id: "3",
      text: "Create a to-do list",
      tooltip: "Help with task management",
    },
  ],
  title = "AI Assistant",
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${content}". This is a simulated response from the AI assistant.`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  const handleChipClick = (suggestion: SuggestionChip) => {
    handleSendMessage(suggestion.text);
  };

  const handleToggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
    // Close settings panel if open
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const handleToggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
    // Close history sidebar if open
    if (isHistoryOpen) setIsHistoryOpen(false);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, this would start the voice recording
    console.log("Started recording...");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop the recording and process the audio
    console.log("Stopped recording, processing audio...");

    // Simulate receiving transcribed text
    setTimeout(() => {
      handleSendMessage("This is simulated voice input text.");
    }, 500);
  };

  const handleSelectConversation = (id: string) => {
    console.log(`Selected conversation with ID: ${id}`);
    // In a real app, this would load the selected conversation
    setIsHistoryOpen(false);
  };

  return (
    <div className="flex h-full w-full bg-background">
      {isHistoryOpen && (
        <HistorySidebar
          isOpen={isHistoryOpen}
          onClose={handleToggleHistory}
          onSelectConversation={handleSelectConversation}
        />
      )}

      <div className={cn("flex flex-col flex-1 h-full overflow-hidden")}>
        <ChatHeader
          title={title}
          onToggleHistory={handleToggleHistory}
          onToggleSettings={handleToggleSettings}
          isHistoryOpen={isHistoryOpen}
          isSettingsOpen={isSettingsOpen}
        />

        <div className="flex-1 overflow-hidden flex flex-col">
          <MessageList messages={messages} loading={loading} />

          <SuggestionChips
            suggestions={initialSuggestions}
            onChipClick={handleChipClick}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            isRecording={isRecording}
            disabled={loading}
          />
        </div>
      </div>

      <SettingsPanel isOpen={isSettingsOpen} onClose={handleToggleSettings} />
    </div>
  );
};

export default ChatInterface;
