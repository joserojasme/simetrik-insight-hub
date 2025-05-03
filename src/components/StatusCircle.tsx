
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface StatusCircleProps {
  title: string;
  count: number;
  percentage: number;
  colorClass: string;
  hoverColorClass: string;
  link: string;
  pulsing?: boolean;
}

const StatusCircle: React.FC<StatusCircleProps> = ({
  title,
  count,
  percentage,
  colorClass,
  hoverColorClass,
  link,
  pulsing = false,
}) => {
  return (
    <Link to={link} className="block">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "status-circle w-64 h-64 mb-4", 
            colorClass,
            "hover:" + hoverColorClass,
            pulsing && "animate-pulse-light"
          )}
        >
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">{count}</div>
            <div className="text-3xl font-bold text-white">{percentage}%</div>
            <div className="text-base text-white/90 mt-2">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StatusCircle;
