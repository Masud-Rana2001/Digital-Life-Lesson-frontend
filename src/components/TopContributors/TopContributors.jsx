import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const badges = [
  { label: "🥇 Gold", color: "from-yellow-400 to-amber-500" },
  { label: "🥈 Silver", color: "from-gray-300 to-gray-400" },
  { label: "🥉 Bronze", color: "from-orange-400 to-orange-600" },
];

export default function TopContributors() {
  const axiosInstance = useAxiosSecure();

  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/top-contributors");
      return res.data;
    },
  });

  return (
    <section className="section-padding glass-effect rounded-3xl">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="heading-xl mb-4">
            🏆 Top <span className="text-gradient">Contributors</span>
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Celebrating our most active community members who share their wisdom and inspire others.
          </p>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="card-uniform p-6 h-44 skeleton-animate"
              />
            ))}
          </div>
        )}

        {/* Contributors Grid */}
        {!isLoading && contributors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contributors.map((user, index) => (
              <motion.div
                key={user.email}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-uniform p-6 hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  {/* Rank Badge */}
                  <div className="flex flex-col items-center">
                    {index < 3 ? (
                      <span className={`text-3xl mb-1`}>
                        {badges[index].label.split(" ")[0]}
                      </span>
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center font-bold text-base-content/60">
                        #{index + 1}
                      </span>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/dashboard/creator-profile/${user.email}`}>
                      <img
                        src={user?.imageURL || user?.imageUrl || "https://i.ibb.co/L5hY5Fz/default-user.png"}
                        referrerPolicy="no-referrer"
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-4 border-primary/20 mb-3"
                      />
                    </Link>
                    <Link
                      to={`/dashboard/creator-profile/${user.email}`}
                      className="font-bold text-lg hover:text-primary transition-colors block truncate"
                    >
                      {user.name}
                    </Link>
                    <p className="text-sm text-base-content/60 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-base-300">
                  <span className="badge badge-primary">
                    ⭐ Score: {user?.weeklyStats?.score || 0}
                  </span>
                  <span className="text-sm text-base-content/60">
                    💬 {user?.weeklyStats?.commentsGiven || 0} comments
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && contributors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base-content/60">No contributors data available</p>
          </div>
        )}
      </div>
    </section>
  );
}
