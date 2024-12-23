import client from "@/lib/client";
import { User } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type Response = {
  data: User;
  error: string;
};

export const getUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<Response> => {
      const response = await client.api.user.$get();

      const data = await response.json();

      return data as Response;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  return query;
};
