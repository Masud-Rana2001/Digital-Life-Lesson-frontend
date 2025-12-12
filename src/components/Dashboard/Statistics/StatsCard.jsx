// src/components/admin/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, changePercent, sinceText, icon: Icon, colorClass }) => {
    const isPositive = changePercent >= 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const trendColor = isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg transition duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {title}
                </h3>
                {Icon && <Icon className={`w-5 h-5 ${colorClass}`} />}
            </div>

            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <p className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        {value}
                    </p>
                    <span className={`flex items-center text-sm font-medium mt-1 ${trendColor}`}>
                        <TrendIcon className="w-4 h-4 mr-1" />
                        {Math.abs(changePercent)}% 
                        <span className="ml-2 text-gray-500 dark:text-gray-400 text-xs">
                            {sinceText}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;