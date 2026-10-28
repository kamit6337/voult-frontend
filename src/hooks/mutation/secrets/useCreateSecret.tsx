import { postReq } from "@/config/api";
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

      const projectSecretsQueryKey = data.projectId
        ? ["user", "secrets", data.projectId]
        : null;

      const isQueryPresent = queryClient.getQueryState(secretsQueryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(secretsQueryKey, (old: SECRET[]) => {
          return [data, ...old];
        });
      }

      if (projectSecretsQueryKey) {
        const isQueryPresent = queryClient.getQueryState(
          projectSecretsQueryKey,
        );

        if (isQueryPresent) {
          queryClient.setQueryData(projectSecretsQueryKey, (old: SECRET[]) => {
            return [data, ...old];
          });
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
