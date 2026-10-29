import { postReq } from "@/config/api";
import type { GetSecretsByPaginationQueryCache } from "@/types/global";
import type { CREATE_SECRET, SECRET } from "@/types/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateSecret = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ["secret", "create"],
    mutationFn: (obj: CREATE_SECRET) => postReq<SECRET>("/secrets", obj),
    onSuccess(data, variables, onMutateResult, context) {
      console.log("DATA", data);

      const secretsQueryKey = ["user", "secrets", "none"];

      const isQueryPresent = queryClient.getQueryState(secretsQueryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(
          secretsQueryKey,
          (
            old: GetSecretsByPaginationQueryCache,
          ): GetSecretsByPaginationQueryCache => {
            if (!old || old.pages.length === 0) return old;

            const [firstSecretArray, ...restSecretArray] = old.pages;

            const updateFirstSecretArray = {
              ...firstSecretArray,
              data: [data, ...firstSecretArray.data],
            };

            return {
              ...old,
              pages: [updateFirstSecretArray, ...restSecretArray],
            };
          },
        );
      }

      if (data.projectId) {
        const projectSecretsQueryKey = ["user", "secrets", data.projectId];

        const isQueryPresent = queryClient.getQueryState(
          projectSecretsQueryKey,
        );

        if (isQueryPresent) {
          queryClient.setQueryData(
            projectSecretsQueryKey,
            (
              old: GetSecretsByPaginationQueryCache,
            ): GetSecretsByPaginationQueryCache => {
              if (!old || old.pages.length === 0) return old;

              const [firstSecretArray, ...restSecretArray] = old.pages;

              const updateFirstSecretArray = {
                ...firstSecretArray,
                data: [data, ...firstSecretArray.data],
              };

              return {
                ...old,
                pages: [updateFirstSecretArray, ...restSecretArray],
              };
            },
          );
        }
      }

      toast.success("Secret Created Successfully");
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);
      toast.error(error.message || "Issue in creating secret");
    },
  });

  return query;
};

export default useCreateSecret;
