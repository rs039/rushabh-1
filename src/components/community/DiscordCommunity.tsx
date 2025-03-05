import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Hash,
  Users,
  Plus,
  Settings,
  Search,
  Bell,
  Mic,
  Headphones,
  Video,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  reactions?: {
    emoji: string;
    count: number;
  }[];
  attachment?: {
    name: string;
    type: string;
  };
}

interface DiscordCommunityProps {
  userName?: string;
  userAvatar?: string;
}

const DiscordCommunity = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
}: DiscordCommunityProps) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeChannel, setActiveChannel] = useState("welcome");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey everyone! I just found this amazing resource on deep learning. Check it out: https://deeplearning.ai",
      sender: {
        name: "Alex Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      timestamp: "Today at 10:30 AM",
      reactions: [
        { emoji: "👍", count: 3 },
        { emoji: "🔥", count: 2 },
      ],
    },
    {
      id: "2",
      content: "Thanks for sharing! I've been looking for something like this.",
      sender: {
        name: "Maria Lopez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
      },
      timestamp: "Today at 10:35 AM",
    },
    {
      id: "3",
      content:
        "I'm working on a project using TensorFlow. Anyone interested in collaborating?",
      sender: {
        name: "Jamal Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamal",
      },
      timestamp: "Today at 11:15 AM",
      attachment: {
        name: "project_outline.pdf",
        type: "document",
      },
    },
    {
      id: "4",
      content:
        "@Jamal Wilson I'd be interested! I've been working with TensorFlow for a few months now.",
      sender: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      timestamp: "Today at 11:20 AM",
    },
    {
      id: "5",
      content:
        "Has anyone tried the new GPT-4 API? The capabilities are pretty impressive.",
      sender: {
        name: "David Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      },
      timestamp: "Today at 12:05 PM",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: `${Date.now()}`,
        content: messageInput,
        sender: {
          name: userName,
          avatar: userAvatar,
        },
        timestamp: `Today at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      };

      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Server List */}
        <div className="w-[72px] bg-gray-900 flex flex-col items-center py-4 space-y-2 overflow-y-auto">
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-white hover:bg-primary/90 mb-2"
          >
            <span className="text-lg font-bold">LS</span>
          </Button>
          <Separator className="w-8 bg-gray-700" />

          {/* Server Icons */}
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-primary/20 relative"
          >
            <span className="text-sm font-bold">ML</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <span className="text-sm font-bold">WD</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <span className="text-sm font-bold">DS</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <span className="text-sm font-bold">UI</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600"
          >
            <span className="text-sm font-bold">MD</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-gray-700 hover:bg-gray-600 text-green-500"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Channel List */}
        <div className="w-60 bg-gray-800 flex flex-col">
          <div className="p-4 shadow-md">
            <h2 className="font-bold text-lg">Machine Learning</h2>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {/* GENERAL Category */}
              <div className="mb-4">
                <div className="flex items-center px-2 mb-1">
                  <h3 className="text-xs font-semibold text-gray-400">
                    GENERAL
                  </h3>
                </div>
                <div className="space-y-0.5">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 bg-gray-700"
                    onClick={() => setActiveChannel("welcome")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">welcome</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("announcements")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">announcements</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("general")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">general</span>
                      <Badge variant="destructive" className="ml-auto text-xs">
                        5
                      </Badge>
                    </div>
                  </Button>
                </div>
              </div>

              {/* STUDY GROUPS Category */}
              <div className="mb-4">
                <div className="flex items-center px-2 mb-1">
                  <h3 className="text-xs font-semibold text-gray-400">
                    STUDY GROUPS
                  </h3>
                </div>
                <div className="space-y-0.5">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("algorithms")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">algorithms</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("neural-networks")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">neural-networks</span>
                      <Badge variant="destructive" className="ml-auto text-xs">
                        2
                      </Badge>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("study-voice")}
                  >
                    <div className="flex items-center w-full">
                      <Mic className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">study-voice</span>
                    </div>
                  </Button>
                </div>
              </div>

              {/* PROJECTS Category */}
              <div className="mb-4">
                <div className="flex items-center px-2 mb-1">
                  <h3 className="text-xs font-semibold text-gray-400">
                    PROJECTS
                  </h3>
                </div>
                <div className="space-y-0.5">
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("project-ideas")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">project-ideas</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("collaborations")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">collaborations</span>
                    </div>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 py-1 h-8 hover:bg-gray-700"
                    onClick={() => setActiveChannel("showcase")}
                  >
                    <div className="flex items-center w-full">
                      <Hash className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">showcase</span>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-400">Online</p>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Headphones className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-700">
          {/* Channel Header */}
          <div className="h-12 border-b border-gray-600 flex items-center px-4 shadow-sm">
            <Hash className="h-5 w-5 mr-2 text-gray-400" />
            <span className="font-bold">welcome</span>
            <span className="text-gray-400 text-sm ml-2 border-l border-gray-600 pl-2">
              Welcome to the Machine Learning community!
            </span>
            <div className="ml-auto flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Users className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Input
                  placeholder="Search"
                  className="h-7 w-40 bg-gray-900 border-gray-600 text-sm"
                />
                <Search className="h-4 w-4 absolute right-2 top-1.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex hover:bg-gray-750 p-2 rounded"
                >
                  <Avatar className="h-10 w-10 mr-3 mt-0.5">
                    <AvatarImage
                      src={message.sender.avatar}
                      alt={message.sender.name}
                    />
                    <AvatarFallback>
                      {message.sender.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <span className="font-medium mr-2">
                        {message.sender.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>

                    {message.attachment && (
                      <div className="mt-2 p-2 bg-gray-800 rounded border border-gray-600 inline-block">
                        <div className="flex items-center text-blue-400 hover:underline">
                          <Paperclip className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {message.attachment.name}
                          </span>
                        </div>
                      </div>
                    )}

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex mt-2 space-x-1">
                        {message.reactions.map((reaction, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-800 rounded-full px-2 py-0.5 text-xs border border-gray-600"
                          >
                            <span className="mr-1">{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 bg-gray-800">
            <div className="relative">
              <Input
                placeholder="Message #welcome"
                className="bg-gray-700 border-gray-600 pr-24"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Member List */}
        <div className="w-60 bg-gray-800 border-l border-gray-700">
          <div className="p-3 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Members</h3>
              <span className="text-xs text-gray-400">7</span>
            </div>
            <div className="relative mt-2">
              <Input
                placeholder="Search members"
                className="h-7 bg-gray-900 border-gray-600 text-sm"
              />
              <Search className="h-3 w-3 absolute right-2 top-2 text-gray-400" />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-3 space-y-1">
              {/* ONLINE Members */}
              <div className="mb-2">
                <h4 className="text-xs font-semibold text-gray-400 mb-1">
                  ONLINE — 3
                </h4>

                {/* Alex Chen */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                        alt="Alex Chen"
                      />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-500"></span>
                  </div>
                  <div>
                    <p className="text-sm">Alex Chen</p>
                    <p className="text-xs text-gray-400">
                      Studying Neural Networks
                    </p>
                  </div>
                </div>

                {/* Jamal Wilson */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jamal"
                        alt="Jamal Wilson"
                      />
                      <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-500"></span>
                  </div>
                  <div>
                    <p className="text-sm">Jamal Wilson</p>
                  </div>
                </div>

                {/* David Kim */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                        alt="David Kim"
                      />
                      <AvatarFallback>DK</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-500"></span>
                  </div>
                  <div>
                    <p className="text-sm">David Kim</p>
                  </div>
                </div>
              </div>

              {/* IDLE Members */}
              <div className="mb-2">
                <h4 className="text-xs font-semibold text-gray-400 mb-1">
                  IDLE — 1
                </h4>

                {/* Maria Lopez */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                        alt="Maria Lopez"
                      />
                      <AvatarFallback>ML</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-yellow-500"></span>
                  </div>
                  <div>
                    <p className="text-sm">Maria Lopez</p>
                    <p className="text-xs text-gray-400">In voice channel</p>
                  </div>
                </div>
              </div>

              {/* DO NOT DISTURB Members */}
              <div className="mb-2">
                <h4 className="text-xs font-semibold text-gray-400 mb-1">
                  DO NOT DISTURB — 1
                </h4>

                {/* Sarah Johnson */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                        alt="Sarah Johnson"
                      />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-red-500"></span>
                  </div>
                  <div>
                    <p className="text-sm">Sarah Johnson</p>
                    <p className="text-xs text-gray-400">Do not disturb</p>
                  </div>
                </div>
              </div>

              {/* OFFLINE Members */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 mb-1">
                  OFFLINE — 2
                </h4>

                {/* Emma Watson */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
                        alt="Emma Watson"
                      />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-gray-500"></span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Emma Watson</p>
                  </div>
                </div>

                {/* Michael Brown */}
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                        alt="Michael Brown"
                      />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-1 h-3 w-3 rounded-full border-2 border-gray-800 bg-gray-500"></span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Michael Brown</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default DiscordCommunity;
