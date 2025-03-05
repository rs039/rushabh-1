import React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface TaskItemProps {
  title: string;
  timeStart: string;
  timeEnd: string;
  completed?: boolean;
  onComplete?: () => void;
  onReschedule?: () => void;
}

const TaskItem = ({
  title,
  timeStart,
  timeEnd,
  completed = false,
  onComplete = () => console.log(`Complete task: ${title}`),
  onReschedule = () => console.log(`Reschedule task: ${title}`),
}: TaskItemProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <div
              className={`w-5 h-5 rounded-full ${completed ? "bg-green-100" : "border border-gray-300"} flex items-center justify-center`}
            >
              {completed && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          </div>
          <div>
            <h4
              className={`font-medium ${completed ? "text-gray-500 line-through" : "text-gray-900"}`}
            >
              {title}
            </h4>
            <div className="flex items-center mt-1 text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span>
                {timeStart} - {timeEnd}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={onReschedule}
          >
            Reschedule
          </Button>
          <Button
            size="sm"
            className="h-8 px-3 text-xs bg-slate-900"
            onClick={onComplete}
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
