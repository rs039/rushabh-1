import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import ScheduleGenerator from "./ScheduleGenerator";

interface SchedulePageProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const SchedulePage = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  notificationCount = 3,
}: SchedulePageProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar
        activePage="schedule"
        userName={userName}
        userAvatar={userAvatar}
        notificationCount={notificationCount}
      />

      {/* Main Content */}
      <main className="pt-24 px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Learning Schedule Generator</h1>
          <p className="text-gray-500">
            Create a personalized learning plan based on your goals and
            timeframe
          </p>
        </div>

        <ScheduleGenerator />
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white border-t border-gray-200 text-center text-sm text-gray-500 mt-10">
        <p>© 2023 LearnSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SchedulePage;
