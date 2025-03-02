import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
  /**
   * The content of the message
   */
  content: string;
  /**
   * Whether the message is from the user or the AI
   */
  isUser?: boolean;
  /**
   * The timestamp of when the message was sent
   */
  timestamp?: string;
  /**
   * The avatar URL for the sender
   */
  avatarUrl?: string;
  /**
   * The name of the sender
   */
  senderName?: string;
}

const MessageBubble = ({
  content = "Hello, how can I help you today?",
  isUser = false,
  timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  avatarUrl = isUser
    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant",
  senderName = isUser ? "You" : "AI Assistant",
}: MessageBubbleProps) => {
  return (
    <div
      className={cn(
        "flex w-full max-w-full gap-3 p-4 bg-white",
        isUser ? "justify-end" : "justify-start",
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={senderName} />
            <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[80%]",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-700">
            {senderName}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs text-gray-500 cursor-default">
                  {timestamp}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sent at {timestamp}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          className={cn(
            "p-3 rounded-lg",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-gray-100 text-gray-800 rounded-tl-none",
          )}
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={senderName} />
            <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
