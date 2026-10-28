import { patchReq } from "@/config/api";
import type { SECRET, UPDATE_SECRET_FAVOURITE } from "@/types/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateSecretFavourite = () => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: ["secret", "update", "favourite"],
    mutationFn: (variables: UPDATE_SECRET_FAVOURITE) =>
      patchReq<SECRET>("/secrets/favourite", variables),
    onSuccess(data, variables, onMutateResult, context) {
      console.log("DATA UPDATE FAVOURITE", data);

      // UPDATE SECRETS ARRAY
      const secretsQueryKey = ["user", "secrets", "none"];

      const isQueryPresent = queryClient.getQueryState(secretsQueryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(secretsQueryKey, (old: SECRET[]) => {
          console.log("old", old);

          const result = old.map((item) => {
            return item._id === data._id ? data : item;
          });

          return result;
        });
      }

      if (data.projectId) {
        const queryKey = ["user", "secrets", data.projectId];

        const isQueryPresent = queryClient.getQueryState(queryKey);

        if (isQueryPresent) {
          queryClient.setQueryData(queryKey, (old: SECRET[]) => {
            console.log("old", old);

            const result = old.map((item) => {
              return item._id === data._id ? data : item;
            });

            return result;
          });
        }
      }

      if (data.favourite) {
        toast.success("Secret Added to Favourite Sucessfully");
      } else {
        toast.success("Secret Removed from Favourite Sucessfully");
      }
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

export default useUpdateSecretFavourite;
