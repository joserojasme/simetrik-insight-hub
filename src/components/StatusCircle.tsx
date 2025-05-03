
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

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
  const isChurn = title.toLowerCase().includes('churn');
  const trendIcon = isChurn ? TrendingDown : TrendingUp;
  const trendColor = isChurn ? "text-danger" : "text-success";
  
  return (
    <Link to={link} className="w-full md:w-auto">
      <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className={cn(
              "relative w-48 h-48 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br",
              isChurn ? "from-white to-gray-100 border-2 border-danger" : "from-white to-gray-100 border-2 border-success",
              "shadow-md",
              pulsing && "animate-pulse-light"
            )}>
              <div className="text-center">
                <div className={cn(
                  "text-5xl font-bold mb-2", 
                  isChurn ? "text-danger" : "text-success"
                )}>
                  {count}
                </div>
                <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
                <div className="flex items-center justify-center text-base mt-2">
                  <trendIcon className={cn("h-5 w-5 mr-1", trendColor)} />
                  <span className={trendColor}>{title}</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-2 bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full", colorClass)} 
                style={{ width: `${percentage}%` }} 
              />
            </div>
            <div className="w-full flex justify-between text-xs mt-1">
              <span className="text-gray-500">0%</span>
              <span className="text-gray-500">50%</span>
              <span className="text-gray-500">100%</span>
            </div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              {isChurn 
                ? `${count} customers with significant churn risk` 
                : `${count} customers with up-sell potential`}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StatusCircle;
