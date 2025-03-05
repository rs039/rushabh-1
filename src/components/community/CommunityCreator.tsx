import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Upload, Plus, Hash } from "lucide-react";

interface CommunityCreatorProps {
  onCreateCommunity?: (communityData: CommunityData) => void;
  onCancel?: () => void;
}

interface CommunityData {
  name: string;
  description: string;
  avatar: string;
  channels: string[];
}

const CommunityCreator = ({
  onCreateCommunity = () => {},
  onCancel = () => {},
}: CommunityCreatorProps) => {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityAvatar, setCommunityAvatar] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Community",
  );
  const [newChannel, setNewChannel] = useState("");
  const [channels, setChannels] = useState<string[]>(["general", "welcome"]);

  const handleAddChannel = () => {
    if (newChannel.trim() && !channels.includes(newChannel.trim())) {
      setChannels([...channels, newChannel.trim()]);
      setNewChannel("");
    }
  };

  const handleRemoveChannel = (channel: string) => {
    setChannels(channels.filter((c) => c !== channel));
  };

  const handleCreateCommunity = () => {
    if (communityName.trim()) {
      onCreateCommunity({
        name: communityName,
        description: communityDescription,
        avatar: communityAvatar,
        channels: channels,
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would handle file upload
    // For now, we'll just generate a new avatar with the community name as seed
    if (communityName) {
      setCommunityAvatar(
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(communityName)}`,
      );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Create New Community
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={communityAvatar} alt="Community Avatar" />
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <div className="relative">
              <Button variant="outline" size="sm" className="text-xs">
                <Upload className="h-3 w-3 mr-1" /> Change
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </Button>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="community-name">Community Name</Label>
              <Input
                id="community-name"
                placeholder="Enter community name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="community-description">Description</Label>
              <Textarea
                id="community-description"
                placeholder="Describe what your community is about"
                className="h-24"
                value={communityDescription}
                onChange={(e) => setCommunityDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="flex items-center mb-2">
            <Hash className="h-4 w-4 mr-1" /> Channels
          </Label>
          <div className="flex mb-2">
            <Input
              placeholder="Add a channel"
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleAddChannel}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>

          <div className="border rounded-md p-2 bg-gray-50">
            {channels.length > 0 ? (
              <ul className="space-y-1">
                {channels.map((channel) => (
                  <li
                    key={channel}
                    className="flex items-center justify-between p-2 bg-white rounded border"
                  >
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{channel}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveChannel(channel)}
                      className="h-6 w-6 p-0"
                      disabled={channel === "general" || channel === "welcome"}
                    >
                      &times;
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm p-2">
                No channels added yet. Add at least one channel.
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2 border-t pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleCreateCommunity}
          disabled={!communityName.trim() || channels.length === 0}
        >
          <Users className="h-4 w-4 mr-2" /> Create Community
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityCreator;
