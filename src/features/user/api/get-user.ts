import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const getUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await client.api.user.$get();

      const data = await response.json();

      return data;
    },
  });

  return query;
};
