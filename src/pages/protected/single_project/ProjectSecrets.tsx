import { getSecretsByProjectId } from "@/query/secrets/secrets";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import SecretsComponent from "@/components/secrets/SecretComponent";

type Props = {
  projectId: string;
};

const ProjectSecrets = ({ projectId }: Props) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(getSecretsByProjectId(projectId));

  const secrets = data?.pages.flatMap((page) => page.data) ?? [];

  if (secrets.length === 0) {
    return <p>No Data</p>;
  }

  return (
    <SecretsComponent
      secretsArr={secrets}
      isHeader={false}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
};

export default ProjectSecrets;
