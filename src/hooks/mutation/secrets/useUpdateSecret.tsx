import { patchReq } from "@/config/api";
import type { GetSecretsByUserIdQueryCache } from "@/query/secrets/secrets";
import type {
  SECRET,
  UPDATE_SECRET,
  UPDATE_SECRET_VARIABLE,
} from "@/types/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateSecret = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ["secret", "update"],
    mutationFn: (variables: UPDATE_SECRET_VARIABLE) =>
      patchReq<SECRET>("/secrets", variables.obj),
    onSuccess(data, variables, onMutateResult, context) {
      console.log("DATA UPDATE", data);

      // UPDATE SECRETS ARRAY
      const secretsQueryKey = ["user", "secrets", "none"];

      const isQueryPresent = queryClient.getQueryState(secretsQueryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(
          secretsQueryKey,
          (old: GetSecretsByUserIdQueryCache): GetSecretsByUserIdQueryCache => {
            console.log("old", old);
            if (!old || old.pages.length === 0) return old;

            const updateSecret = old.pages.map((page) => {
              const secret = page.data.map((s) =>
                s._id === data._id ? data : s,
              );

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

      // CHECK IS PROJECT CHANGED ON SECRET
      const isSecretProjectChanged =
        variables.secret.projectId !== data.projectId;

      if (isSecretProjectChanged) {
        // SECRET REMOVED PROJECT
        const secretRemovedProjectQueryKey = [
          "user",
          "secrets",
          variables.secret.projectId || "none",
        ];

        const isQueryPresent = queryClient.getQueryState(
          secretRemovedProjectQueryKey,
        );

        if (isQueryPresent) {
          queryClient.setQueryData(
            secretRemovedProjectQueryKey,
            (old: SECRET[]) => {
              console.log("old", old);

              const result = old.filter((item) => item._id !== data._id);

              return result;
            },
          );
        }

        // SECRET ADD PROJECTS
        const secretAddProjectQueryKey = [
          "user",
          "secrets",
          data.projectId || "none",
        ];

        const isSecretAddQueryPresent = queryClient.getQueryState(
          secretAddProjectQueryKey,
        );

        if (isSecretAddQueryPresent) {
          queryClient.setQueryData(
            secretAddProjectQueryKey,
            (old: SECRET[]) => {
              console.log("old", old);

              const result = [data, ...old];

              return result;
            },
          );
        }
      }

      toast.success("Secret Updated Sucessfully");
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);

      toast.error(
        error.message || "Issue in updating secret. Please try later",
      );
    },
  });

  return query;
};

export default useUpdateSecret;
