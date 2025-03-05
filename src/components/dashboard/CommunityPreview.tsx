import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageSquare, ArrowRight } from "lucide-react";

interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  isActive?: boolean;
}

interface LearningGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: GroupMember[];
  isActive: boolean;
  lastActivity?: string;
}

interface CommunityPreviewProps {
  groups?: LearningGroup[];
  onViewAll?: () => void;
  onJoinGroup?: (groupId: string) => void;
  onViewGroup?: (groupId: string) => void;
}

const CommunityPreview = ({
  groups = [
    {
      id: "1",
      name: "Machine Learning Enthusiasts",
      description:
        "Discuss ML algorithms, share resources, and collaborate on projects.",
      memberCount: 128,
      members: [
        {
          id: "1",
          name: "Alex Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          isActive: true,
        },
        {
          id: "2",
          name: "Maria Lopez",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
          isActive: false,
        },
        {
          id: "3",
          name: "Jamal Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamal",
          isActive: true,
        },
      ],
      isActive: true,
      lastActivity: "5 minutes ago",
    },
    {
      id: "2",
      name: "Web Development Bootcamp",
      description:
        "Learn modern web development frameworks and best practices.",
      memberCount: 95,
      members: [
        {
          id: "4",
          name: "Sarah Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          isActive: true,
        },
        {
          id: "5",
          name: "David Kim",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
          isActive: true,
        },
      ],
      isActive: true,
      lastActivity: "1 hour ago",
    },
    {
      id: "3",
      name: "Data Science Study Group",
      description:
        "Weekly sessions on data analysis, visualization, and statistics.",
      memberCount: 64,
      members: [
        {
          id: "6",
          name: "Emma Watson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
          isActive: false,
        },
        {
          id: "7",
          name: "Michael Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          isActive: false,
        },
      ],
      isActive: false,
      lastActivity: "2 days ago",
    },
  ],
  onViewAll = () => console.log("View all communities"),
  onJoinGroup = (groupId: string) => console.log(`Join group ${groupId}`),
  onViewGroup = (groupId: string) => console.log(`View group ${groupId}`),
}: CommunityPreviewProps) => {
  return (
    <Card className="w-full h-full overflow-hidden bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            Learning Communities
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={onViewAll}
          >
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {groups.slice(0, 3).map((group) => (
            <div
              key={group.id}
              className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-sm">{group.name}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {group.description}
                  </p>
                </div>
                <Badge
                  variant={group.isActive ? "default" : "secondary"}
                  className="text-xs"
                >
                  {group.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        className="h-6 w-6 border-2 border-white"
                      >
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {group.memberCount > 3 && (
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs border-2 border-white">
                        +{group.memberCount - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{group.memberCount} members</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => onViewGroup(group.id)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1" /> Chat
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => onJoinGroup(group.id)}
                  >
                    Join
                  </Button>
                </div>
              </div>

              {group.lastActivity && (
                <div className="mt-2 text-xs text-gray-400">
                  Last activity: {group.lastActivity}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPreview;
