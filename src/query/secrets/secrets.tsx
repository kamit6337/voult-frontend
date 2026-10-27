import { getReq } from "@/config/api";
import type { SECRET } from "@/types/secret";
import { queryOptions } from "@tanstack/react-query";

export const getSecretsByProjectId = (projectId: string | null) =>
  queryOptions({
    queryKey: ["project", "secrets", projectId],
    queryFn: () =>
      getReq<SECRET[]>("/secrets/project", { id: projectId || "" }),
    staleTime: Infinity,
    enabled: !!projectId,
  });
