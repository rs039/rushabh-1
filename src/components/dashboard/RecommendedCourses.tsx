import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Play,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  youtubeUrl: string;
}

interface RecommendedCoursesProps {
  title?: string;
  courses?: Course[];
  onRefresh?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onAddCourse?: (courseId: string) => void;
  onPreviewCourse?: (courseId: string) => void;
}

const RecommendedCourses = ({
  title = "Recommended Courses",
  courses = [
    {
      id: "1",
      title: "Introduction to Machine Learning",
      thumbnail:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80",
      duration: "4 weeks",
      difficulty: "Beginner",
      description:
        "Learn the fundamentals of machine learning algorithms and applications.",
      youtubeUrl: "https://www.youtube.com/watch?v=mJeNghZXtMo",
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80",
      duration: "3 weeks",
      difficulty: "Intermediate",
      description:
        "Master advanced React patterns and optimize your frontend applications.",
      youtubeUrl: "https://www.youtube.com/watch?v=0W6i5LYKCSI",
    },
    {
      id: "3",
      title: "Data Science Fundamentals",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
      duration: "6 weeks",
      difficulty: "Beginner",
      description:
        "Get started with data science concepts, tools, and methodologies.",
      youtubeUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30",
    },
    {
      id: "4",
      title: "Cloud Architecture Mastery",
      thumbnail:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&q=80",
      duration: "8 weeks",
      difficulty: "Advanced",
      description:
        "Design and implement scalable cloud solutions for enterprise applications.",
      youtubeUrl: "https://www.youtube.com/watch?v=JIbIYCM48to",
    },
  ],
  onRefresh = () => console.log("Refreshing recommendations"),
  onPrevious = () => console.log("Previous courses"),
  onNext = () => console.log("Next courses"),
  onAddCourse = (courseId) => console.log(`Adding course ${courseId}`),
  onPreviewCourse = (courseId) => console.log(`Previewing course ${courseId}`),
}: RecommendedCoursesProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const coursesPerPage = 2;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      onPrevious();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      onNext();
    }
  };

  const visibleCourses = courses.slice(
    currentPage * coursesPerPage,
    (currentPage + 1) * coursesPerPage,
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onRefresh}
            title="Refresh recommendations"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleCourses.map((course) => (
            <div key={course.id} className="border rounded-lg overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${getDifficultyColor(course.difficulty)}`}
                >
                  {course.difficulty}
                </Badge>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">
                  {course.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => onPreviewCourse(course.id)}
                  >
                    <Play className="h-3 w-3" /> Preview
                  </Button>

                  <Button
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => onAddCourse(course.id)}
                  >
                    <Plus className="h-3 w-3" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedCourses;
