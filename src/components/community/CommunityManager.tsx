import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Settings, MessageSquare, Video, Mic } from "lucide-react";
import CommunityCreator from "./CommunityCreator";
import DiscordCommunity from "./DiscordCommunity";

interface Community {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  channels: string[];
  isJoined: boolean;
}

interface CommunityManagerProps {
  userName?: string;
  userAvatar?: string;
}

const CommunityManager = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
}: CommunityManagerProps) => {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: "1",
      name: "Machine Learning Enthusiasts",
      description:
        "A community for discussing machine learning concepts, algorithms, and applications.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ML",
      memberCount: 128,
      channels: [
        "welcome",
        "general",
        "algorithms",
        "neural-networks",
        "study-voice",
      ],
      isJoined: true,
    },
    {
      id: "2",
      name: "Web Development Bootcamp",
      description:
        "Learn modern web development frameworks and best practices together.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=WD",
      memberCount: 95,
      channels: ["welcome", "general", "html-css", "javascript", "frameworks"],
      isJoined: false,
    },
    {
      id: "3",
      name: "Data Science Study Group",
      description:
        "Weekly sessions on data analysis, visualization, and statistics.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DS",
      memberCount: 64,
      channels: ["welcome", "general", "python", "r-language", "projects"],
      isJoined: false,
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeCommunity, setActiveCommunity] = useState<Community | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("discover");

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(
      communities.map((community) =>
        community.id === communityId
          ? { ...community, isJoined: true }
          : community,
      ),
    );
  };

  const handleLeaveCommunity = (communityId: string) => {
    setCommunities(
      communities.map((community) =>
        community.id === communityId
          ? { ...community, isJoined: false }
          : community,
      ),
    );

    if (activeCommunity?.id === communityId) {
      setActiveCommunity(null);
    }
  };

  const handleCreateCommunity = (communityData: any) => {
    const newCommunity: Community = {
      id: `${communities.length + 1}`,
      name: communityData.name,
      description: communityData.description,
      avatar: communityData.avatar,
      memberCount: 1, // Just the creator
      channels: communityData.channels,
      isJoined: true, // Auto-join created communities
    };

    setCommunities([...communities, newCommunity]);
    setShowCreateDialog(false);
    setActiveTab("joined");
  };

  const handleEnterCommunity = (community: Community) => {
    setActiveCommunity(community);
  };

  const handleBackToCommunities = () => {
    setActiveCommunity(null);
  };

  if (activeCommunity) {
    return (
      <div className="h-full">
        <div className="bg-gray-800 text-white p-2 flex items-center">
          <Button
            variant="ghost"
            onClick={handleBackToCommunities}
            className="text-white mr-2"
          >
            &larr; Back
          </Button>
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={activeCommunity.avatar}
              alt={activeCommunity.name}
            />
            <AvatarFallback>{activeCommunity.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="font-bold">{activeCommunity.name}</h2>
        </div>
        <DiscordCommunity userName={userName} userAvatar={userAvatar} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Learning Communities</h1>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Create Community
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <CommunityCreator
              onCreateCommunity={handleCreateCommunity}
              onCancel={() => setShowCreateDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        defaultValue="discover"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="discover" className="flex items-center">
            <Users className="h-4 w-4 mr-2" /> Discover
          </TabsTrigger>
          <TabsTrigger value="joined" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" /> Joined Communities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities
              .filter((c) => !c.isJoined)
              .map((community) => (
                <Card key={community.id} className="overflow-hidden">
                  <div className="bg-gray-100 p-4 flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage
                        src={community.avatar}
                        alt={community.name}
                      />
                      <AvatarFallback>
                        {community.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{community.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{community.memberCount} members</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600 mb-4">
                      {community.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {community.channels.slice(0, 3).map((channel) => (
                        <Badge
                          key={channel}
                          variant="secondary"
                          className="text-xs"
                        >
                          #{channel}
                        </Badge>
                      ))}
                      {community.channels.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{community.channels.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={() => handleJoinCommunity(community.id)}>
                        Join Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {communities.filter((c) => !c.isJoined).length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No communities to discover. Why not create one?
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setShowCreateDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Create Community
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="joined" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communities
              .filter((c) => c.isJoined)
              .map((community) => (
                <Card key={community.id} className="overflow-hidden">
                  <div className="bg-gray-100 p-4 flex items-center">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage
                        src={community.avatar}
                        alt={community.name}
                      />
                      <AvatarFallback>
                        {community.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{community.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{community.memberCount} members</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                        onClick={() => handleEnterCommunity(community)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" /> Chat
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                      >
                        <Video className="h-3 w-3 mr-1" /> Video
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                      >
                        <Mic className="h-3 w-3 mr-1" /> Voice
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs"
                      >
                        <Settings className="h-3 w-3 mr-1" /> Settings
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <Avatar
                            key={i}
                            className="h-6 w-6 border-2 border-white"
                          >
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${community.name}${i}`}
                            />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border-2 border-white">
                          +{community.memberCount - 3}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleLeaveCommunity(community.id)}
                      >
                        Leave
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {communities.filter((c) => c.isJoined).length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  You haven't joined any communities yet.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setActiveTab("discover")}
                >
                  <Users className="h-4 w-4 mr-2" /> Discover Communities
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityManager;
