import React from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SuggestionChip {
  id: string;
  text: string;
  tooltip?: string;
}

interface SuggestionChipsProps {
  suggestions?: SuggestionChip[];
  onChipClick?: (suggestion: SuggestionChip) => void;
  className?: string;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  suggestions = [
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
    { id: "4", text: "Summarize an article", tooltip: "Content summarization" },
    { id: "5", text: "Weather forecast", tooltip: "Check the weather" },
    { id: "6", text: "Set a reminder", tooltip: "Manage your schedule" },
  ],
  onChipClick = () => {},
  className = "",
}) => {
  return (
    <div className={`w-full bg-gray-50 py-3 px-4 overflow-x-auto ${className}`}>
      <div className="flex space-x-2 min-w-max">
        <TooltipProvider>
          {suggestions.map((suggestion) => (
            <Tooltip key={suggestion.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white hover:bg-gray-100 border-gray-200 text-gray-700 whitespace-nowrap"
                  onClick={() => onChipClick(suggestion)}
                >
                  {suggestion.text}
                </Button>
              </TooltipTrigger>
              {suggestion.tooltip && (
                <TooltipContent>
                  <p>{suggestion.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SuggestionChips;
