import { deleteReq } from "@/config/api";

import type { GetSecretsByPaginationQueryCache } from "@/types/global";
import type {
  DELETE_PROJECT,
  DELETE_PROJECT_RESPONSE,
  PROJECT,
} from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete", "project"],
    mutationFn: (obj: DELETE_PROJECT) =>
      deleteReq<DELETE_PROJECT_RESPONSE>("/projects", obj),

    onSuccess(data, variables, onMutateResult, context) {
      // DELETE PROJECT FROM ALL PROJECT QUERY
      const queryKey = ["user", "projects"];
      const isQueryPresent = queryClient.getQueryState(queryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: PROJECT[]): PROJECT[] => {
          return old.filter((p) => p._id !== variables.id);
        });
      }

      if (data.secretIds.length === 0) {
        toast.success("Project Deleted Successfully");
        return;
      }

      const secretIdSet = new Set(data.secretIds);

      queryClient.setQueriesData(
        {
          queryKey: ["user", "secrets"],
        },
        (
          old: GetSecretsByPaginationQueryCache,
        ): GetSecretsByPaginationQueryCache => {
          if (data.isDeleteSecretsAlso) {
            const deleteSecretPages = old.pages.map((page) => {
              const secrets = page.data.filter((s) => !secretIdSet.has(s._id));

              return {
                ...page,
                data: secrets,
              };
            });

            return {
              ...old,
              pages: deleteSecretPages,
            };
          } else {
            const updateSecretPages = old.pages.map((page) => {
              const secrets = page.data.map((s) => {
                if (secretIdSet.has(s._id)) {
                  return {
                    ...s,
                    projectId: null,
                  };
                }

                return s;
              });

              return {
                ...page,
                data: secrets,
              };
            });

            return {
              ...old,
              pages: updateSecretPages,
            };
          }
        },
      );
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);
      toast.error(error.message || "Issue in deleting secret");
    },
  });

  return mutation;
};

export default useDeleteProject;
