import ProjectComponent from "../../../components/projects/ProjectComponent";
import SecretComponent from "../../../components/secrets/SecretComponent";
import type { SECRET } from "@/types/secret";

const secrets: SECRET[] = [
  {
    _id: "secret1",
    userId: "secret1",

    name: "Secret 1",
    value: "http://localhost:3000",
    favourite: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "secret2",
    userId: "secret1",

    name: "Secret 2",
    value: "dsfgfdgdfdfvxcdfssfgdhdffgjh",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "secret3",
    userId: "secret1",

    name: "Secret 3",
    value: "dfdsjkflfdsfjsdfjklfjdsklfjsdsjfhds",
    favourite: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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
      <ProjectComponent projects={projects} />
      <SecretComponent secretsArr={secrets} />
    </section>
  );
};

export default FavouritePage;
