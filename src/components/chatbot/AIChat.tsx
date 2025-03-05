import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Brain, Send, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { callLLMApi, ChatMessage } from "./api";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface AIChatProps {
  userName?: string;
  userAvatar?: string;
}

const AIChat = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
}: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI learning assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    setError(null);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Format messages for the API
      const apiMessages: ChatMessage[] = [
        {
          role: "system",
          content: `You are an AI learning assistant named LearnSync. You help users with their educational journey, 
          providing personalized learning recommendations, study techniques, and answering questions about various subjects. 
          Be concise, helpful, and encouraging. The user's name is ${userName}.`,
        },
        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content,
        })),
        {
          role: "user",
          content: inputMessage,
        },
      ];

      // Call the LLM API with Gemini API key
      const aiResponse = await callLLMApi(
        apiMessages,
        import.meta.env.VITE_GEMINI_API_KEY,
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling LLM API:", error);
      setError("Failed to get a response. Please try again later.");

      // Fallback responses if API fails
      const fallbackResponses = [
        "I can help you with that! Let me find some resources for you.",
        "That's a great question about learning. Here's what I think...",
        "Based on your learning goals, I'd recommend focusing on these key areas...",
        "I've analyzed your progress, and you're doing well! Consider these next steps...",
        "Let me create a personalized study plan for that topic.",
      ];

      const fallbackResponse =
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm having trouble connecting to my knowledge base right now. " +
          fallbackResponse,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-full flex flex-col bg-white overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Learning Assistant</CardTitle>
            <p className="text-sm text-gray-500">Powered by Google Gemini AI</p>
          </div>
        </div>
      </CardHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8 mt-1 mx-2">
                  {message.sender === "user" ? (
                    <AvatarImage src={userAvatar} alt={userName} />
                  ) : (
                    <div className="bg-primary h-full w-full flex items-center justify-center text-white">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  <AvatarFallback>
                    {message.sender === "user" ? userName.charAt(0) : "AI"}
                  </AvatarFallback>
                </Avatar>

                <div
                  className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70 text-right">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%]">
                <Avatar className="h-8 w-8 mt-1 mx-2">
                  <div className="bg-primary h-full w-full flex items-center justify-center text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>

                <div className="rounded-lg p-4 bg-gray-100 text-gray-800">
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        {error && (
          <div className="mb-2 p-2 bg-red-50 text-red-600 rounded-md flex items-center text-sm">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}
        <div className="flex">
          <Input
            placeholder="Ask me anything about your learning journey..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 mr-2"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <Sparkles className="h-3 w-3 mr-1 text-primary" />
          <span>
            AI can help with course recommendations, learning schedules, and
            study techniques
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AIChat;
