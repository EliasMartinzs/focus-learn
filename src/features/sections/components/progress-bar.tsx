import { cn } from "@/lib/utils";
import React from "react";

interface ProgressBarProps {
  totalHoursStudied: number;
  totalHoursGoal: number;
  estimatedCompletionDate: string | null;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalHoursStudied,
  totalHoursGoal,
  estimatedCompletionDate,
}) => {
  const progressPercentage = (totalHoursStudied / totalHoursGoal) * 100;
  // const estimatedDate = new Date(estimatedCompletionDate)

  return (
    <div className="space-y-2">
      <div className="w-full bg-accent rounded-full">
        <div
          className={cn(
            "bg-primary h-8 rounded-full transition-all duration-300 ease-in-out",
            progressPercentage === 0 && "ml-2"
          )}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className={cn("h-full flex items-center justify-end pr-2")}>
            {progressPercentage.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-3 w-full font-extralight">
          <div>{totalHoursStudied}h estudadas</div>/
          <div>Meta: {totalHoursGoal}h</div>
        </div>

        <div>{/* {new Date()} */}</div>
      </div>
    </div>
  );
};
