import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function TopContributors() {
  const axiosPublic = useAxiosPublic();

  const badges = ["🥇 Gold", "🥈 Silver", "🥉 Bronze"];


  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-contributors");
      return res.data;
    },
  });

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        ⭐ Top Contributors of the Week
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-base-200 p-6 rounded-xl h-40" />
          ))}
        </div>
      )}

      {/* Contributors Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributors.map((user, index) => (
            <div
              key={user.email}
              className="p-6 bg-base-100 rounded-xl shadow hover:shadow-lg transition-all border"
            >
              <div className="flex items-center gap-4">
                
                {/* Rank */}
                <div className="text-3xl font-bold text-primary w-12 text-center">
                  {badges[index] } {index + 1}
                </div>

                {/* Avatar + Name */}
                <img
                  src={user.imageUrl}
                  className="w-16 h-16 rounded-full border shadow"
                />

                <div>
                  <h3 className="font-bold">{user.name}</h3>
                  <p className="text-sm text-base-content/70">{user.email}</p>
                </div>
              </div>

              {/* Score */}
              <div className="mt-4">
                <span className="badge badge-lg badge-primary">
                  Weekly Score: {user?.weeklyStats?.score || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-10">
        <a href="/contributors" className="btn btn-primary">
          View All Contributors →
        </a>
      </div>
    </section>
  );
}
