import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import CourseCard from "./CourseCard";

interface CourseRecommendationsProps {
  title?: string;
  courses?: Array<{
    id: string;
    title: string;
    thumbnail: string;
    duration: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    youtubeUrl: string;
  }>;
  onRefresh?: () => void;
}

const CourseRecommendations = ({
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
      youtubeUrl: "https://www.youtube.com/watch?v=example",
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
      youtubeUrl: "https://www.youtube.com/watch?v=example",
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
      youtubeUrl: "https://www.youtube.com/watch?v=example",
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
      youtubeUrl: "https://www.youtube.com/watch?v=example",
    },
    {
      id: "5",
      title: "UX/UI Design Principles",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80",
      duration: "5 weeks",
      difficulty: "Intermediate",
      description:
        "Learn essential design principles to create intuitive and engaging user experiences.",
      youtubeUrl: "https://www.youtube.com/watch?v=example",
    },
  ],
  onRefresh = () => console.log("Refreshing course recommendations"),
}: CourseRecommendationsProps) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const visibleCourses = courses.slice(
    currentPage * coursesPerPage,
    (currentPage + 1) * coursesPerPage,
  );

  return (
    <Card className="w-full h-[380px] overflow-hidden bg-white">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
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
        </div>
      </CardHeader>

      <div className="p-4 pt-2">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {visibleCourses.length > 0 ? (
            visibleCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                thumbnail={course.thumbnail}
                duration={course.duration}
                difficulty={course.difficulty}
                description={course.description}
                youtubeUrl={course.youtubeUrl}
              />
            ))
          ) : (
            <div className="w-full h-[240px] flex items-center justify-center text-gray-500">
              No courses available
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CourseRecommendations;
