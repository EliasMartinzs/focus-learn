import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

type Props = {
  hours: number;
};

export const TotalHours = ({ hours }: Props) => {
  return (
    <Card>
      <CardHeader className="items-start text-start">
        <CardTitle className="text-9xl font-medium">{hours}h</CardTitle>
        <CardDescription className="text-2xl">
          Total de horas estudadas
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
