import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function TopContributors() {
  const axiosInstance = useAxiosSecure();

  const badges = ["🥇 Gold", "🥈 Silver", "🥉 Bronze"];

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/top-contributors");
      return res.data;
    },
  });

  return (
    <section className="px-5 py-16 bg-gradient-to-br from-sky-50 via-cyan-50 to-sky-100 mt-10 rounded-2xl shadow">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-primary">
        🏆 Top Contributors of the Week
      </h2>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-base-200/60 backdrop-blur-xl p-6 rounded-2xl h-44"
            />
          ))}
        </div>
      )}

      {/* Contributors List */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contributors.map((user, index) => (
           

            <div
              key={user.email}
              className="p-6 rounded-2xl shadow-xl transition-all border group  grid grid-cols-1
                         bg-gradient-to-br from-white/70 via-white/40 to-white/10 overflow-hidden
                         backdrop-blur-xl border-white/40 hover:border-primary/40
                         hover:shadow-2xl hover:scale-[1.02] duration-300"
            >
              {/* Top Row: Rank + Avatar */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                {/* Badge / Rank */}
                <div className="flex flex-col items-center">
                  <span className="text-4xl drop-shadow-sm">
                    {badges[index] || `#${index + 1}`}
                  </span>
                  
                </div>

                {/* Avatar */}
                <div className="flex flex-col md:flex-row items-center gap-3 ">
                  <img
                    src={user.imageURL}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full ring-4 ring-primary/20 shadow-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-sm opacity-70">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Score Row */}
              <div className="flex items-center justify-between">
                <span className="badge badge-lg border-primary/40 text-primary bg-primary/10 px-4 py-3 text-base">
                  ⭐ Score: {user?.weeklyStats?.score || 0}
                </span>

                <div className="text-right text-sm opacity-70">
                  💬 Comments: {user?.weeklyStats?.commentsGiven || 0}
                </div>
              </div>
            </div>
            
          ))}
        </div>
      )}

      {/* View More Button */}
      {/* <div className="text-center mt-12">
        <a
          href="/contributors"
          className="btn btn-primary btn-lg px-8 shadow-lg hover:shadow-xl"
        >
          View All Contributors →
        </a>
      </div> */}
    </section>
  );
}
