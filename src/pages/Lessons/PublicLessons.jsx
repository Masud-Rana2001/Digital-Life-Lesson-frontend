import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { SkeletonGrid } from "../../components/Shared/SkeletonCard";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LessonCard from "./LessonCard";

const categories = [
  "All",
  "Personal Growth",
  "Career",
  "Mindset",
  "Relationships",
  "Mistakes Learned",
  "Emotional Healing",
];

const emotionalTones = [
  "All",
  "Motivational",
  "Sad",
  "Realization",
  "Gratitude",
  "Hard Truth",
  "Inspirational",
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "most-liked", label: "Most Liked" },
  { value: "most-saved", label: "Most Saved" },
];

function PublicLessons() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTone, setSelectedTone] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["publicLessons", searchTerm, selectedCategory, selectedTone, sortBy, page],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (selectedTone !== "All") params.append("tone", selectedTone);
      if (searchTerm) params.append("search", searchTerm);
      params.append("sort", sortBy);
      params.append("page", page);
      params.append("limit", 8);

      const res = await axiosSecure.get(`/public-lessons?${params.toString()}`);
      return res.data;
    },
  });

  const { data: userDB } = useQuery({
    queryKey: ["userDB", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-user`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchInput("");
    setSelectedCategory("All");
    setSelectedTone("All");
    setSortBy("newest");
    setPage(1);
  };

  const { lessons = [], totalPages = 1, totalLessons = 0 } = data || {};

  return (
    <div className="py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="heading-xl mb-4">
          Explore <span className="text-gradient">Life Lessons</span>
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Discover wisdom from real experiences shared by our community. 
          Filter by category, tone, or search for specific topics.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-effect rounded-2xl p-6 mb-8">
        {/* Search Row */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search lessons by title or content..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="input input-bordered w-full pl-12"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-ghost ${showFilters ? "btn-active" : ""}`}
          >
            <FiFilter className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </form>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-base-300">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered w-full"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="block text-sm font-medium mb-2">Emotional Tone</label>
              <select
                value={selectedTone}
                onChange={(e) => {
                  setSelectedTone(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered w-full"
              >
                {emotionalTones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="select select-bordered w-full"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={handleReset}
                className="btn btn-outline w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Active Filters & Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-base-300">
          <div className="flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <span className="badge badge-primary gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("All")}>×</button>
              </span>
            )}
            {selectedTone !== "All" && (
              <span className="badge badge-secondary gap-1">
                {selectedTone}
                <button onClick={() => setSelectedTone("All")}>×</button>
              </span>
            )}
            {searchTerm && (
              <span className="badge badge-accent gap-1">
                "{searchTerm}"
                <button onClick={() => { setSearchTerm(""); setSearchInput(""); }}>×</button>
              </span>
            )}
          </div>
          <p className="text-sm text-base-content/60">
            {totalLessons} lesson{totalLessons !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Loading State */}
      {(loading || isLoading) && <SkeletonGrid count={8} />}

      {/* Error State */}
      {error && (
        <div className="text-center py-16">
          <p className="text-error text-lg mb-4">Failed to load lessons</p>
          <button onClick={() => refetch()} className="btn btn-primary">
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && lessons.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">No lessons found</h3>
          <p className="text-base-content/60 mb-6">
            Try adjusting your filters or search terms
          </p>
          <button onClick={handleReset} className="btn btn-primary">
            Clear Filters
          </button>
        </div>
      )}

      {/* Lessons Grid - 4 columns on xl */}
      {!isLoading && !error && lessons.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson._id}
              lesson={lesson}
              user={user}
              userDB={userDB}
              publicLessonRefetch={refetch}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`btn btn-sm ${
                    page === pageNum ? "btn-primary" : "btn-ghost"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="btn btn-outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PublicLessons;
