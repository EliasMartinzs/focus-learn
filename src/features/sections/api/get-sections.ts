import client from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.sections.$get>;

export const getSections = () => {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await client.api.sections.$get();

      if (!response.ok) {
        throw new Error("Houve um erro ao buscar suas seções de estudos!");
      }

      return await response.json();
    },
  });

  return query;
};
