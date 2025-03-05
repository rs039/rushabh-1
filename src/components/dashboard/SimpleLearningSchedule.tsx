import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskItem from "./TaskItem";

interface Task {
  id: string;
  title: string;
  timeStart: string;
  timeEnd: string;
  completed: boolean;
}

interface SimpleLearningScheduleProps {
  date?: string;
  tasks?: Task[];
  completedTasksCount?: number;
  totalTasksCount?: number;
  onCompleteTask?: (taskId: string) => void;
  onRescheduleTask?: (taskId: string) => void;
  onViewCalendar?: () => void;
  onViewAISuggestions?: () => void;
}

const SimpleLearningSchedule = ({
  date = "Wednesday, March 5, 2025",
  tasks = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      timeStart: "9:00 AM",
      timeEnd: "10:30 AM",
      completed: false,
    },
    {
      id: "2",
      title: "Data Structures Practice",
      timeStart: "11:00 AM",
      timeEnd: "12:30 PM",
      completed: false,
    },
    {
      id: "3",
      title: "Web Development Tutorial",
      timeStart: "2:00 PM",
      timeEnd: "3:30 PM",
      completed: false,
    },
  ],
  completedTasksCount = 2,
  totalTasksCount = 6,
  onCompleteTask = (taskId) => console.log(`Complete task ${taskId}`),
  onRescheduleTask = (taskId) => console.log(`Reschedule task ${taskId}`),
  onViewCalendar = () => console.log("View calendar"),
  onViewAISuggestions = () => console.log("View AI suggestions"),
}: SimpleLearningScheduleProps) => {
  const progressPercentage = Math.round(
    (completedTasksCount / totalTasksCount) * 100,
  );

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Learning Schedule</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600">{date}</div>
          <Button variant="outline" size="sm" onClick={onViewCalendar}>
            <Calendar className="h-4 w-4 mr-2" /> View Calendar
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Overall Progress: {completedTasksCount} of {totalTasksCount} tasks
              completed
            </span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-md font-semibold">Today's Tasks</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs"
            onClick={onViewAISuggestions}
          >
            <Brain className="h-3 w-3 mr-1" /> AI Suggestions
          </Button>
        </div>

        <div>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              timeStart={task.timeStart}
              timeEnd={task.timeEnd}
              completed={task.completed}
              onComplete={() => onCompleteTask(task.id)}
              onReschedule={() => onRescheduleTask(task.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleLearningSchedule;
