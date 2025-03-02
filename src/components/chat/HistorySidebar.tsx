import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Search, X } from "lucide-react";

interface ConversationItem {
  id: string;
  title: string;
  preview: string;
  date: string;
}

interface HistorySidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectConversation?: (id: string) => void;
}

const HistorySidebar = ({
  isOpen = true,
  onClose = () => {},
  onSelectConversation = () => {},
}: HistorySidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversation history data
  const [conversations, setConversations] = useState<ConversationItem[]>([
    {
      id: "1",
      title: "Task planning assistance",
      preview: "Can you help me organize my tasks for the week?",
      date: "2 hours ago",
    },
    {
      id: "2",
      title: "Recipe recommendations",
      preview: "What can I cook with chicken and vegetables?",
      date: "Yesterday",
    },
    {
      id: "3",
      title: "Travel planning",
      preview: "I need help planning a trip to Japan next month",
      date: "3 days ago",
    },
    {
      id: "4",
      title: "Book recommendations",
      preview: "Can you suggest some science fiction books?",
      date: "Last week",
    },
    {
      id: "5",
      title: "Workout routine",
      preview: "Help me create a home workout routine",
      date: "2 weeks ago",
    },
  ]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.preview.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <div className="w-[300px] h-full bg-background border-r border-border flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">History</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="px-4 pb-2">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1.5 h-6 w-6"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-sm truncate pr-2">
                    {conversation.title}
                  </h3>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {conversation.date}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {conversation.preview}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? (
                <p>No conversations found matching "{searchQuery}"</p>
              ) : (
                <p>No conversation history yet</p>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HistorySidebar;
