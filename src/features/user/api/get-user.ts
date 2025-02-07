import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import type { InferResponseType } from "hono/client";

type UserResponse = InferResponseType<typeof client.api.user.$get>;

export const getUser = () => {
  const query = useQuery<UserResponse, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await client.api.user.$get();

      if (!response.ok) {
        throw new Error("Erro ao buscar dados do usuario!, tente novamente");
      }

      return response.json();
    },

    staleTime: 1000 * 60 * 180,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return query;
};
