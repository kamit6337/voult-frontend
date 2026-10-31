import { patchReq } from "@/config/api";
import type { GetSecretsByPaginationQueryCache } from "@/types/global";
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

      const newSecret = data;

      // UPDATE SECRETS ARRAY
      const secretsQueryKey = ["user", "secrets"];
      const isQueryPresent = queryClient.getQueryState(secretsQueryKey);

      queryClient.setQueriesData(
        {
          queryKey: secretsQueryKey,

          predicate(query) {
            return query.queryKey[2] !== "favourite";
          },
        },
        (
          old: GetSecretsByPaginationQueryCache,
        ): GetSecretsByPaginationQueryCache => {
          console.log("setQueriesData", old);

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

      // ADD SECRET TO FAVOURITE SECRETS ARRAY
      const secretFavouriteQueryKey = ["user", "secrets", "favourite"];
      const isFavouriteQueryPresent = queryClient.getQueryState(
        secretFavouriteQueryKey,
      );

      console.log("isFavouriteQueryPresent", isFavouriteQueryPresent);

      if (isFavouriteQueryPresent) {
        queryClient.setQueryData(
          secretFavouriteQueryKey,
          (
            old: GetSecretsByPaginationQueryCache,
          ): GetSecretsByPaginationQueryCache => {
            console.log(" SECRET FAVOURITE OLD", old);

            if (newSecret.favourite) {
              const [firstPage, ...restPages] = old.pages;

              const updateFirstPage = {
                ...firstPage,
                data: [newSecret, ...firstPage.data],
              };

              return {
                ...old,
                pages: [updateFirstPage, ...restPages],
              };
            } else {
              const updatedPages = old.pages.map((page) => {
                const removeSecret = page.data.filter(
                  (s) => s._id !== newSecret._id,
                );

                return {
                  ...page,
                  data: removeSecret,
                };
              });

              return {
                ...old,
                pages: updatedPages,
              };
            }
          },
        );
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
