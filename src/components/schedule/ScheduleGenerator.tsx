import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  Calendar,
  Clock,
  Loader2,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface ScheduleGeneratorProps {
  onScheduleGenerated?: (schedule: ScheduleDay[]) => void;
}

interface ScheduleDay {
  day: number;
  date: string;
  tasks: ScheduleTask[];
}

interface ScheduleTask {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: "study" | "practice" | "review" | "break";
  resources?: string[];
}

const ScheduleGenerator = ({ onScheduleGenerated }: ScheduleGeneratorProps) => {
  const [learningGoal, setLearningGoal] = useState("");
  const [numDays, setNumDays] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<
    ScheduleDay[] | null
  >(null);
  const [learningInsights, setLearningInsights] = useState<string[]>([]);

  // Mock function to simulate AI schedule generation
  const generateSchedule = () => {
    if (!learningGoal.trim()) return;

    setIsGenerating(true);
    setGeneratedSchedule(null);
    setLearningInsights([]);

    // Simulate API call delay
    setTimeout(() => {
      // Mock learning insights based on the goal
      const mockInsights = [
        "Focus on practical exercises to reinforce theoretical concepts",
        "Allocate time for reviewing previous material before moving to new topics",
        "Include short breaks to maintain focus and improve retention",
        "Dedicate time for project-based learning to apply concepts",
        "Schedule regular assessments to track progress",
      ];

      // Generate mock schedule
      const mockSchedule: ScheduleDay[] = [];
      const today = new Date();

      for (let i = 0; i < numDays; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const formattedDate = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        });

        const tasks: ScheduleTask[] = [];

        // Morning study session
        tasks.push({
          id: `day${i + 1}-task1`,
          title: `${learningGoal.split(" ").slice(0, 3).join(" ")} Fundamentals`,
          description: `Core concepts and theory of ${learningGoal}`,
          startTime: "09:00 AM",
          endTime: "10:30 AM",
          type: "study",
          resources: ["Online documentation", "Video tutorials"],
        });

        // Break
        tasks.push({
          id: `day${i + 1}-break1`,
          title: "Short Break",
          description: "Rest and refresh",
          startTime: "10:30 AM",
          endTime: "10:45 AM",
          type: "break",
        });

        // Practice session
        tasks.push({
          id: `day${i + 1}-task2`,
          title: "Practical Exercises",
          description: `Apply concepts learned in the morning session`,
          startTime: "10:45 AM",
          endTime: "12:15 PM",
          type: "practice",
          resources: ["Practice problems", "Coding exercises"],
        });

        // Afternoon review
        tasks.push({
          id: `day${i + 1}-task3`,
          title: "Review Session",
          description: "Consolidate knowledge and identify gaps",
          startTime: "02:00 PM",
          endTime: "03:30 PM",
          type: "review",
        });

        // Project work
        if (i % 2 === 0) {
          // Every other day
          tasks.push({
            id: `day${i + 1}-task4`,
            title: "Project Work",
            description: `Apply ${learningGoal} concepts to a real-world project`,
            startTime: "04:00 PM",
            endTime: "05:30 PM",
            type: "practice",
            resources: ["Project guidelines", "Reference materials"],
          });
        }

        mockSchedule.push({
          day: i + 1,
          date: formattedDate,
          tasks,
        });
      }

      setLearningInsights(mockInsights);
      setGeneratedSchedule(mockSchedule);
      setIsGenerating(false);

      if (onScheduleGenerated) {
        onScheduleGenerated(mockSchedule);
      }
    }, 3000); // Simulate 3 second delay for AI processing
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case "study":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "practice":
        return "bg-green-100 text-green-800 border-green-300";
      case "review":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "break":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case "study":
        return <BookOpen className="h-4 w-4 mr-1" />;
      case "practice":
        return <Sparkles className="h-4 w-4 mr-1" />;
      case "review":
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case "break":
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return <BookOpen className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-white shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Brain className="h-6 w-6 mr-2 text-primary" />
            AI Learning Schedule Generator
          </CardTitle>
          <p className="text-gray-500 mt-1">
            Enter your learning goal and timeframe to generate a personalized
            study schedule
          </p>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="learning-goal" className="text-base font-medium">
                What do you want to learn?
              </Label>
              <Textarea
                id="learning-goal"
                placeholder="E.g., Learn Python programming for data science, Master React.js fundamentals, Study machine learning algorithms..."
                className="mt-1 h-24"
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="num-days" className="text-base font-medium">
                Number of days for your learning plan
              </Label>
              <div className="flex items-center mt-1">
                <Input
                  id="num-days"
                  type="number"
                  min="1"
                  max="30"
                  value={numDays}
                  onChange={(e) => setNumDays(parseInt(e.target.value) || 7)}
                  className="w-24"
                />
                <span className="ml-2 text-gray-500">days</span>
              </div>
            </div>

            <Button
              onClick={generateSchedule}
              disabled={!learningGoal.trim() || isGenerating}
              className="w-full mt-4"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating your personalized schedule...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Learning Schedule
                </>
              )}
            </Button>
          </div>

          {isGenerating && (
            <div className="mt-6 text-center">
              <p className="text-gray-500 mb-2">
                Analyzing your learning goal...
              </p>
              <Progress value={45} className="h-2 max-w-md mx-auto" />
            </div>
          )}

          {learningInsights.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                AI Learning Insights
              </h3>
              <Card className="bg-purple-50 border border-purple-200">
                <CardContent className="pt-4">
                  <ul className="space-y-2">
                    {learningInsights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-purple-200 text-purple-800 text-xs mr-2 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>

        {generatedSchedule && (
          <>
            <Separator className="my-2" />
            <CardHeader className="pb-0 pt-4">
              <CardTitle className="text-xl font-bold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Your {numDays}-Day Learning Schedule
              </CardTitle>
              <p className="text-gray-500 mt-1">
                Personalized schedule for:{" "}
                <span className="font-medium">{learningGoal}</span>
              </p>
            </CardHeader>

            <CardContent className="pt-4">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  {generatedSchedule.map((day) => (
                    <div
                      key={day.day}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="bg-gray-100 p-3 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold">Day {day.day}</h3>
                          <Badge variant="outline" className="bg-white">
                            {day.date}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-3 space-y-3">
                        {day.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`border rounded-md p-3 ${getTaskTypeColor(task.type)}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium flex items-center">
                                  {getTaskTypeIcon(task.type)}
                                  {task.title}
                                </h4>
                                <p className="text-sm mt-1">
                                  {task.description}
                                </p>
                              </div>
                              <Badge variant="outline" className="bg-white/80">
                                {task.startTime} - {task.endTime}
                              </Badge>
                            </div>

                            {task.resources && task.resources.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                <p className="text-xs font-medium mb-1">
                                  Recommended Resources:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {task.resources.map((resource, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {resource}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
              <Button>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Save Schedule
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default ScheduleGenerator;
