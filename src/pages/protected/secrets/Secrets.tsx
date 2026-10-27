import SecretsComponent from "@/components/secrets/SecretComponent";
import { getSecretsByUserIdQuery } from "@/query/secrets/getByUserId";
import { useSuspenseQuery } from "@tanstack/react-query";

const Secrets = () => {
  const { data } = useSuspenseQuery(getSecretsByUserIdQuery());

  if (data.length === 0) {
    return <p>No Data</p>;
  }

  return (
    <SecretsComponent
      secretsArr={data}
      isHeader={false}
      queryKey={["user", "secrets"]}
    />
  );
};

export default Secrets;
