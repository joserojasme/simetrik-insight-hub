
import React from 'react';
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  colorClass?: string;
  height?: string;
  showText?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  colorClass = "bg-primary",
  height = "h-2",
  showText = false
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className="w-full">
      <div className="relative w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div 
          className={cn("transition-all duration-500 ease-out rounded-full", colorClass, height)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="text-xs text-gray-500 mt-1 text-right">{Math.round(percentage)}%</div>
      )}
    </div>
  );
};

export default ProgressBar;
