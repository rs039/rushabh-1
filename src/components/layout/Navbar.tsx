import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  Users,
  Briefcase,
  Bell,
  Search,
  User,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activePage?: "dashboard" | "schedule" | "community" | "jobs";
  userAvatar?: string;
  userName?: string;
  notificationCount?: number;
}

const Navbar = ({
  activePage,
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  userName = "John Doe",
  notificationCount = 3,
}: NavbarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // If activePage is not provided, determine it from the current path
  const currentPage =
    activePage ||
    (() => {
      if (currentPath === "/") return "dashboard";
      if (currentPath === "/schedule") return "schedule";
      if (currentPath === "/community") return "community";
      if (currentPath === "/jobs") return "jobs";
      return "dashboard";
    })();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Community",
      path: "/community",
      icon: <Users className="h-5 w-5" />,
    },
    { name: "Jobs", path: "/jobs", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Chat", path: "/chat", icon: <Brain className="h-5 w-5" /> },
  ];

  return (
    <nav className="w-full h-16 px-4 md:px-6 bg-white border-b border-gray-200 flex items-center justify-between fixed top-0 left-0 z-50">
      {/* Logo and Brand */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">LS</span>
          </div>
          <span className="font-bold text-xl hidden md:block">LearnSync</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path}>
            <Button
              variant={
                currentPage === item.name.toLowerCase() ? "default" : "ghost"
              }
              className={cn(
                "flex items-center gap-2",
                currentPage === item.name.toLowerCase() ? "bg-primary/90" : "",
              )}
            >
              {item.icon}
              <span>{item.name}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-center flex-1">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path}>
              <Button
                variant={
                  currentPage === item.name.toLowerCase() ? "default" : "ghost"
                }
                size="icon"
                className={cn(
                  currentPage === item.name.toLowerCase()
                    ? "bg-primary/90"
                    : "",
                )}
                aria-label={item.name}
              >
                {item.icon}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side - Search, Notifications, Profile */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>

        <div className="relative group">
          <Avatar className="h-8 w-8 border border-gray-200 cursor-pointer">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={() => {
                // Sign out logic will be handled by the AuthContext
                window.location.href = "/login";
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
