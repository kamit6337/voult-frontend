import { deleteReq } from "@/config/api";
import type { DELETE_PROJECT, PROJECT } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["delete", "project"],
    mutationFn: (obj: DELETE_PROJECT) => deleteReq<string>("/projects", obj),

    onSuccess(data, variables, onMutateResult, context) {
      const queryKey = ["user", "projects"];

      const isQueryPresent = queryClient.getQueryState(queryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: PROJECT[]): PROJECT[] => {
          return old.filter((p) => p._id !== variables._id);
        });
      }

      toast.success("Project Deleted Successfully");
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);
      toast.error(error.message || "Issue in deleting secret");
    },
  });

  return mutation;
};

export default useDeleteProject;
