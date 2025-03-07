import client from "@/lib/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type ResponseType = {
  data: {
    discipline: string;
    hours: number;
    studySectionName: string;
  }[];
  message: string | null;
};

export const getHoursByDiscipline = (): UseQueryResult<ResponseType, Error> => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["sections", "total-hours-by-discipline"],
    queryFn: async () => {
      const response = await client.api.sections["total-hours-by-discipline"][
        "$get"
      ]();

      if (!response.ok) {
        throw new Error("Houve um erro ao buscar seus dados");
      }

      return await response.json();
    },
    staleTime: 1000 * 60 * 60,
  });

  return query;
};
