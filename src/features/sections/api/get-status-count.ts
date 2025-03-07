import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getStatusCount = () => {
  const query = useQuery({
    queryKey: ["sections", "status-count"],
    queryFn: async () => {
      const response = await client.api.sections["status-count"].$get();

      if (!response.ok) {
        throw new Error("Houve um erro ao buscar seus status, Tente novamente");
      }

      const { data } = await response.json();

      return data;
    },
    staleTime: 1000 * 60 * 60,
  });

  return query;
};
