import React from "react";
import Navbar from "../layout/Navbar";
import AIChat from "./AIChat";

interface ChatbotPageProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const ChatbotPage = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  notificationCount = 3,
}: ChatbotPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar
        activePage="dashboard"
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={notificationCount}
      />

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-6 pb-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">AI Learning Assistant</h1>
          <p className="text-gray-500">
            Chat with our AI to get personalized learning recommendations and
            assistance
          </p>
        </div>

        <div className="h-[600px]">
          <AIChat userName={userName} userAvatar={userAvatar} />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2023 LearnSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChatbotPage;
