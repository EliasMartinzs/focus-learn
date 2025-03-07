import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getSectionById = (id: string) => {
  const query = useQuery({
    queryKey: ["sections-by-id"],
    queryFn: async () => {
      const response = await client.api.sections[":id"].$get({
        param: {
          id,
        },
      });
      if (!response.ok) {
        throw new Error("Houve um erro ao buscar sua secao por id");
      }

      const { data } = await response.json();

      return data[0];
    },
    staleTime: 1000 * 60 * 60,
  });

  return query;
};
