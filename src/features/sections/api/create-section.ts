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
      const response = await client.api.sections.$post({ json });

      if (!response.ok) {
        throw new Error(
          "Houve um erro ao criar sua seção de estudos, Tente novamente!"
        );
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast(`Seção de estudos criado com sucesso!, ${data}`);
      queryClient.invalidateQueries({
        queryKey: ["create-sections", "sections"],
      });
    },
    onError: (error) => {
      console.error(error);
      toast("Erro ao criar seção de estudos!, Tente novamente");
    },
  });

  return mutation;
};
