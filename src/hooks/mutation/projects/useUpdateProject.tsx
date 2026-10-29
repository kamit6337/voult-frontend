import { patchReq } from "@/config/api";
import type { PROJECT, UPDATE_PROJECT } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update", "project"],

    mutationFn: (obj: UPDATE_PROJECT) => patchReq<PROJECT>("/projects", obj),

    onSuccess(data, variables, onMutateResult, context) {
      const queryKey = ["user", "projects"];

      const isQueryPresent = queryClient.getQueryState(queryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: PROJECT[]): PROJECT[] => {
          return old.map((p) => (p._id === data._id ? data : p));
        });
      }

      toast.success("Project Updated Successfully");
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);
      toast.error(error.message || "Issue in updating secret");
    },
  });

  return mutation;
};

export default useUpdateProject;
