import React from "react";

type Props = {
  consecutiveStudyDays: number;
};

const ConsecutiveStudyDays = ({ consecutiveStudyDays }: Props) => {
  const totalDays = 30;

  return (
    <div className="space-y-4 custom-shadow py-4 dark:border-b border-opacity-20">
      <div>
        <h4 className="text-xl font-medium">Constançia nos estudos</h4>
        <p className="text-muted-foreground">
          Voçe está{" "}
          <span className="font-bold text-foreground">
            {consecutiveStudyDays}{" "}
          </span>{" "}
          sem errar!
        </p>
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        {[...Array(totalDays)].map((_, index) => {
          const day = index + 1; // Número do dia
          const isStudied = day <= consecutiveStudyDays;

          return (
            <div
              key={index}
              className={`size-10 flex items-center justify-center border rounded ${
                isStudied ? "bg-green-400 dark:bg-transparent" : "bg-gray-200"
              }`}
            >
              {isStudied ? day : ""}
            </div>
          );
        })}
        {consecutiveStudyDays > totalDays && (
          <div className="size-10 flex items-center justify-center border rounded bg-green-500 dark:bg-transparentdar">
            {consecutiveStudyDays}
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default ConsecutiveStudyDays;
