import { postReq } from "@/config/api";
import type { SECRET } from "@/types/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MutationVariables = Record<string, string | number | boolean>;

type Props = {
  mutationKey: string[];
  queryKey: string[];
  urlPath: string;
};

const useCreate = <T extends MutationVariables, V>({
  mutationKey,
  queryKey,
  urlPath,
}: Props) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: [...mutationKey],
    mutationFn: (obj: T) => postReq<V>(urlPath, obj),
    onSuccess(data, variables, onMutateResult, context) {
      const isQueryPresent = queryClient.getQueryState(queryKey);

      console.log("DATA", data);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: V[]) => {
          return [data, ...old];
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

export default useCreate;
