import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CommunityManager from "./CommunityManager";

interface CommunityPageProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const CommunityPage = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  notificationCount = 3,
}: CommunityPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar
        activePage="community"
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={notificationCount}
      />

      {/* Main Content */}
      <main className="pt-20 px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        <CommunityManager userName={userName} userAvatar={userAvatar} />
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2023 LearnSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CommunityPage;
