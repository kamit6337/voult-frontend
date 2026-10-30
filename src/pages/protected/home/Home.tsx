import { deleteReq } from "@/config/api";
import Metadata from "@/lib/Metadata";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await deleteReq("/auth/logout");
      console.log("response", response);
      navigate("/signin", { replace: true });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <Metadata title="Voult | Home" description="Home page of voult" />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-screen flex-1 rounded-xl bg-muted/50" />
      </div>
    </>
  );
};

export default Home;
