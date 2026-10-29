import { getReq } from "@/config/api";
import type { CURSOR, CURSOR_RESPONSE } from "@/types/global";
import type { SECRET } from "@/types/secret";
import { infiniteQueryOptions } from "@tanstack/react-query";

export const getSecretsByUserIdQuery = () =>
  infiniteQueryOptions({
    queryKey: ["user", "secrets", "none"],
    initialPageParam: null as CURSOR | null,
    queryFn: ({ pageParam }) => {
      return getReq<CURSOR_RESPONSE<SECRET>>("/secrets", { cursor: pageParam });
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    staleTime: Infinity,
  });

export const getFavouriteSecretsByUserIdQuery = () =>
  infiniteQueryOptions({
    queryKey: ["user", "secrets", "none"],
    initialPageParam: null as CURSOR | null,
    queryFn: ({ pageParam }) => {
      return getReq<CURSOR_RESPONSE<SECRET>>("/secrets/favourite", {
        cursor: pageParam,
      });
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,
    staleTime: Infinity,
  });

export const getSecretsByProjectId = (projectId: string | null) =>
  infiniteQueryOptions({
    queryKey: ["user", "secrets", projectId],

    initialPageParam: null as CURSOR | null,

    queryFn: ({ pageParam }) =>
      getReq<CURSOR_RESPONSE<SECRET>>("/secrets/project", {
        id: projectId,
        cursor: pageParam,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : undefined,

    staleTime: Infinity,
    enabled: !!projectId,
  });
