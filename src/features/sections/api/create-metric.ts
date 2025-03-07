import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.sections)["create-new-metric"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.sections)["create-new-metric"]["$post"]
>["json"];

export const createMetric = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["metric"],
    mutationFn: async (json) => {
      const response = await client.api.sections["create-new-metric"].$post({
        json: json,
      });

      if (!response.ok) {
        throw new Error("Houve um erro ao publicar suas metricas");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Métrica criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: () => {
      toast.error("Houve um erro, tente novamente!");
    },
  });

  return mutation;
};
