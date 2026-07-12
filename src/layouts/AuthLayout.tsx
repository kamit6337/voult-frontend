import { ModeToggle } from "@/components/ModeToggle";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main className="w-full min-h-svh flex flex-col justify-center items-center bg-muted">
        <Outlet />
      </main>
      <div className="absolute bottom-0 left-0 mb-10 ml-10 z-10">
        <ModeToggle direct={true} />
      </div>
    </>
  );
}
