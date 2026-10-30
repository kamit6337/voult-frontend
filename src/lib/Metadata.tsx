type Props = {
  title?: string;
  description?: string;
};

const Metadata = ({
  title = "Voult",
  description = "Voult is to secure your secret",
}: Props = {}) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};

export default Metadata;
