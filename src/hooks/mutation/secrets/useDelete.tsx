import { deleteReq } from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type MutationVariables = Record<string, string | number | boolean> & {
  _id: string;
};

type Props = {
  mutationKey: string[];
  queryKey: string[];
  urlPath: string;
  successMsg?: string;
  errorMsg?: string;
};

const useDelete = <T extends MutationVariables, V extends { _id: string }>({
  mutationKey,
  queryKey,
  urlPath,
  successMsg = "Deleted Successfully",
  errorMsg = "Issue in Deletion. Please try later",
}: Props) => {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationKey: [...mutationKey],
    mutationFn: (obj: T) => deleteReq<V>(urlPath, obj),
    onSuccess(data, variables, onMutateResult, context) {
      const isQueryPresent = queryClient.getQueryState(queryKey);

      console.log("DATA", data);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: V[]) => {
          const result = old.filter((item) => {
            return item._id !== variables._id;
          });

          return result;
        });
      } else {
        queryClient.invalidateQueries({
          queryKey,
          exact: true,
        });
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

export default useDelete;
