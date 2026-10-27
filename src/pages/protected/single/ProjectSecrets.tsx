import { getSecretsByProjectId } from "@/query/secrets/secrets";
import { useSuspenseQuery } from "@tanstack/react-query";
import SecretsComponent from "@/components/secrets/SecretComponent";

type Props = {
  projectId: string;
};

const ProjectSecrets = ({ projectId }: Props) => {
  const { data } = useSuspenseQuery(getSecretsByProjectId(projectId));

  if (data.length === 0) {
    return <p>No Data</p>;
  }

  return (
    <SecretsComponent
      queryKey={["project", "secrets", projectId]}
      secretsArr={data}
      isHeader={false}
    />
  );
};

export default ProjectSecrets;
