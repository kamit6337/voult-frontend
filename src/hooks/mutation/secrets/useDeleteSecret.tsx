import { deleteReq } from "@/config/api";
import type { GetSecretsByPaginationQueryCache } from "@/types/global";
import type { SECRET } from "@/types/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type Props = {
  successMsg?: string;
  errorMsg?: string;
};

const useDeleteSecret = ({
  successMsg = "Deleted Successfully",
  errorMsg = "Issue in Deletion. Please try later",
}: Props = {}) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ["secret", "delete"],
    mutationFn: (obj: SECRET) => deleteReq<string>("/secrets", { id: obj._id }),
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
            console.log("old", old);

            if (!old || old.pages.length === 0) return old;

            const updateSecret = old.pages.map((page) => {
              const secret = page.data.filter((s) => s._id !== variables._id);

              return {
                ...page,
                data: secret,
              };
            });

            return {
              ...old,
              pages: updateSecret,
            };
          },
        );
      }

      if (variables.projectId) {
        const secretsQueryKey = ["user", "secrets", variables.projectId];

        const isQueryPresent = queryClient.getQueryState(secretsQueryKey);

        if (isQueryPresent) {
          queryClient.setQueryData(
            secretsQueryKey,
            (
              old: GetSecretsByPaginationQueryCache,
            ): GetSecretsByPaginationQueryCache => {
              console.log("old", old);

              if (!old || old.pages.length === 0) return old;

              const updateSecret = old.pages.map((page) => {
                const secret = page.data.filter((s) => s._id !== variables._id);

                return {
                  ...page,
                  data: secret,
                };
              });

              return {
                ...old,
                pages: updateSecret,
              };
            },
          );
        }
      }

      toast.success(successMsg);
    },
    onError(error, variables, onMutateResult, context) {
      toast.error(error.message || errorMsg);
      console.log(error);
    },
  });

  return query;
};

export default useDeleteSecret;
