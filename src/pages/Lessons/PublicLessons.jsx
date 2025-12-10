import {useState} from "react"
import { useQuery } from "@tanstack/react-query"
import LessonCard from "./LessonCard"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import useAuth from './../../hooks/useAuth';
import FilterBar from "./ShareComponent/FilterBar"

function PublicLessons() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTone, setSelectedSelectedTone] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["publicLessons", searchTerm, selectedCategory, selectedTone, page],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (selectedCategory) params.append("category", selectedCategory);
      if (selectedTone) params.append("tone", selectedTone);
      if (searchTerm) params.append("search", searchTerm);

      params.append("page", page);
      params.append("limit", 6);

      const res = await axiosSecure.get(`/public-lessons?${params.toString()}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-600 py-10">Failed to load public lessons.</p>;

  const { lessons, totalPages } = data;

  return (
    <div className="max-w-7xl mx-auto px-4">

      <h1 className="text-4xl md:text-5xl font-extrabold text-center pb-20 text-secondary dark:text-primary">
        🌟 Public Life Lessons
      </h1>

      <FilterBar
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
        setSelectedSelectedTone={setSelectedSelectedTone}
      />

      {lessons.length === 0 && (
        <p className="text-gray-600 text-center py-10 text-lg">
          No lessons found.
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
          <LessonCard
            key={lesson._id}
            lesson={lesson}
            user={user}
            publicLessonRefetch={refetch}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        <button
          className="btn btn-outline"
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Prev
        </button>

        <button
          className="btn btn-outline"
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PublicLessons;
