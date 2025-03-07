import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.sections)[":id"]["$delete"]
>;
type RequestType = InferRequestType<
  (typeof client.api.sections)[":id"]["$delete"]
>["param"];

export const deleteSection = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["sections"],
    mutationFn: async ({ id }) => {
      const response = await client.api.sections[":id"]["$delete"]({
        param: {
          id: id,
        },
      });

      if (!response.ok) {
        throw new Error("Houve um erro ao deletar a seção tente novamente!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Seção deletada com sucesso");
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });
    },
    onError: () => {
      toast.error("Houve um erro ao deletar a seção tente novamente!");
    },
  });

  return mutate;
};
