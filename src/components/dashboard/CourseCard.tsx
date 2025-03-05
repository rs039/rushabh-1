import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, BookOpen, Plus } from "lucide-react";

interface CourseCardProps {
  id?: string;
  title?: string;
  thumbnail?: string;
  duration?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  description?: string;
  youtubeUrl?: string;
}

const CourseCard = ({
  id = "1",
  title = "Introduction to Machine Learning",
  thumbnail = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80",
  duration = "4 weeks",
  difficulty = "Beginner",
  description = "Learn the fundamentals of machine learning algorithms and applications.",
  youtubeUrl = "https://www.youtube.com/watch?v=example",
}: CourseCardProps) => {
  // Map difficulty to appropriate badge variant
  const difficultyVariant = {
    Beginner: "default",
    Intermediate: "secondary",
    Advanced: "destructive",
  }[difficulty] as "default" | "secondary" | "destructive";

  return (
    <Card className="w-[230px] h-[280px] flex flex-col overflow-hidden bg-white">
      <div className="relative h-32 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-bold line-clamp-1">
            {title}
          </CardTitle>
          <Badge variant={difficultyVariant} className="ml-1 whitespace-nowrap">
            {difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-2 flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>{duration}</span>
        </div>

        <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => window.open(youtubeUrl, "_blank")}
        >
          <Play className="h-3 w-3" /> Preview
        </Button>

        <Button
          size="sm"
          className="flex items-center gap-1"
          onClick={() => console.log(`Add course ${id} to schedule`)}
        >
          <Plus className="h-3 w-3" /> Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
