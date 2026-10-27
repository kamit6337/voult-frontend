import { patchReq } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationVariables = Record<string, string | number | boolean>;

type Props = {
  mutationKey: string[];
  queryKey: string[];
  urlPath: string;
};

const useUpdate = <T extends MutationVariables, V extends { _id: string }>({
  mutationKey,
  queryKey,
  urlPath,
}: Props) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: [...mutationKey],
    mutationFn: (obj: T) => patchReq<V>(urlPath, obj),
    onSuccess(data, variables, onMutateResult, context) {
      const isQueryPresent = queryClient.getQueryState(queryKey);

      console.log("DATA", data);
      console.log("isQueryPresent", isQueryPresent);
      console.log("queryKey", queryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: V[]) => {
          console.log("old", old);

          const result = old.map((item) => {
            return item._id === data._id ? data : item;
          });

          return result;
        });
        return;
      }

      queryClient.invalidateQueries({
        queryKey,
        exact: true,
      });
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);
    },
  });

  return query;
};

export default useUpdate;
