import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Settings, Volume2, MessageSquare, User, Clock } from "lucide-react";

interface SettingsPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SettingsPanel = ({
  isOpen = true,
  onClose = () => {},
}: SettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState("personality");
  const [settings, setSettings] = useState({
    personality: "friendly",
    responseLength: "balanced",
    voiceEnabled: true,
    voiceVolume: 80,
    darkMode: false,
    notifications: true,
    saveHistory: true,
    autoDeleteHistory: false,
    deleteAfterDays: 30,
  });

  const handleSwitchChange = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSliderChange = (key: string, value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value[0],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-900 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger
              value="personality"
              className="flex items-center gap-1"
            >
              <User className="h-4 w-4" />
              <span>Personality</span>
            </TabsTrigger>
            <TabsTrigger value="responses" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>Responses</span>
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-1"
            >
              <Settings className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personality" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">AI Personality</label>
                <Select
                  value={settings.personality}
                  onValueChange={(value) =>
                    handleSelectChange("personality", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select personality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Length</label>
                <Select
                  value={settings.responseLength}
                  onValueChange={(value) =>
                    handleSelectChange("responseLength", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Voice Responses</label>
                  <Switch
                    checked={settings.voiceEnabled}
                    onCheckedChange={() => handleSwitchChange("voiceEnabled")}
                  />
                </div>
              </div>

              {settings.voiceEnabled && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Volume2 className="h-4 w-4" />
                      Voice Volume
                    </label>
                    <span className="text-sm">{settings.voiceVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.voiceVolume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      handleSliderChange("voiceVolume", value)
                    }
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Dark Mode</label>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={() => handleSwitchChange("darkMode")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Notifications</label>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={() => handleSwitchChange("notifications")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Save Chat History
                  </label>
                  <Switch
                    checked={settings.saveHistory}
                    onCheckedChange={() => handleSwitchChange("saveHistory")}
                  />
                </div>
              </div>

              {settings.saveHistory && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Auto-delete History
                    </label>
                    <Switch
                      checked={settings.autoDeleteHistory}
                      onCheckedChange={() =>
                        handleSwitchChange("autoDeleteHistory")
                      }
                    />
                  </div>

                  {settings.autoDeleteHistory && (
                    <div className="space-y-2 pl-6 mt-2">
                      <label className="text-sm font-medium">
                        Delete after
                      </label>
                      <Select
                        value={settings.deleteAfterDays.toString()}
                        onValueChange={(value) =>
                          handleSelectChange("deleteAfterDays", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsPanel;
