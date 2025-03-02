import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Menu, Settings, History, X } from "lucide-react";

interface ChatHeaderProps {
  title?: string;
  onToggleHistory?: () => void;
  onToggleSettings?: () => void;
  isHistoryOpen?: boolean;
  isSettingsOpen?: boolean;
}

const ChatHeader = ({
  title = "AI Assistant",
  onToggleHistory = () => {},
  onToggleSettings = () => {},
  isHistoryOpen = false,
  isSettingsOpen = false,
}: ChatHeaderProps) => {
  return (
    <header className="w-full h-16 bg-background border-b border-border flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          aria-label="Menu"
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleHistory}
                className={
                  isHistoryOpen ? "bg-accent text-accent-foreground" : ""
                }
                aria-label="Chat History"
              >
                {isHistoryOpen ? <X size={20} /> : <History size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isHistoryOpen ? "Close History" : "View Chat History"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSettings}
                className={
                  isSettingsOpen ? "bg-accent text-accent-foreground" : ""
                }
                aria-label="Settings"
              >
                {isSettingsOpen ? <X size={20} /> : <Settings size={20} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSettingsOpen ? "Close Settings" : "Open Settings"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default ChatHeader;
