import ProjectComponent from "../../../components/projects/ProjectComponent";
import FavouriteProjects from "./FavouriteProjects";
import FavouriteSecrets from "./FavouriteSecrets";

const projects = [
  {
    _id: "project1",
    name: "Project1",
    favourite: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "project2",
    name: "Project2",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "project3",
    name: "Project3",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const FavouritePage = () => {
  return (
    <section className="space-y-20">
      <FavouriteProjects />
      <FavouriteSecrets />
    </section>
  );
};

export default FavouritePage;
