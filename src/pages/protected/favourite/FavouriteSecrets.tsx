import SecretComponent from "@/components/secrets/SecretComponent";
import Loading from "@/lib/Loading";
import { getFavouriteSecretsByUserIdQuery } from "@/query/secrets/secrets";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

const FavouriteSecrets = () => {
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(getFavouriteSecretsByUserIdQuery());

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message || "Something went wrong. Please try later");
    }
  }, [error?.message]);

  if (isLoading) {
    return <Loading hScreen />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const secrets = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SecretComponent
      secretsArr={secrets}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default FavouriteSecrets;
