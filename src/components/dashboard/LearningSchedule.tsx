import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  Clock,
  Calendar,
  RotateCcw,
  Brain,
  ArrowRight,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  progress: number;
}

interface LearningScheduleProps {
  tasks?: Task[];
  completedTasks?: number;
  totalTasks?: number;
  onCompleteTask?: (taskId: string) => void;
  onRescheduleTask?: (taskId: string) => void;
}

const LearningSchedule = ({
  tasks = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      time: "9:00 AM - 10:30 AM",
      completed: false,
      progress: 0,
    },
    {
      id: "2",
      title: "Data Structures Practice",
      time: "11:00 AM - 12:30 PM",
      completed: false,
      progress: 0,
    },
    {
      id: "3",
      title: "Web Development Tutorial",
      time: "2:00 PM - 3:30 PM",
      completed: false,
      progress: 0,
    },
    {
      id: "4",
      title: "Python Programming",
      time: "4:00 PM - 5:30 PM",
      completed: false,
      progress: 0,
    },
  ],
  completedTasks = 2,
  totalTasks = 6,
  onCompleteTask = (taskId) => console.log(`Task ${taskId} completed`),
  onRescheduleTask = (taskId) => console.log(`Task ${taskId} rescheduled`),
}: LearningScheduleProps) => {
  // Calculate overall progress percentage
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Get today's date in a readable format
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Learning Schedule</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formattedDate}</span>
            </Badge>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" /> View Calendar
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Overall Progress: {completedTasks} of {totalTasks} tasks completed
            </span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold">Today's Tasks</h3>
            <Button variant="ghost" size="sm" className="text-xs">
              <Brain className="h-3 w-3 mr-1" /> AI Suggestions
            </Button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3 rounded-lg border ${task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${task.completed ? "bg-green-100 text-green-600" : "border border-gray-300"}`}
                    >
                      {task.completed && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <h4
                        className={`font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                      >
                        {task.title}
                      </h4>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{task.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!task.completed ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs"
                          onClick={() => onRescheduleTask(task.id)}
                        >
                          <RotateCcw className="h-3 w-3 mr-1" /> Reschedule
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => onCompleteTask(task.id)}
                        >
                          <Check className="h-3 w-3 mr-1" /> Complete
                        </Button>
                      </>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-green-600 bg-green-50"
                      >
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>
                {task.progress > 0 && !task.completed && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium">
                        {task.progress}%
                      </span>
                    </div>
                    <Progress value={task.progress} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center"
            >
              View All Tasks <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningSchedule;
