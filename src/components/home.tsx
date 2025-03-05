import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./layout/Navbar";
import CourseRecommendations from "./dashboard/CourseRecommendations";
import ScreenTimeAnalytics from "./dashboard/ScreenTimeAnalytics";
import CommunityPreview from "./dashboard/CommunityPreview";
import ScheduleGenerator from "./schedule/ScheduleGenerator";

interface HomeProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const Home = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  notificationCount = 3,
}: HomeProps) => {
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
      <main className="pt-20 px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Welcome back, {userName.split(" ")[0]}!
          </h1>
          <p className="text-gray-500">
            Here's an overview of your learning journey
          </p>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Schedule Generator */}
          <div className="lg:col-span-12">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Learning Schedule Generator</h2>
              <p className="text-gray-500">
                Create a personalized learning plan based on your goals
              </p>
            </div>
            <div>
              <ScheduleGenerator />
            </div>
          </div>

          {/* Right Column - Screen Time Analytics */}
          <div className="lg:col-span-5">
            <div className="h-[420px]">
              <ScreenTimeAnalytics />
            </div>
          </div>

          {/* Left Column - Course Recommendations */}
          <div className="lg:col-span-7">
            <div className="h-[380px]">
              <CourseRecommendations />
            </div>
          </div>

          {/* Right Column - Community Preview */}
          <div className="lg:col-span-5">
            <div className="h-[380px]">
              <CommunityPreview />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white border-t border-gray-200 text-center text-sm text-gray-500">
        <p>© 2023 LearnSync. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
