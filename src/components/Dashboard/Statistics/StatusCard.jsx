import React from "react";

const bgMap = {
  1: "from-[#6E8BFF] to-[#4E6CFF]",
  2: "from-[#FFD66E] to-[#FFB84E]",
  3: "from-[#FF8ABF] to-[#FF6EA1]",
  4: "from-[#9A6DFF] to-[#7A4DFF]",
};

export default function StatusCard({
  title,
  sub,
  value,
  icon,
  type = "blue",
}) {
  const bg = bgMap[type] ;

  return (
    <div
      className={`relative bg-gradient-to-br ${bg} rounded-2xl p-6 text-white shadow-xl
      hover:scale-[1.02] transition-all duration-300`}
    >
      {/* Icon Box */}
      <div
        className="w-16 h-16 mx-auto -mt-10 rounded-2xl bg-white/20 backdrop-blur-md 
        flex items-center justify-center shadow-lg"
      >
        <span className="text-3xl text-white">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg text-center font-semibold mt-4">{title}</h3>

      {/* Subtitle */}
      <p className="text-sm opacity-90">{sub}</p>

      {/* Value */}
      <h2 className="text-3xl text-center font-bold mt-3">{value}</h2>
    </div>
  );
}
