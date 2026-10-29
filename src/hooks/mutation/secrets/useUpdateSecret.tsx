import { patchReq } from "@/config/api";
import type { GetSecretsByPaginationQueryCache } from "@/types/global";
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
          (
            old: GetSecretsByPaginationQueryCache,
          ): GetSecretsByPaginationQueryCache => {
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
            (
              old: GetSecretsByPaginationQueryCache,
            ): GetSecretsByPaginationQueryCache => {
              console.log("old", old);


              const updateSecret = old.pages.map((page) => {
                const secret = page.data.filter((s) => s._id !== data._id);

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
            (
              old: GetSecretsByPaginationQueryCache,
            ): GetSecretsByPaginationQueryCache => {

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
      } else {
        // IF PROJECT OF SECRET NOT CHANGED
        if (data.projectId) {
          const secretsQueryKey = ["user", "secrets", data.projectId];

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
