import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  PieChart,
  Activity,
  Clock,
  Zap,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface ScreenTimeAnalyticsProps {
  dailyUsage?: number;
  weeklyUsage?: number;
  productivityScore?: number;
  appUsageData?: {
    name: string;
    percentage: number;
    trend: "up" | "down" | "neutral";
  }[];
  suggestions?: string[];
}

const ScreenTimeAnalytics = ({
  dailyUsage = 4.5,
  weeklyUsage = 28.3,
  productivityScore = 72,
  appUsageData = [
    { name: "LearnSync", percentage: 45, trend: "up" },
    { name: "YouTube", percentage: 25, trend: "down" },
    { name: "Documentation", percentage: 20, trend: "up" },
    { name: "Social Media", percentage: 10, trend: "down" },
  ],
  suggestions = [
    "Try the Pomodoro technique for better focus",
    "Schedule dedicated learning blocks",
    "Reduce social media during study hours",
  ],
}: ScreenTimeAnalyticsProps) => {
  // Helper function to render trend icons
  const renderTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-[360px] h-[420px] overflow-hidden flex flex-col bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">
            Screen Time Analytics
          </CardTitle>
          <Activity className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto">
        {/* Usage Summary */}
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Daily</p>
              <p className="text-lg font-bold">{dailyUsage}h</p>
            </div>
          </div>
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-2 text-purple-500" />
            <div>
              <p className="text-sm font-medium">Weekly</p>
              <p className="text-lg font-bold">{weeklyUsage}h</p>
            </div>
          </div>
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-2 text-yellow-500" />
            <div>
              <p className="text-sm font-medium">Productivity</p>
              <p className="text-lg font-bold">{productivityScore}%</p>
            </div>
          </div>
        </div>

        {/* Productivity Score */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Productivity Score</h4>
            <span className="text-xs text-gray-500">{productivityScore}%</span>
          </div>
          <Progress value={productivityScore} className="h-2" />
        </div>

        {/* App Usage Breakdown */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3">App Usage Breakdown</h4>
          <div className="space-y-3">
            {appUsageData.map((app, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full mr-2"
                    style={{
                      backgroundColor: [
                        "#4f46e5",
                        "#ef4444",
                        "#10b981",
                        "#f59e0b",
                      ][index % 4],
                    }}
                  ></div>
                  <span className="text-xs">{app.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs mr-1">{app.percentage}%</span>
                  {renderTrendIcon(app.trend)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <PieChart className="h-4 w-4 mr-1 text-primary" />
            <span>AI Improvement Suggestions</span>
          </h4>
          <ul className="text-xs space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center mr-2 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-gray-700">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenTimeAnalytics;
