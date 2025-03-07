import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getSections = () => {
  const query = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await client.api.sections.$get();

      if (!response.ok) {
        throw new Error("Houve um erro ao buscar suas seções de estudos!");
      }

      const { data } = await response.json();

      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return query;
};
