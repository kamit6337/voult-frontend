import { postReq } from "@/config/api";
import type { CREATE_PROJECT, PROJECT } from "@/types/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create", "project"],
    mutationFn: (obj: CREATE_PROJECT) => postReq<PROJECT>("/projects", obj),
    onSuccess(data, variables, onMutateResult, context) {
      const queryKey = ["user", "projects"];

      const isQueryPresent = queryClient.getQueryState(queryKey);

      if (isQueryPresent) {
        queryClient.setQueryData(queryKey, (old: PROJECT[]): PROJECT[] => {
          return [data, ...old];
        });
      }

      toast.success("Project Created Successfully");
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error);
      toast.error(error.message || "Issue in creating secret");
    },
  });

  return mutation;
};

export default useCreateProject;
