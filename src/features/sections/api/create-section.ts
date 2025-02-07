import client from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.sections.$post>;
type RequestType = InferRequestType<typeof client.api.sections.$post>["json"];

export const createSection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["create-section"],
    mutationFn: async (json) => {
      const response = await client.api.sections.$post({
        json,
      });

      if (response.ok) {
        throw new Error("erro ao criar nova secao de estudo");
      }

      return response.json();
    },
    onSuccess: () => {
      toast("Seção de estudos criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["create-sections", "sections"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast("Erro ao criar seção de estudos!, Tente novamente");
    },
  });

  return mutation;
};
