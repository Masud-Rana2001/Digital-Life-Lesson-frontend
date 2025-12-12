import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function UserGrowthChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3">User Growth</h2>

      <AreaChart width={400} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="count" fill="#22c55e" stroke="#16a34a" />
      </AreaChart>
    </div>
  );
}
