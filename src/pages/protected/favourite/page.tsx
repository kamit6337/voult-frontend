import Metadata from "@/lib/Metadata";
import FavouriteProjects from "./FavouriteProjects";
import FavouriteSecrets from "./FavouriteSecrets";

const FavouritePage = () => {
  return (
    <>
      <Metadata
        title="Voult | Favourite"
        description="Favourite page of voult"
      />

      <section className="space-y-20">
        <FavouriteProjects />
        <FavouriteSecrets />
      </section>
    </>
  );
};

export default FavouritePage;
