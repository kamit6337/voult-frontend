import SecretsComponent from "@/components/secrets/SecretComponent";
import { getSecretsByUserIdQuery } from "@/query/secrets/secrets";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

const Secrets = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(getSecretsByUserIdQuery());

  const secrets = data?.pages.flatMap((page) => page.data) ?? [];

  if (secrets.length === 0) {
    return <p>No Data</p>;
  }

  return (
    <SecretsComponent
      secretsArr={secrets}
      isHeader={false}
      queryKey={["user", "secrets"]}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default Secrets;
