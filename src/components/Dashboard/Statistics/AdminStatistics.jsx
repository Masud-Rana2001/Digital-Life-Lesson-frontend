import { AlertTriangle, BookOpen, Clock, RefreshCw, TrendingUp, Users } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useAdminStats from "../../../hooks/useAdminStats";
import ErrorPage from "../../../pages/ErrorPage";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const COLORS = ["#0ea5e9", "#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const StatCard = ({ title, value, color, icon: Icon, trend }) => (
  <div className="card-uniform p-6 flex items-center justify-between">
    <div>
      <h3 className="text-sm font-medium text-base-content/60">{title}</h3>
      <p className={`text-3xl font-bold mt-2 text-${color}`}>{value}</p>
      {trend && (
        <p className={`text-xs mt-1 flex items-center gap-1 ${trend > 0 ? "text-success" : "text-error"}`}>
          <TrendingUp className={`w-3 h-3 ${trend < 0 ? "rotate-180" : ""}`} />
          {Math.abs(trend)}% from last week
        </p>
      )}
    </div>
    {Icon && (
      <div className={`w-14 h-14 rounded-2xl bg-${color}/10 flex items-center justify-center`}>
        <Icon className={`w-7 h-7 text-${color}`} />
      </div>
    )}
  </div>
);

const AdminDashboard = () => {
  const { stats, isLoading, error, refetch } = useAdminStats();

  const topContributors = stats?.topContributors || [];
  const combinedGrowthData = stats?.lessonGrowth || [];

  // Category distribution data for pie chart
  const categoryData = [
    { name: "Personal Growth", value: 35 },
    { name: "Career", value: 25 },
    { name: "Mindset", value: 20 },
    { name: "Relationships", value: 12 },
    { name: "Others", value: 8 },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="heading-lg">Admin Dashboard</h1>
          <p className="text-base-content/60">Overview of platform statistics</p>
        </div>
        <button
          onClick={() => refetch()}
          className="btn btn-ghost gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers?.toLocaleString() || 0}
          color="primary"
          icon={Users}
          trend={12}
        />
        <StatCard
          title="Public Lessons"
          value={stats.totalPublicLessons?.toLocaleString() || 0}
          color="success"
          icon={BookOpen}
          trend={8}
        />
        <StatCard
          title="Reported Lessons"
          value={stats.totalReportedLessons || 0}
          color="error"
          icon={AlertTriangle}
          trend={-5}
        />
        <StatCard
          title="Today's New Lessons"
          value={stats.todaysNewLessons || 0}
          color="info"
          icon={Clock}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Lesson Growth */}
        <div className="card-uniform p-6">
          <h2 className="font-bold text-lg mb-4">Lesson Growth (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={combinedGrowthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-base-300" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  border: "1px solid oklch(var(--b3))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="lessons" fill="#0ea5e9" name="New Lessons" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - User Growth */}
        <div className="card-uniform p-6">
          <h2 className="font-bold text-lg mb-4">User Growth (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={combinedGrowthData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-base-300" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  border: "1px solid oklch(var(--b3))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ fill: "#22c55e", strokeWidth: 2 }}
                name="New Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row - Pie Chart & Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Category Distribution */}
        <div className="card-uniform p-6">
          <h2 className="font-bold text-lg mb-4">Lessons by Category</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  border: "1px solid oklch(var(--b3))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Contributors */}
        <div className="card-uniform p-6">
          <h2 className="font-bold text-lg mb-4">Top 5 Contributors</h2>
          <div className="space-y-4">
            {topContributors.length === 0 ? (
              <p className="text-base-content/60">No contributors data available</p>
            ) : (
              topContributors.map((contributor, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-base-200/50 hover:bg-base-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <img
                      src={contributor.photoURL || "https://i.ibb.co/L5hY5Fz/default-user.png"}
                      alt={contributor.name || contributor._id}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">
                        {contributor.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-base-content/60 truncate max-w-[150px]">
                        {contributor._id}
                      </p>
                    </div>
                  </div>
                  <span className="badge badge-primary">
                    {contributor.totalLessons} lessons
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card-uniform p-6">
        <h2 className="font-bold text-lg mb-4">Recent Platform Activity</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Activity</th>
                <th>User</th>
                <th>Type</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>New lesson created</td>
                <td>John Doe</td>
                <td><span className="badge badge-info badge-sm">Lesson</span></td>
                <td>2 mins ago</td>
                <td><span className="badge badge-success badge-sm">Active</span></td>
              </tr>
              <tr>
                <td>User registered</td>
                <td>Jane Smith</td>
                <td><span className="badge badge-primary badge-sm">User</span></td>
                <td>15 mins ago</td>
                <td><span className="badge badge-success badge-sm">Active</span></td>
              </tr>
              <tr>
                <td>Lesson reported</td>
                <td>Anonymous</td>
                <td><span className="badge badge-error badge-sm">Report</span></td>
                <td>1 hour ago</td>
                <td><span className="badge badge-warning badge-sm">Pending</span></td>
              </tr>
              <tr>
                <td>Premium upgrade</td>
                <td>Mike Johnson</td>
                <td><span className="badge badge-warning badge-sm">Payment</span></td>
                <td>3 hours ago</td>
                <td><span className="badge badge-success badge-sm">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
